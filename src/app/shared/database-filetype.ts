export interface ClubData {
  id: number;
  clubName: string;
  clubShortname?: string;
  clubNationality?: string;
  clubColor1?: string;
  clubColor2?: string;
}

export interface LeagueData {
  id: number;
  leagueName: string;
  seasons?: { season: number; teams: number[] }[];
  leagueCaGuideline?: number[];
}