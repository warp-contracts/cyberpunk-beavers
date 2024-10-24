import Const, { GAMEPLAY_MODES, MAX_LAST_TXS } from '../common/const.mjs';
import { attack } from './cmd/attack.mjs';
import { movePlayer } from './cmd/move.mjs';
import { dig } from './cmd/dig.mjs';
import { pick } from './cmd/pick.mjs';
import { registerPlayer } from './cmd/registerPlayer.mjs';
import { gameFinished, gameInfo, gameNotStarted, gameStats } from './cmd/info.mjs';
import { setup } from './cmd/setup.mjs';
import { __init } from './cmd/__init.js';
import { sendTokens } from './cmd/sendTokens.mjs';
import { sendScores } from './cmd/sendScores.mjs';
import { useLandmine } from './cmd/landmine.mjs';
import { teleportPlayer } from './cmd/teleport.mjs';
import { activate, checkWhitelist, standInQueue } from './cmd/queue.mjs';
import { scan } from './cmd/scan.mjs';
import { useHp } from './cmd/hp.mjs';
import { drill } from './cmd/drill.js';
import { Monsters } from './monsters/Monsters.js';

function restrictedAccess(state, action, ts) {
  return (
    (gameNotStarted(state, ts) && ![Const.Command.setup, Const.Command.enqueue].includes(action.cmd)) ||
    (gameFinished(state, ts) && ![Const.Command.setup].includes(action.cmd))
  );
}

function addToLastTxs(message, state) {
  state.lastTxs.push(message.Id);
  if (state.lastTxs.length > MAX_LAST_TXS) {
    state.lastTxs.shift();
  }
}

export function handle(state, message) {
  state.randomCounter = 0;
  if (state.hasOwnProperty('rawMap')) {
    __init(state, message);
    console.log('Play window', state.playWindow);
  }

  // console.log('Gameplay Mode', state.gameplayMode);

  addToLastTxs(message, state);

  const actionTagValue = message.Tags.find((t) => t.name === 'Action').value;

  const action = JSON.parse(actionTagValue);

  action.walletAddress = state.generatedWalletsMapping.hasOwnProperty(message.Owner)
    ? state.generatedWalletsMapping[message.Owner]
    : message.Owner;

  let monsters = null;
  if (state.gameplayMode === GAMEPLAY_MODES.horde) {
    monsters = new Monsters(state, message.Timestamp);
  }

  if (restrictedAccess(state, action, message.Timestamp)) {
    console.log(`The game access is restricted`, action, message.Timestamp, state.playWindow);
    if (gameFinished(state, message.Timestamp)) {
      sendScores(state);
      if (!state.tokensTransferred) {
        ao.result({
          cmd: Const.Command.tokensSent,
          ...sendTokens(state),
          ...gameInfo(state, action.walletAddress, message.Timestamp),
          ...gameStats(state, message.Timestamp),
        });
        return;
      }
    }
    ao.result({
      cmd: Const.Command.stats,
      ...gameInfo(state, action.walletAddress, message.Timestamp),
      ...gameStats(state, message.Timestamp),
    });
    return;
  }

  const gameRoundTickResult = gameRoundTick(state, message);
  if (gameRoundTickResult?.tokensSent) {
    const { tokensSent, ...output } = gameRoundTickResult;
    ao.result({
      cmd: Const.Command.tokensSent,
      ...output,
    });
    return;
  }
  const tickResult = gamePlayerTick(state, action);
  if (tickResult?.dead) {
    ao.result({
      dead: action.walletAddress,
      ...gameStats(state, message.Timestamp),
    });
    return;
  }

  switch (action.cmd) {
    case Const.Command.tick: {
      if (monsters) {
        const hordeTick = monsters.tick(message.Timestamp);
        ao.result({
          ...gameStats(state, message.Timestamp),
          hordeTick,
        });
      }
      break;
    }
    case Const.Command.info:
      ao.result({
        cmd: Const.Command.stats,
        ...gameInfo(state, action.walletAddress, message.Timestamp),
        ...checkWhitelist(state, action.walletAddress),
        ...gameStats(state, message.Timestamp),
      });
      break;
    case Const.Command.enqueue:
      standInQueue(state, action);
      ao.result({
        cmd: Const.Command.stats,
        ...gameInfo(state, action.walletAddress, message.Timestamp),
        ...checkWhitelist(state, action.walletAddress),
        ...gameStats(state, message.Timestamp),
      });
      break;
    case Const.Command.activate:
      activate(state, action);
      ao.result({
        cmd: Const.Command.activated,
        ...gameInfo(state, action.walletAddress, message.Timestamp),
      });
      break;
    case Const.Command.setup:
      ao.result({
        cmd: Const.Command.info,
        ...setup(state, action, message),
      });
      break;
    case Const.Command.pick:
      const pickRes = pick(state, action, message);
      ao.result({
        cmd: Const.Command.picked,
        player: pickRes.player,
        picked: pickRes.picked,
        scoreToDisplay: pickRes.scoreToDisplay,
        ...gameStats(state, message.Timestamp),
      });
      break;
    case Const.Command.dig:
      ao.result({
        cmd: Const.Command.digged,
        ...dig(state, action),
        ...gameStats(state, message.Timestamp),
      });
      break;
    case Const.Command.useDrill:
      ao.result({
        cmd: Const.Command.drilled,
        ...drill(state, action),
        ...gameStats(state, message.Timestamp),
      });
      break;
    case Const.Command.attack:
      const attackRes = attack(state, action, message.Timestamp, monsters);
      ao.result({
        cmd: Const.Command.attacked,
        ...attackRes,
        ...gameStats(state, message.Timestamp),
      });
      break;
    case Const.Command.move:
      ao.result({
        cmd: Const.Command.moved,
        ...movePlayer(state, action),
        ...gameStats(state, message.Timestamp),
      });
      break;
    case Const.Command.useLandmine:
      ao.result({
        cmd: Const.Command.landmineActivated,
        ...useLandmine(state, action),
        ...gameStats(state, message.Timestamp),
      });
      break;
    case Const.Command.useTeleport:
      ao.result({
        cmd: Const.Command.teleported,
        ...teleportPlayer(state, action),
        ...gameStats(state, message.Timestamp),
      });
      break;
    case Const.Command.useScanner:
      ao.result({
        cmd: Const.Command.scanned,
        ...scan(state, action),
        ...gameStats(state, message.Timestamp),
      });
      break;
    case Const.Command.useHp:
      ao.result({
        cmd: Const.Command.hpApplied,
        ...useHp(state, action),
        ...gameStats(state),
      });
      break;
    case Const.Command.register:
      ao.result({
        cmd: Const.Command.registered,
        ...registerPlayer(state, action),
        players: state.players,
        map: {
          gameObjectsTilemap: state.gameObjectsTilemap,
          gameTreasuresTilemapForClient: state.gameTreasuresTilemapForClient,
        },
        round: state.round,
        ...gameStats(state, message.Timestamp),
      });
      break;
    case Const.Command.registerSpectator:
      if (!state.spectators.includes(action.walletAddress)) {
        state.spectators.push(action.walletAddress);
      }
      ao.result({
        cmd: Const.Command.registeredSpectator,
        players: state.players,
        map: {
          gameObjectsTilemap: state.gameObjectsTilemap,
          gameTreasuresTilemapForClient: state.gameTreasuresTilemapForClient,
        },
        round: state.round,
        ...gameStats(state, message.Timestamp),
        ...gameInfo(state, action.walletAddress, message.Timestamp),
      });
      break;
    case Const.Command.join:
      if (action.generatedWalletAddress) {
        state.generatedWalletsMapping[action.generatedWalletAddress] = action.walletAddress;
      }
      if (action.balance) {
        state.players[action.walletAddress].stats.coins.balance = action.balance;
      }
      ao.result({
        cmd: Const.Command.registered,
        players: state.players,
        map: {
          gameObjectsTilemap: state.gameObjectsTilemap,
          gameTreasuresTilemapForClient: state.gameTreasuresTilemapForClient,
        },
        round: state.round,
        ...gameStats(state, message.Timestamp),
      });
      break;
    default:
      throw new ProcessError(`Unknown action: ${action.cmd}`);
  }

  if (monsters && action.cmd !== Const.Command.tick) {
    const hordeTick = monsters.tick(message.Timestamp);
    ao.result({
      ...ao.outbox.Output,
      hordeTick,
    });
  }

  state.gameObjectsToRespawnInRound = [];
}

