import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import diff from "deep-diff";

import * as fromApp from "../../store/app.reducer";
import * as DatabaseActions from "../../database/store/database.actions";

import {
  PlayerData,
  PlayerDataSimple,
} from "../../data/fmJDatabase/PlayerData.interface";

import * as CitiesData from "../../data/fmJDatabase/Cities.data";
import { ClubData } from "../../shared/database-filetype";
import { nationality } from "../../shared/nationality";

import { PlayerType } from "../../shared/player-type.enum";
import { DatapackFiletype } from "../../shared/datapack-filetype.enum";

import * as f from "./form.data";

function removeEmpty(obj) {
  Object.keys(obj).forEach(function (key) {
    try {
      if (obj[key] && typeof obj[key] === "object") removeEmpty(obj[key]);
      else if (obj[key] == null) delete obj[key];
    } catch (err) {}
  });
}

@Component({
  selector: "app-admin-player-db",
  templateUrl: "./admin-player-db.component.html",
  styleUrls: ["./admin-player-db.component.css"],
})
export class AdminPlayerDbComponent implements OnInit, OnDestroy {
  public searchPlayerName: string;
  public searchPlayers: {
    player: PlayerDataSimple;
    id: number;
    label: string;
  }[];
  public searchPlayerId: string;

  public basicInfoFormGroup = new FormGroup({
    name: new FormControl(""),
    nameEng: new FormControl(""),
    dob: new FormControl(null),
    nationality: new FormControl(""),
    secondNationality: new FormControl(null),
    isPlayer: new FormControl(true),
    isNonPlayer: new FormControl(false),
    file: new FormControl(DatapackFiletype["新規選手.fmf"]),
    jleagueId: new FormControl(null),
  });
  public clubInfoFormGroup = new FormGroup({
    id: new FormControl(null),
    dateJoined: new FormControl(null),
    dateRenew: new FormControl(null),
    job: new FormControl([PlayerType.選手]),
    squadNumber: new FormControl(null),
  });
  public loanInfoFormGroup = new FormGroup({
    id: new FormControl(null),
    dateStart: new FormControl(""),
    dateEnd: new FormControl(""),
    squadNumber: new FormControl(null),
  });
  public personalDataFormGroup = new FormGroup({
    adaptability: new FormControl(null),
    ambition: new FormControl(null),
    controversy: new FormControl(null),
    loyalty: new FormControl(null),
    perssure: new FormControl(null),
    professionalism: new FormControl(null),
    sportsmanship: new FormControl(null),
    temperament: new FormControl(null),
  });
  public jobReferencesFormGroup = new FormGroup({
    headCoach: new FormControl(null),
    assistantCoach: new FormControl(null),
    coach: new FormControl(null),
    fitnessCoach: new FormControl(null),
    goalkeepingCoach: new FormControl(null),
    physio: new FormControl(null),
    scout: new FormControl(null),
    chiefDataAnalyst: new FormControl(null),
    headOfSportsScience: new FormControl(null),
    generalManager: new FormControl(null),
    headOfYouthDevelopment: new FormControl(null),
    chairman: new FormControl(null),
  });

  public playerDataGeneralFormGroup = new FormGroup({
    ca: new FormControl(0),
    pa: new FormControl(0),
    currentReputation: new FormControl(null),
    homeReputation: new FormControl(null),
    worldReputation: new FormControl(null),
    height: new FormControl(null),
    weight: new FormControl(null),
    leftFoot: new FormControl(null),
    rightFoot: new FormControl(null),
  });

  public playerDataPositionFormGroup = new FormGroup({
    goalkeeper: new FormControl(null),
    defenderLeft: new FormControl(null),
    defenderCentral: new FormControl(null),
    defenderRight: new FormControl(null),
    defensiveMidfielder: new FormControl(null),
    wingBackLeft: new FormControl(null),
    wingBackRight: new FormControl(null),
    midfielderLeft: new FormControl(null),
    midfielderCentral: new FormControl(null),
    midfielderRight: new FormControl(null),
    attackingMidfielderLeft: new FormControl(null),
    attackingMidfielderCentral: new FormControl(null),
    attackingMidfielderRight: new FormControl(null),
    striker: new FormControl(null),
  });

  public playerDataMentalFormGroup = new FormGroup({
    aggression: new FormControl(null),
    anticipation: new FormControl(null),
    bravery: new FormControl(null),
    composure: new FormControl(null),
    concentration: new FormControl(null),
    consistency: new FormControl(null),
    decisions: new FormControl(null),
    determination: new FormControl(null),
    dirtiness: new FormControl(null),
    flair: new FormControl(null),
    importantMatches: new FormControl(null),
    leadership: new FormControl(null),
    movement: new FormControl(null),
    positioning: new FormControl(null),
    teamWork: new FormControl(null),
    vision: new FormControl(null),
    workRate: new FormControl(null),
  });

