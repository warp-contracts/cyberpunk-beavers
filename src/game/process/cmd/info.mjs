import { GAMEPLAY_MODES } from '../../common/const.mjs';

function calculateOffset(battleRoyale, shrinkCount) {
  if (shrinkCount === 0) {
    return 0;
  }
  let offset = 0;
  for (let i = 0; i < shrinkCount; i++) {
    offset += battleRoyale.shrinkSchedule[i].size;
  }
  return offset;
}

function modifyObstaclesLayer(obstaclesTilemap, offset, size) {
  console.log('modifyObstaclesLayer', { offset, size });

  const playersPositionsToCheck = [];
  for (let y = offset; y < obstaclesTilemap.length - offset; y++) {
    for (let x = offset; x < obstaclesTilemap.length - offset; x++) {
      if (
        y - offset < size ||
        x - offset < size ||
        y > obstaclesTilemap.length - offset - size - 1 ||
        x > obstaclesTilemap.length - offset - size - 1
      ) {
        obstaclesTilemap[y][x] = 100;
        playersPositionsToCheck.push({ x, y });
      }
    }
  }

  return playersPositionsToCheck;
}

function killThemAll(state, positionsToCheck, timestamp) {
  const killedPlayers = {};

  for (let position of positionsToCheck) {
    const wallet = state.playersOnTiles[position.y][position.x];
    const player = state.players[wallet];
    if (player != null) {
      player.stats.hp.current = 0;
      player.stats.death = {
        ts: timestamp,
        round: state.round.current,
      };
      killedPlayers[player.walletAddress] = player;
    }
  }

  return killedPlayers;
}

export function gameStats(state, timestamp) {
  const { gameTokens, gameTreasuresCounter, lastTxs, round, gameObjectsToRespawnInRound } = state;
  const result = {
    gameStats: { gameTokens, gameTreasuresCounter, lastTxs, round, gameObjectsToRespawnInRound },
  };

  if (state.gameplayMode === GAMEPLAY_MODES.battleRoyale) {
    console.log('Adding registered BR info');
    result.battleRoyale = {};
    const currentRound = state.round.current;
    console.log({ br: state.battleRoyale, round: currentRound });
    console.log('currentRound', currentRound);
    const shrinkCount = state.battleRoyale.shrinkCount;

    // all shrinks have been already performed
    if (shrinkCount === state.battleRoyale.shrinkSchedule.length) {
      result.battleRoyale.totalShrinkSize = state.battleRoyale.totalShrinkSize;
      return result;
    }
    const shrinkConfig = state.battleRoyale.shrinkSchedule[shrinkCount];
    const nextShrinkRound = shrinkConfig.round;

    // I guess it _may_ happen that no action will be performed
    // at the exact nextShrinkRound round?
    if (currentRound >= nextShrinkRound && !shrinkConfig.performed) {
      const offset = calculateOffset(state.battleRoyale, shrinkCount);
      console.log('Performing shrink', { ...shrinkConfig, offset });
      const playersPositionsToCheck = modifyObstaclesLayer(state.obstaclesTilemap, offset, shrinkConfig.size);
      const killedPlayers = killThemAll(state, playersPositionsToCheck, timestamp);
      state.battleRoyale.shrinkCount++;
      shrinkConfig.performed = true;
      result.battleRoyale = {
        shrink: { offset, size: shrinkConfig.size },
        killedPlayers: killedPlayers,
      };

      // this one is required for players that will join the game after the 'shrink' messages were sent
      state.battleRoyale.totalShrinkSize += shrinkConfig.size;
    } else if (nextShrinkRound - currentRound < 3) {
      const offset = calculateOffset(state.battleRoyale, shrinkCount);
      result.battleRoyale = {
        roundsToShrink: nextShrinkRound - currentRound,
        shrinkWarn: { offset, size: shrinkConfig.size },
      };
      console.log('BR Result', result.battleRoyale);
    } else {
      result.battleRoyale.totalShrinkSize = state.battleRoyale.totalShrinkSize;
    }
  }

  return result;
}

export function gameInfo(state, owner, ts) {
  const { walletsQueue, players, playWindow, gameplayMode, gameplayPrize } = state;
  return {
    player: players[owner],
    active: isGameActive(state, ts),
    walletsQueue,
    playersLimit: state.playersLimit,
    start: playWindow.begin,
    enter: playWindow.enter,
    end: playWindow.end,
    players,
    gameplayMode,
    gameplayPrize,
  };
}

export function isGameActive(state, ts) {
  console.log(ts, state.playWindow);
  return !gameNotStarted(state, ts) && !gameFinished(state, ts);
}

export function gameNotStarted(state, ts) {
  return state.playWindow.begin && ts < state.playWindow.begin;
}

export function gameFinished(state, ts) {
  return state.playWindow.end && ts > state.playWindow.end;
}