function gameRoundTick(state, message) {
  const tsNow = message.Timestamp; //ms
  const tsChange = tsNow - state.round.start;
  const round = ~~(tsChange / state.round.interval);
  // console.log('Last round ', state.round);
  if (state.round.current !== round) respawn(round, state);
  state.round.current = round;
  if (state.playWindow?.roundsTotal) {
    const roundsToGo = state.playWindow?.roundsTotal - state.round.current;
    // console.log('Rounds to go', roundsToGo);
    if (roundsToGo === 0) {
      sendScores(state);
      return {
        tokensSent: true,
        ...sendTokens(state),
      };
    }
  }
  // console.log(`new ts ${tsNow}  change ${tsChange}  round up to ${state.round.current}`);
}

function gamePlayerTick(state, action) {
  const player = state.players[action.walletAddress];
  // console.log(`Player tick - ${player?.walletAddress}`);
  if (player) {
    if (player.stats.round.last < state.round.current) {
      player.stats.ap.current = player.stats.ap.max;
      player.stats.round.last = state.round.current;
    }
    if (state.gameplayMode === GAMEPLAY_MODES.battleRoyale && player.stats.hp === 0) {
      return { dead: player.walletAddress };
    }
    for (const key of Object.keys(player.activeBoosts)) {
      const boost = player.activeBoosts[key];
      if (state.round.current > boost.roundAdded + boost.duration) {
        console.log('Boost expired');
        delete player.activeBoosts[key];
      }
    }
  }
}

function respawn(round, state) {
  for (let roundToRespawn in state?.gameObjectsToRespawn) {
    if (roundToRespawn <= round) {
      for (let gameObjectToRespawn of state?.gameObjectsToRespawn[roundToRespawn]) {
        const { tile, pos } = gameObjectToRespawn;
        state.gameObjectsTilemap[pos.y][pos.x] = tile;
        state.gameObjectsToRespawnInRound.push(gameObjectToRespawn);
      }
      delete state.gameObjectsToRespawn[roundToRespawn];
    }
  }

  console.log(`No game objects to respawn in round: ${round}`);
}
