import Const, { MAX_LAST_TXS } from '../common/const.mjs';
import { attack } from './cmd/attack.mjs';
import { movePlayer } from './cmd/move.mjs';
import { dig } from './cmd/dig.mjs';
import { pick } from './cmd/pick.mjs';
import { registerPlayer } from './cmd/registerPlayer.mjs';
import { scoreToDisplay } from '../common/tools.mjs';
import { gameFinished, gameInfo, gameNotStarted, gameStats, standInQueue } from './cmd/info.mjs';
import { setup } from './cmd/setup.mjs';
import { __init } from './cmd/__init.js';
import { setNextProcess } from './cmd/setNextProcess.mjs';

const { Scores } = Const;

// ------- Token Contract Config
const TOKEN_CONTRACT_ID = 'rH_-7vT_IgfFWiDsrcTghIhb9aRclz7lXcK7RCOV2h8';
const TOKEN_CONTRACT_METHOD = 'Transfer';
const TOKEN_ACTIONS = ['Credit-Notice', 'Debit-Notice', 'Transfer-Error'];

function sendToken(recipient, qty) {
  ao.send({
    Target: TOKEN_CONTRACT_ID,
    Data: '1234',
    Action: TOKEN_CONTRACT_METHOD,
    Recipient: recipient,
    Quantity: qty.toString(),
  });
}

function handleMessageFromToken(state, action, message) {
  const qty = message.Tags.find((t) => t.name === 'Quantity').value;
  const recipient = message.Tags.find((t) => t.name === 'Recipient').value;
  const txId = message.Tags.find((t) => t.name === 'Message').value;
  const player = state.players[recipient];
  player.stats.coins.transferred += Number(qty);
  player.stats.coins.balance += Number(qty);
  return ao.result({
    action,
    cmd: Const.Command.token,
    data: message.Data,
    tags: message.Tags,
    player: {
      walletAddress: recipient,
      stats: player.stats,
    },
    scoreToDisplay: scoreToDisplay([{ value: qty, type: Scores.coin, txId }]),
  });
}

function restrictedAccess(state, action, ts) {
  return (
    (gameNotStarted(state, ts) && ![Const.Command.setup, Const.Command.enqueue].includes(action.cmd)) ||
    (gameFinished(state, ts) && ![Const.Command.setup, Const.Command.setNextProcess].includes(action.cmd))
  );
}

function addToLastTxs(message, state) {
  state.lastTxs.push(message.Id);
  if (state.lastTxs.length > MAX_LAST_TXS) {
    state.lastTxs.shift();
  }
}

export function handle(state, message) {
  console.log("We're in");
  state.randomCounter = 0;
  if (state.hasOwnProperty('rawMap')) {
    __init(state, message);
  }

  addToLastTxs(message, state);

  const actionTagValue = message.Tags.find((t) => t.name === 'Action').value;

  if (TOKEN_ACTIONS.includes(actionTagValue)) {
    return handleMessageFromToken(state, actionTagValue, message);
  }

  const action = JSON.parse(actionTagValue);

  action.walletAddress = state.generatedWalletsMapping.hasOwnProperty(message.Owner)
    ? state.generatedWalletsMapping[message.Owner]
    : message.Owner;

  if (restrictedAccess(state, action, message.Timestamp)) {
    console.log(`The game has not started yet`);
    ao.result({
      cmd: Const.Command.stats,
      ...gameInfo(state, message.Owner, message.Timestamp),
    });
    return;
  }

  gameRoundTick(state, message);
  gamePlayerTick(state, action);

  switch (action.cmd) {
    case Const.Command.setNextProcess:
      ao.result({
        cmd: Const.Command.nextProcessSet,
        ...setNextProcess(state, action),
      });
      break;
    case Const.Command.info:
      ao.result({
        cmd: Const.Command.stats,
        ...gameInfo(state, message.Owner, message.Timestamp),
        ...gameStats(state),
      });
      break;
    case Const.Command.enqueue:
      standInQueue(state, action);
      ao.result({
        cmd: Const.Command.stats,
        ...gameInfo(state, message.Owner, message.Timestamp),
        ...gameStats(state),
      });
      break;
    case Const.Command.setup:
      ao.result({
        cmd: Const.Command.info,
        ...setup(state, action, message),
      });
      break;
    case Const.Command.pick:
      const pickRes = pick(state, action);
      if (pickRes.tokenTransfer > 0) {
        sendToken(action.walletAddress, pickRes.tokenTransfer);
      }
      ao.result({
        cmd: Const.Command.picked,
        player: pickRes.player,
        picked: pickRes.picked,
        scoreToDisplay: pickRes.scoreToDisplay,
        ...gameStats(state),
      });
      break;
    case Const.Command.dig:
      ao.result({
        cmd: Const.Command.digged,
        ...dig(state, action),
        ...gameStats(state),
      });
      break;
    case Const.Command.attack:
      const attackRes = attack(state, action);
      if (attackRes.tokenTransfer > 0) {
        sendToken(action.walletAddress, attackRes.tokenTransfer);
      }
      ao.result({
        cmd: Const.Command.attacked,
        ...attackRes,
        ...gameStats(state),
      });
      break;
    case Const.Command.move:
      const moveRes = movePlayer(state, action);
      ao.result({
        cmd: Const.Command.moved,
        player: moveRes.player,
        scoreToDisplay: moveRes.scoreToDisplay,
        ...gameStats(state),
      });
      break;
    case Const.Command.register:
      ao.result({
        cmd: Const.Command.registered,
        ...registerPlayer(state, action),
        players: state.players,
        map: {
          groundTilemap: state.groundTilemap,
          decorationTilemap: state.decorationTilemap,
          obstaclesTilemap: state.obstaclesTilemap,
          gameObjectsTilemap: state.gameObjectsTilemap,
          gameTreasuresTilemapForClient: state.gameTreasuresTilemapForClient,
        },
        round: state.round,
        ...gameStats(state),
      });
      break;
    case Const.Command.join:
      if (action.balance) {
        state.players[action.walletAddress].stats.coins.balance = action.balance;
      }
      if (action.generatedWalletAddress) {
        state.generatedWalletsMapping[action.generatedWalletAddress] = action.walletAddress;
      }
      ao.result({
        cmd: Const.Command.registered,
        players: state.players,
        map: {
          groundTilemap: state.groundTilemap,
          decorationTilemap: state.decorationTilemap,
          obstaclesTilemap: state.obstaclesTilemap,
          gameObjectsTilemap: state.gameObjectsTilemap,
          gameTreasuresTilemapForClient: state.gameTreasuresTilemapForClient,
        },
        round: state.round,
        ...gameStats(state),
      });
      break;
    default:
      throw new ProcessError(`Unknown action: ${action.cmd}`);
  }
}

function gameRoundTick(state, message) {
  const tsNow = message.Timestamp; //ms
  const tsChange = tsNow - state.round.start;
  const round = ~~(tsChange / state.round.interval);
  console.log('Last round ', state.round);
  state.round.current = round;
  console.log(`new ts ${tsNow}  change ${tsChange}  round up to ${state.round.current}`);
}

function gamePlayerTick(state, action) {
  const player = state.players[action.walletAddress];
  console.log(`Player tick - ${player?.walletAddress}`);
  if (player && player.stats.round.last < state.round.current) {
    player.stats.ap.current = player.stats.ap.max;
    player.stats.round.last = state.round.current;
  }
}
