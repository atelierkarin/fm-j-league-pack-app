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

export const getPAUpperLimit = (pa) => {
  if (pa === -1) return 20;
  if (pa === -15) return 30;
  if (pa === -2) return 40;
  if (pa === -25) return 50;
  if (pa === -3) return 60;
  if (pa === -35) return 70;
  if (pa === -4) return 80;
  if (pa === -45) return 90;
  if (pa === -5) return 100;
  if (pa === -55) return 110;
  if (pa === -6) return 120;
  if (pa === -65) return 130;
  if (pa === -7) return 140;
  if (pa === -75) return 150;
  if (pa === -8) return 160;
  if (pa === -85) return 170;
  if (pa === -9) return 180;
  if (pa === -95) return 190;
  if (pa === -10) return 200;
}