  public playerDataPhysicalFormGroup = new FormGroup({
    acceleration: new FormControl(null),
    agility: new FormControl(null),
    balance: new FormControl(null),
    injuryProneness: new FormControl(null),
    jumpingReach: new FormControl(null),
    naturalFitness: new FormControl(null),
    pace: new FormControl(null),
    stamina: new FormControl(null),
    strength: new FormControl(null),
  });

  public playerDataTechnicalFormGroup = new FormGroup({
    corners: new FormControl(null),
    crossing: new FormControl(null),
    dribbling: new FormControl(null),
    finishing: new FormControl(null),
    firstTouch: new FormControl(null),
    freeKicks: new FormControl(null),
    heading: new FormControl(null),
    longShots: new FormControl(null),
    longThrows: new FormControl(null),
    marking: new FormControl(null),
    passing: new FormControl(null),
    penaltyTaking: new FormControl(null),
    tackling: new FormControl(null),
    technique: new FormControl(null),
    versatility: new FormControl(null),
  });

  public playerDataGoalkeepingFormGroup = new FormGroup({
    aerialAbility: new FormControl(null),
    commandOfArea: new FormControl(null),
    communication: new FormControl(null),
    eccentricity: new FormControl(null),
    handling: new FormControl(null),
    kicking: new FormControl(null),
    oneOnOnes: new FormControl(null),
    reflexes: new FormControl(null),
    rushingOut: new FormControl(null),
    tendencyToPunch: new FormControl(null),
    throwing: new FormControl(null),
  });

  public playerDataFormGroup = new FormGroup({
    general: this.playerDataGeneralFormGroup,
    positions: this.playerDataPositionFormGroup,
    mental: this.playerDataMentalFormGroup,
    physical: this.playerDataPhysicalFormGroup,
    technical: this.playerDataTechnicalFormGroup,
    goalkeeping: this.playerDataGoalkeepingFormGroup,
  });

  public nonPlayerDataFormGroup = new FormGroup({
    ca: new FormControl(0),
    pa: new FormControl(0),
    currentReputation: new FormControl(null),
    homeReputation: new FormControl(null),
    worldReputation: new FormControl(null),
  });

  public playerForm = new FormGroup({
    id: new FormControl(null),
    basicInfo: this.basicInfoFormGroup,
    clubInfo: this.clubInfoFormGroup,
    loanInfo: this.loanInfoFormGroup,
    personalData: this.personalDataFormGroup,
    jobReferences: this.jobReferencesFormGroup,
    playerData: this.playerDataFormGroup,
    nonPlayerData: this.nonPlayerDataFormGroup,
  });

  public playerTypeList: { key: number; val: string }[];
  public datepackFileTypeList: { key: number; val: string }[];
  public nationalityList: {
    name: string;
    code: string;
  }[] = nationality;
  public cityList: CitiesData.CityData[] = CitiesData.Cities;
  public clubList: ClubData[];

  public nationalityDropdownSettings = {
    singleSelection: true,
    idField: "code",
    textField: "name",
    allowSearchFilter: true,
  };

  public formList = f;

  public loading: boolean = false;
  public updateError: string;

  public editPlayerId: number;
  public editPlayer: PlayerData;

  private coreSubscription: Subscription;
  private databaseSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.playerTypeList = Object.keys(PlayerType)
      .map(Number)
      .filter(Number.isInteger)
      .map((k) => ({ key: k, val: PlayerType[k] }));
    this.datepackFileTypeList = Object.keys(DatapackFiletype)
      .map(Number)
      .filter(Number.isInteger)
      .map((k) => ({ key: k, val: DatapackFiletype[k] }));

    this.route.paramMap.subscribe((paramMap) => {
      const id = parseInt(paramMap.get("id"));
      if (id && id > 0) this.store.dispatch(new DatabaseActions.LoadPlayer(id));
    });

