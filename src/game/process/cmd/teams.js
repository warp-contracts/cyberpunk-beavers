import { TEAMS } from '../../common/teams.mjs';

export function setTeams(state) {
  const teamsAmount = state.teamsConfig?.amount;
  if (teamsAmount && teamsAmount > 0) {
    const teams = state.teamsConfig.teams;
    for (let i = 0; i < teamsAmount; i++) {
      const team = Object.values(TEAMS).find((c) => c.id == i);
      teams[i] = {
        id: i,
        color: team.color,
        name: team.name,
        players: [],
        points: 0,
      };
    }
    state.lastTeamId = -1;
  }
}

export function assignToTeam(state, walletAddress) {
  const teamsConfig = state.teamsConfig;
  const teams = teamsConfig.teams;
  state.lastTeamId = state.lastTeamId + 1 > teams.length - 1 ? 0 : ++state.lastTeamId;
  const teamId = state.lastTeamId;
  teams[teamId].players.push(walletAddress);
  return teams[teamId];
}

export function awardTeam(state) {
  const teamsConfig = state.teamsConfig;
  const teams = teamsConfig.teams;
  if (teams.length > 0) {
    const winningTeam = findWinningTeam(teamsConfig.teams);
    if (winningTeam.points == 0) {
      console.log(`No team won.`, teamsConfig.teams);
      return;
    }
    console.log(`Winning team: ${winningTeam.id}.`);
    for (let walletAddress of winningTeam.players) {
      const playerToAward = state.players[walletAddress];
      playerToAward.stats.coins.gained += Number(teamsConfig.bonus);
    }
  }
}

export function findWinningTeam(teams) {
  let winningTeam = teams[0];
  if (teams.length > 1) {
    for (let team of teams) {
      if (team.points > winningTeam.points) {
        winningTeam = team;
      } else if (team.points == winningTeam.points) {
        if (team.frags > winningTeam.frags) {
          winningTeam = team;
        } else if (team.frags == winningTeam.frags) {
          if (team.deaths < winningTeam.deaths) {
            winningTeam = team;
          } else if (team.deaths == winningTeam.deaths) {
            console.log(`I hope this will not happen`);
          }
        }
      }
    }
  }
  return winningTeam;
}
