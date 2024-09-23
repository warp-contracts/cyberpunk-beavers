import { Send } from './aos.helper.js';
import { beforeAll, describe, test, expect } from 'vitest';
import fs from 'fs';
import { sendScores } from '../src/game/process/cmd/sendScores.mjs';
import { addCoins } from '../src/game/common/tools.mjs';
import Const, { BEAVER_TYPES, GameTreasure } from '../src/game/common/const.mjs';
import { registerPlayer } from '../src/game/process/cmd/registerPlayer.mjs';
import { finishHim } from '../src/game/process/cmd/attack.mjs';

global.ao = {};
ao.send = function (di) {
  console.log(`got me some data`, di);
  ao.di = di;
};

const state = {
  scoresSent: false,
  mode: Const.GAME_MODES.default.type,
  walletsWhitelist: [],
  walletsQueue: [],
  gameTokens: Const.DEFAULT_GAME_TOKENS,
  hubProcessId: 'hubId',
  leaderboardProcessId: 'AOS',
  map: {
    width: 10,
    height: 10,
  },
  playersOnTiles: Array(10)
    .fill([])
    .map(() => Array(10)),
  obstaclesTilemap: Array(10)
    .fill([])
    .map(() => Array(10)),
  generatedWalletsMapping: {},
  players: {},
};

