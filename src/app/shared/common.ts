import { ClubData, LeagueData } from './database-filetype'

export const currentSeason = 2020;

export const getCurrentLeague = (
  leagues: LeagueData[], clubId: number
): LeagueData => {
  let returnLeague = null;
  for (let index = 0; index < leagues.length; index++) {
    const currentLeague = leagues[index];
    const currentLeagueSeason = currentLeague.seasons[0];
    if (currentLeagueSeason && currentLeagueSeason.teams.includes(clubId)) {
      returnLeague = currentLeague;
      break;
    }
  }
  return returnLeague;
};
