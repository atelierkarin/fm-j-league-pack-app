import { PlayerType } from "../../shared/player-type.enum";
import { DatapackFiletype } from "../../shared/datapack-filetype.enum";

export interface PlayerDataPosition {
  goalkeeper?: number;
  defenderLeft?: number;
  defenderCentral?: number;
  defenderRight?: number;
  defensiveMidfielder?: number;
  wingBackLeft?: number;
  wingBackRight?: number;
  midfielderLeft?: number;
  midfielderCentral?: number;
  midfielderRight?: number;
  attackingMidfielderLeft?: number;
  attackingMidfielderCentral?: number;
  attackingMidfielderRight?: number;
  striker?: number;
}

export interface PlayerDataMental {
  aggression?: number;
  anticipation?: number;
  bravery?: number;
  composure?: number;
  concentration?: number;
  consistency?: number;
  decisions?: number;
  determination?: number;
  dirtiness?: number;
  flair?: number;
  importantMatches?: number;
  leadership?: number;
  movement?: number;
  positioning?: number;
  teamWork?: number;
  vision?: number;
  workRate?: number;
}

export interface PlayerDataPhysical {
  acceleration?: number;
  agility?: number;
  balance?: number;
  injuryProneness?: number;
  jumpingReach?: number;
  naturalFitness?: number;
  pace?: number;
  stamina?: number;
  strength?: number;
}

export interface PlayerDataTechnical {
  corners?: number;
  crossing?: number;
  dribbling?: number;
  finishing?: number;
  firstTouch?: number;
  freeKicks?: number;
  heading?: number;
  longShots?: number;
  longThrows?: number;
  marking?: number;
  passing?: number;
  penaltyTaking?: number;
  tackling?: number;
  technique?: number;
  versatility?: number;
}

export interface PlayerDataGoalkeeping {
  aerialAbility?: number;
  commandOfArea?: number;
  communication?: number;
  eccentricity?: number;
  handling?: number;
  kicking?: number;
  oneOnOnes?: number;
  reflexes?: number;
  rushingOut?: number;
  tendencyToPunch?: number;
  throwing?: number;
}

export interface PlayerData {
  location: {
    file: DatapackFiletype;
    id?: number;
    jleagueId?: number;
  };
  basicInfo: {
    name: string;
    nameEng: string;
    dob?: string;
    cob?: string;
    nationality: string;
    secondNationality?: string[];
    international?: {
      apps: number;
      goals: number;
    };
    isPlayer: boolean;
    isNonPlayer: boolean;
  };
  clubInfo?: {
    id: number;
    dateJoined: string;
    dateRenew?: string;
    job: PlayerType[];
    salaryPerYear?: number;
    squardNumber?: number;
  };
  loanInfo?: {
    id: number;
    dateStart: string;
    dateEnd: string;
    squardNumber?: number;
  };
  personalData?: {
    adaptability?: number;
    ambition?: number;
    controversy?: number;
    loyalty?: number;
    perssure?: number;
    professionalism?: number;
    sportsmanship?: number;
    temperament?: number;
  };
  jobReferences?: {
    headCoach?: number;
    assistantCoach?: number;
    coach?: number;
    fitnessCoach?: number;
    goalkeepingCoach?: number;
    physio?: number;
    scout?: number;
    chiefDataAnalyst?: number;
    headOfSportsScience?: number;
    generalManager?: number;
    headOfYouthDevelopment?: number;
    chairman?: number;
  };
  playerData?: {
    general: {
      ca: number;
      pa: number;
      currentReputation?: number;
      homeReputation?: number;
      worldReputation?: number;
      height?: number;
      weight?: number;
      leftFoot?: number;
      rightFoot?: number;
    };
    trainedInNation?: string[];
    trainedAtClub?: number[];
    positions?: PlayerDataPosition;
    mental?: PlayerDataMental;
    physical?: PlayerDataPhysical;
    technical?: PlayerDataTechnical;
    goalkeeping?: PlayerDataGoalkeeping;
  };
  nonPlayerData?: {
    ca?: number;
    pa?: number;
    currentReputation?: number;
    homeReputation?: number;
    worldReputation?: number;
  };
}
