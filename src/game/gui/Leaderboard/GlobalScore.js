import { dryrun } from '@permaweb/aoconnect';
import { GameTreasure } from '../../common/const.mjs';

export const GlobalScore = {
  list: [],
  limit: 10,
  loadList: function (leaderboardProcessId, walletAddress, page, orderBy) {
    const offset = GlobalScore.limit * (page - 1 || 0);
    return dryrun({
      process: leaderboardProcessId,
      Owner: walletAddress,
      tags: [
        { name: 'Action', value: 'GlobalScores' },
        { name: 'Limit', value: `${GlobalScore.limit}` },
        { name: 'Offset', value: `${offset}` },
        { name: 'OrderBy', value: `${orderBy || GameTreasure.cbcoin.type}` },
      ],
      data: '1984',
    }).then(function (result) {
      console.log(result);
      GlobalScore.list = JSON.parse(result.Output.data);
      console.log(`PlayerGlobalScore, got those results`, GlobalScore.list);
      m.redraw();
    });
  },
};