    this.coreSubscription = this.store.select("core").subscribe((coreState) => {
      this.clubList = coreState.clubs;
    });
    this.databaseSubscription = this.store
      .select("database")
      .subscribe((databaseState) => {
        this.loading = databaseState.loading;
        this.updateError = databaseState.errMsg;

        if (databaseState.editPlayer) {
          if (
            databaseState.editPlayer.clubInfo &&
            databaseState.editPlayer.clubInfo.id
          ) {
            const isClubIdExist = this.clubList.find(
              (c) => c.id === databaseState.editPlayer.clubInfo.id
            );
            if (!isClubIdExist) {
              this.clubList = [
                ...this.clubList,
                {
                  id: databaseState.editPlayer.clubInfo.id,
                  clubName: "" + databaseState.editPlayer.clubInfo.id,
                },
              ];
            }
          }
          if (
            databaseState.editPlayer.loanInfo &&
            databaseState.editPlayer.loanInfo.id
          ) {
            const isClubIdExist = this.clubList.find(
              (c) => c.id === databaseState.editPlayer.loanInfo.id
            );
            if (!isClubIdExist) {
              this.clubList = [
                ...this.clubList,
                {
                  id: databaseState.editPlayer.loanInfo.id,
                  clubName: "" + databaseState.editPlayer.loanInfo.id,
                },
              ];
            }
          }
          this.editPlayerId = databaseState.editPlayer.id;
          this.editPlayer = databaseState.editPlayer;
        } else {
          this.editPlayerId = null;
          this.editPlayer = null;
        }

        if (!this.loading) {
          this.resetForm();
        }
      });
  }

  ngOnDestroy() {
    if (this.coreSubscription) {
      this.coreSubscription.unsubscribe();
    }
    if (this.databaseSubscription) {
      this.databaseSubscription.unsubscribe();
    }
  }

  onSubmit() {
    let personalData = {
      ...this.playerForm.value.personalData,
    };
    let playerDataGeneral = {
      ...this.playerForm.value.playerData.general,
    };
    let playerDataPositions = {
      ...this.playerForm.value.playerData.positions,
    };
    let playerDataMental = {
      ...this.playerForm.value.playerData.mental,
    };
    let playerDataPhyiscal = {
      ...this.playerForm.value.playerData.physical,
    };
    let playerDataTechnical = {
      ...this.playerForm.value.playerData.technical,
    };
    let playerDataGoalkeeping = {
      ...this.playerForm.value.playerData.goalkeeping,
    };

    removeEmpty(personalData);
    removeEmpty(playerDataGeneral);
    removeEmpty(playerDataPositions);
    removeEmpty(playerDataMental);
    removeEmpty(playerDataPhyiscal);
    removeEmpty(playerDataTechnical);
    removeEmpty(playerDataGoalkeeping);

    let player: PlayerData = {
      id: this.playerForm.value.id,
      basicInfo: {
        ...this.playerForm.value.basicInfo
      },
      clubInfo: this.playerForm.value.clubInfo.id
        ? this.playerForm.value.clubInfo
        : null,
      loanInfo: this.playerForm.value.loanInfo.id
        ? this.playerForm.value.loanInfo
        : null,
      personalData: Object.keys(personalData).length > 0 ? personalData : null,
      playerData: this.playerForm.value.basicInfo.isPlayer
        ? {
            general:
              Object.keys(playerDataGeneral).length > 0
                ? playerDataGeneral
                : null,
            positions:
              Object.keys(playerDataPositions).length > 0
                ? playerDataPositions
                : null,
            mental:
              Object.keys(playerDataMental).length > 0
                ? playerDataMental
                : null,
            physical:
              Object.keys(playerDataPhyiscal).length > 0
                ? playerDataPhyiscal
                : null,
            technical:
              Object.keys(playerDataTechnical).length > 0
                ? playerDataTechnical
                : null,
            goalkeeping:
              Object.keys(playerDataGoalkeeping).length > 0
                ? playerDataGoalkeeping
                : null,
          }
        : null,
      nonPlayerData: this.playerForm.value.basicInfo.isNonPlayer
        ? this.playerForm.value.nonPlayerData
        : null,
    };
    removeEmpty(player);

    let differences = null;
    if (this.editPlayerId) {
      differences = diff.diff(this.editPlayer, player);
    }

    this.store.dispatch(
      new DatabaseActions.UpdatePlayer(player)
    );
  }

  onAddPlayer() {
    this.resetForm();
  }

  onDelete() {
    this.store.dispatch(new DatabaseActions.DeletePlayer(this.editPlayerId));
  }

  private resetForm() {
    this.playerForm.reset();

    if (this.editPlayer) {
      let editPlayerToSet = { ...this.editPlayer };
      removeEmpty(editPlayerToSet);
      this.playerForm.patchValue(editPlayerToSet);
    } else {
      this.playerForm.patchValue({
        basicInfo: {
          name: "",
          nameEng: "",
          nationality: "JPN",
          isPlayer: true,
          isNonPlayer: false,
          file: DatapackFiletype["新規選手.fmf"],
        },
        clubInfo: {
          dateJoined: "",
          job: [PlayerType.選手],
        },
        loanInfo: {
          dateStart: "",
          dateEnd: "",
        },
      });
    }
  }

  private formatDate(date: Date, format: string) {
    format = format.replace(/yyyy/g, "" + date.getFullYear());
    format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ("00" + date.getMilliseconds()).slice(-3));
    return format;
  }
}
