export interface ClubData {
  id: number;
  clubName: string;
  clubShortname?: string;
  clubNationality?: string;
  clubColor1?: string;
  clubColor2?: string;
  status?: {
    overall?: number;
    attack?: number;
    midfield?: number;
    defence?: number;
  }
}

export interface LeagueData {
  id: number;
  leagueName: string;
  seasons?: { season: number; teams: number[] }[];
  leagueCaGuideline?: number[];
}

export interface PlayerHistory {
  season: number;
  clubId: number;
  clubName: string;
  leagueId: number;
  leagueName: string;
  totalApp: number;
  totalGoals: number;
}