describe('LeaderboardTestJs', () => {
  test('Eval leaderboard contract', async () => {
    const code = fs.readFileSync('./lua/leaderboard/leaderboard.lua', 'utf-8');
    const result = await Send({ Action: 'Eval', Data: code });

    console.dir(result, { showHidden: false, depth: null, colors: true });
    expect(result.Output.data).eq('');
    expect(result.Messages).toEqual([]);
  });

  test('Add game scores', async () => {
    expect((await Send(addSingleScoreAction('wallet_44', 40, 20))).Output.data).not.toContain('Error');
    expect((await Send(addSingleScoreAction('wallet_12', 164, 0))).Output.data).not.toContain('Error');
    expect((await Send(addSingleScoreAction('wallet_22', 140, 2))).Output.data).not.toContain('Error');
  });

  test('Add scores - different owner unauthorised', async () => {
    const action = addSingleScoreAction('wallet_12', 164, 0);
    action.Owner = 'DIFFERENT_OWNER';
    action.From = 'DIFFERENT_OWNER';
    const actionResult = await Send(action);
    console.log(actionResult);
    expect(actionResult.Messages[0].Data).toEqual('DIFFERENT_OWNER is unauthorized');
  });

  test('Add scores - different process unauthorised', async () => {
    const action = addSingleScoreAction('wallet_12', 164, 0);
    action.Owner = 'DIFFERENT_OWNER';
    action.From = 'DIFFERENT_PROCESS';
    const actionResult = await Send(action);
    console.log(actionResult);
    expect(actionResult.Messages[0].Data).toEqual('Message is not trusted by this process!');
  });

  test('Read global scores', async () => {
    const actionResult = await Send({ Action: 'GlobalScores' });
    const scores = JSON.parse(actionResult.Output.data);
    console.log(scores);

    expect(scores[0]).toEqual({
      cbcoin: 164,
      tio: 0,
      trunk: 0,
      war: 0,
      rsg: 0,
      gun: 0,
      wallet: 'wallet_12',
      frags: 0,
      deaths: 0,
    });
    expect(scores[1]).toEqual({
      cbcoin: 140,
      tio: 2,
      trunk: 0,
      war: 0,
      rsg: 0,
      gun: 0,
      wallet: 'wallet_22',
      frags: 0,
      deaths: 0,
    });
    expect(scores[2]).toEqual({
      cbcoin: 40,
      tio: 20,
      trunk: 0,
      war: 0,
      rsg: 0,
      gun: 0,
      wallet: 'wallet_44',
      frags: 0,
      deaths: 0,
    });
  });

  test('Game 1. - add scores', async () => {
    state.players = {};
    state.scoresSent = false;
    registerPlayer(state, {
      beaverId: BEAVER_TYPES.hacker_beaver.name,
      mainWalletAddress: 'wallet_11',
      userName: 'beaver_11',
      balance: 0,
      generatedWalletAddress: 'wallet_11',
    });
    registerPlayer(state, {
      beaverId: BEAVER_TYPES.speedy_beaver.name,
      mainWalletAddress: 'wallet_22',
      userName: 'beaver_22',
      balance: 0,
      generatedWalletAddress: 'wallet_22',
    });
    finishHim(state.players.wallet_11, state.players.wallet_22, { baseDmg: 500 }, state);

    addCoins(state.players.wallet_11, GameTreasure.cbcoin.type, 120, state);
    addCoins(state.players.wallet_22, GameTreasure.war.type, 5, state);
    sendScores(state);
    const sendResult = await Send({ ...ao.di, From: 'Game1ProcessId' });
    expect(sendResult.Output.data).not.toContain('Error');
  });

  test('Game 1. - read global scores', async () => {
    const actionResult = await Send({ Action: 'GlobalScores' });
    const scores = JSON.parse(actionResult.Output.data);
    console.log(scores);
    expect(scores[0]).toEqual({
      cbcoin: 320,
      tio: 0,
      war: 0,
      trunk: 0,
      rsg: 0,
      gun: 0,
      wallet: 'wallet_11',
      frags: 1,
      deaths: 0,
    });
    expect(scores[1]).toEqual({
      cbcoin: 164,
      tio: 0,
      war: 0,
      trunk: 0,
      rsg: 0,
      gun: 0,
      wallet: 'wallet_12',
      frags: 0,
      deaths: 0,
    });
    expect(scores[2]).toEqual({
      cbcoin: 140,
      tio: 2,
      war: 15000000000,
      trunk: 0,
      rsg: 0,
      gun: 0,
      wallet: 'wallet_22',
      frags: 0,
      deaths: 1,
    });
    expect(scores[3]).toEqual({
      cbcoin: 40,
      tio: 20,
      war: 0,
      trunk: 0,
      rsg: 0,
      gun: 0,
      wallet: 'wallet_44',
      frags: 0,
      deaths: 0,
    });
  });

  test('Game 2. - add scores', async () => {
    state.players = {};
    state.scoresSent = false;
    registerPlayer(state, {
      beaverId: BEAVER_TYPES.hacker_beaver.name,
      mainWalletAddress: 'wallet_77',
      userName: 'wallet_77',
      balance: 0,
      generatedWalletAddress: 'wallet_77',
    });
    registerPlayer(state, {
      beaverId: BEAVER_TYPES.speedy_beaver.name,
      mainWalletAddress: 'wallet_22',
      userName: 'beaver_22',
      balance: 0,
      generatedWalletAddress: 'wallet_22',
    });
    finishHim(state.players.wallet_22, state.players.wallet_77, { baseDmg: 500 }, state);
    finishHim(state.players.wallet_77, state.players.wallet_22, { baseDmg: 500 }, state);
    finishHim(state.players.wallet_77, state.players.wallet_22, { baseDmg: 500 }, state);

    addCoins(state.players.wallet_22, GameTreasure.cbcoin.type, 120, state);
    addCoins(state.players.wallet_77, GameTreasure.cbcoin.type, 1600, state);
    addCoins(state.players.wallet_77, GameTreasure.gun.type, 1, state);
    addCoins(state.players.wallet_77, GameTreasure.trunk.type, 15, state);
    sendScores(state);

    const sendScoresRes = await Send({ ...ao.di, From: 'Game2ProcessId' });
    expect(sendScoresRes.Output.data).not.toContain('Error');
  });

  test('Game 3. - add scores', async () => {
    state.players = {};
    state.scoresSent = false;
    state.mode = Const.GAME_MODES.rsg.type;
    state.hubProcessId = 'hubId2';
    registerPlayer(state, {
      beaverId: BEAVER_TYPES.speedy_beaver.name,
      mainWalletAddress: 'wallet_22',
      userName: 'beaver_22',
      balance: 0,
      generatedWalletAddress: 'wallet_22',
    });
    addCoins(state.players.wallet_22, GameTreasure.rsg.type, 120, state);
    sendScores(state);

    const sendScoresRes = await Send({ ...ao.di, From: 'Game3ProcessId' });
    expect(sendScoresRes.Output.data).not.toContain('Error');
  });

  test('Game 3. - read global scores', async () => {
    const actionResult = await Send({ Action: 'GlobalScores' });
    const scores = JSON.parse(actionResult.Output.data);
    console.log(scores);

    const actionResult2 = await Send({ Action: 'GameScores', GameProcessId: 'Game3ProcessId' });
    console.log(actionResult2);

    expect(scores[0]).toEqual({
      cbcoin: 2180,
      tio: 0,
      war: 0,
      trunk: 135,
      rsg: 0,
      gun: 1,
      wallet: 'wallet_77',
      frags: 2,
      deaths: 1,
    });
    expect(scores[1]).toEqual({
      cbcoin: 320,
      tio: 0,
      war: 0,
      trunk: 0,
      rsg: 0,
      gun: 0,
      wallet: 'wallet_11',
      frags: 1,
      deaths: 0,
    });
    expect(scores[2]).toEqual({
      cbcoin: 260,
      tio: 2,
      war: 15000000000,
      trunk: 0,
      rsg: 120,
      gun: 0,
      wallet: 'wallet_22',
      frags: 1,
      deaths: 3,
    });
    expect(scores[3]).toEqual({
      cbcoin: 164,
      tio: 0,
      war: 0,
      trunk: 0,
      rsg: 0,
      gun: 0,
      wallet: 'wallet_12',
      frags: 0,
      deaths: 0,
    });
    expect(scores[4]).toEqual({
      cbcoin: 40,
      tio: 20,
      war: 0,
      trunk: 0,
      rsg: 0,
      gun: 0,
      wallet: 'wallet_44',
      frags: 0,
      deaths: 0,
    });
  });

  test('Game 3. - read global scores ordered by rsg', async () => {
    const globalSortedByRsg = JSON.parse((await Send({ Action: 'GlobalScores', OrderBy: 'rsg' })).Output.data);
    console.log(globalSortedByRsg);
    expect(globalSortedByRsg[0]).toEqual({
      cbcoin: 260,
      tio: 2,
      war: 15000000000,
      trunk: 0,
      rsg: 120,
      gun: 0,
      wallet: 'wallet_22',
      frags: 1,
      deaths: 3,
    });
  });
});

function addSingleScoreAction(wallet, coins, tio) {
  return addScoreAction({
    [wallet]: {
      tokens: {
        cbcoin: coins,
        tio,
      },
      kills: {},
    },
  });
}

function addScoreAction(scores) {
  return {
    Action: 'AddGameScores',
    HubProcessId: 'asd',
    Data: JSON.stringify(scores),
  };
}
