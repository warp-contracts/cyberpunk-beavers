import Const from '../common/const.mjs';
import { attack } from './cmd/attack.mjs';
import { movePlayer } from './cmd/move.mjs';
import { dig } from './cmd/dig.mjs';
import { pick } from './cmd/pick.mjs';
import { registerPlayer } from './cmd/registerPlayer.mjs';
import { scoreToDisplay } from '../common/tools.mjs';
import { gameFinished, gameInfo, gameNotStarted, standInQueue } from './cmd/info.mjs';
import { setup } from './cmd/setup.mjs';
import { __init } from './cmd/__init.js';
import { setNextProcess } from './cmd/setNextProcess.mjs';

const { Scores } = Const;

// ------- Token Contract Config
const TOKEN_CONTRACT_ID = 'Iny8fK0S1FCSVVOIWubg2L9EXV1RFaxgRJwv5-mwEYk';
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
  return ao.result({
    action,
    cmd: Const.Command.token,
    data: message.Data,
    tags: message.Tags,
    stats: player.stats,
    player: {
      walletAddress: recipient,
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

export function handle(state, message) {
  console.log("We're in");
  state.randomCounter = 0;
  if (state.hasOwnProperty('rawMap')) {
    __init(state, message);
  }

  const actionTagValue = message.Tags.find((t) => t.name === 'Action').value;

  if (TOKEN_ACTIONS.includes(actionTagValue)) {
    return handleMessageFromToken(state, actionTagValue, message);
  }

  const action = JSON.parse(actionTagValue);
  action.walletAddress = message.Owner;

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
    case 'increment':
      state.counter++;
      ao.result({
        counter: state.counter,
        player: state.players[message.Owner],
      });
      break;
    case Const.Command.setNextProcess:
      ao.result({
        ...setNextProcess(state, action),
        cmd: Const.Command.nextProcessSet,
      });
      break;
    case Const.Command.info:
      ao.result({
        cmd: Const.Command.stats,
        ...gameInfo(state, message.Owner, message.Timestamp),
      });
      break;
    case Const.Command.enqueue:
      standInQueue(state, action);
      ao.result({
        cmd: Const.Command.stats,
        ...gameInfo(state, message.Owner, message.Timestamp),
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
        sendToken(message.Owner, pickRes.tokenTransfer);
      }
      ao.result({
        cmd: Const.Command.picked,
        player: pickRes.player,
        picked: pickRes.picked,
        stats: pickRes.player.stats,
        scoreToDisplay: pickRes.scoreToDisplay,
      });
      break;
    case Const.Command.dig:
      const digRes = dig(state, action);
      ao.result({
        cmd: Const.Command.digged,
        player: digRes.player,
        stats: digRes.player.stats,
        digged: digRes.digged,
        scoreToDisplay: digRes.scoreToDisplay,
      });
      break;
    case Const.Command.attack:
      const attackRes = attack(state, action);
      if (attackRes.tokenTransfer > 0) {
        sendToken(message.Owner, attackRes.tokenTransfer);
      }
      ao.result({
        cmd: Const.Command.attacked,
        pos: attackRes.attackPos,
        walletAddress: attackRes.player.name,
        stats: attackRes.player.stats,
        player: attackRes.player,
        opponentWalletAddress: attackRes.opponent?.name,
        opponentStats: attackRes.opponent?.stats,
        opponentPlayer: attackRes.opponent,
        scoreToDisplay: attackRes.scoreToDisplay,
        opponentScoreToDisplay: attackRes.opponentScoreToDisplay,
      });
      break;
    case Const.Command.move:
      const moveRes = movePlayer(state, action);
      ao.result({
        cmd: Const.Command.moved,
        stats: moveRes.player.stats,
        player: moveRes.player,
        scoreToDisplay: moveRes.scoreToDisplay,
      });
      break;
    case Const.Command.register:
      registerPlayer(state, action);
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
      });
      break;
    case Const.Command.join:
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
