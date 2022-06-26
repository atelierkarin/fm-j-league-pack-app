import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { UntypedFormGroup, UntypedFormControl } from "@angular/forms";
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

  public basicInfoFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl(""),
    nameEng: new UntypedFormControl(""),
    dob: new UntypedFormControl(null),
    nationality: new UntypedFormControl(""),
    secondNationality: new UntypedFormControl(null),
    isPlayer: new UntypedFormControl(true),
    isNonPlayer: new UntypedFormControl(false),
    file: new UntypedFormControl(DatapackFiletype["新規選手.fmf"]),
    jleagueId: new UntypedFormControl(null),
  });
  public clubInfoFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    dateJoined: new UntypedFormControl(null),
    dateRenew: new UntypedFormControl(null),
    job: new UntypedFormControl([PlayerType.選手]),
    squadNumber: new UntypedFormControl(null),
  });
  public loanInfoFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    dateStart: new UntypedFormControl(""),
    dateEnd: new UntypedFormControl(""),
    squadNumber: new UntypedFormControl(null),
  });
  public personalDataFormGroup = new UntypedFormGroup({
    adaptability: new UntypedFormControl(null),
    ambition: new UntypedFormControl(null),
    controversy: new UntypedFormControl(null),
    loyalty: new UntypedFormControl(null),
    perssure: new UntypedFormControl(null),
    professionalism: new UntypedFormControl(null),
    sportsmanship: new UntypedFormControl(null),
    temperament: new UntypedFormControl(null),
  });
  public jobReferencesFormGroup = new UntypedFormGroup({
    headCoach: new UntypedFormControl(null),
    assistantCoach: new UntypedFormControl(null),
    coach: new UntypedFormControl(null),
    fitnessCoach: new UntypedFormControl(null),
    goalkeepingCoach: new UntypedFormControl(null),
    physio: new UntypedFormControl(null),
    scout: new UntypedFormControl(null),
    chiefDataAnalyst: new UntypedFormControl(null),
    headOfSportsScience: new UntypedFormControl(null),
    generalManager: new UntypedFormControl(null),
    headOfYouthDevelopment: new UntypedFormControl(null),
    chairman: new UntypedFormControl(null),
  });

  public playerDataGeneralFormGroup = new UntypedFormGroup({
    ca: new UntypedFormControl(0),
    pa: new UntypedFormControl(0),
    currentReputation: new UntypedFormControl(null),
    homeReputation: new UntypedFormControl(null),
    worldReputation: new UntypedFormControl(null),
    height: new UntypedFormControl(null),
    weight: new UntypedFormControl(null),
    leftFoot: new UntypedFormControl(null),
    rightFoot: new UntypedFormControl(null),
  });

  public playerDataPositionFormGroup = new UntypedFormGroup({
    goalkeeper: new UntypedFormControl(null),
    defenderLeft: new UntypedFormControl(null),
    defenderCentral: new UntypedFormControl(null),
    defenderRight: new UntypedFormControl(null),
    defensiveMidfielder: new UntypedFormControl(null),
    wingBackLeft: new UntypedFormControl(null),
    wingBackRight: new UntypedFormControl(null),
    midfielderLeft: new UntypedFormControl(null),
    midfielderCentral: new UntypedFormControl(null),
    midfielderRight: new UntypedFormControl(null),
    attackingMidfielderLeft: new UntypedFormControl(null),
    attackingMidfielderCentral: new UntypedFormControl(null),
    attackingMidfielderRight: new UntypedFormControl(null),
    striker: new UntypedFormControl(null),
  });

  public playerDataMentalFormGroup = new UntypedFormGroup({
    aggression: new UntypedFormControl(null),
    anticipation: new UntypedFormControl(null),
    bravery: new UntypedFormControl(null),
    composure: new UntypedFormControl(null),
    concentration: new UntypedFormControl(null),
    consistency: new UntypedFormControl(null),
    decisions: new UntypedFormControl(null),
    determination: new UntypedFormControl(null),
    dirtiness: new UntypedFormControl(null),
    flair: new UntypedFormControl(null),
    importantMatches: new UntypedFormControl(null),
    leadership: new UntypedFormControl(null),
    movement: new UntypedFormControl(null),
    positioning: new UntypedFormControl(null),
    teamWork: new UntypedFormControl(null),
    vision: new UntypedFormControl(null),
    workRate: new UntypedFormControl(null),
  });

  public playerDataPhysicalFormGroup = new UntypedFormGroup({
    acceleration: new UntypedFormControl(null),
    agility: new UntypedFormControl(null),
    balance: new UntypedFormControl(null),
    injuryProneness: new UntypedFormControl(null),
    jumpingReach: new UntypedFormControl(null),
    naturalFitness: new UntypedFormControl(null),
    pace: new UntypedFormControl(null),
    stamina: new UntypedFormControl(null),
    strength: new UntypedFormControl(null),
  });

  public playerDataTechnicalFormGroup = new UntypedFormGroup({
    corners: new UntypedFormControl(null),
    crossing: new UntypedFormControl(null),
    dribbling: new UntypedFormControl(null),
    finishing: new UntypedFormControl(null),
    firstTouch: new UntypedFormControl(null),
    freeKicks: new UntypedFormControl(null),
    heading: new UntypedFormControl(null),
    longShots: new UntypedFormControl(null),
    longThrows: new UntypedFormControl(null),
    marking: new UntypedFormControl(null),
    passing: new UntypedFormControl(null),
    penaltyTaking: new UntypedFormControl(null),
    tackling: new UntypedFormControl(null),
    technique: new UntypedFormControl(null),
    versatility: new UntypedFormControl(null),
  });

  public playerDataGoalkeepingFormGroup = new UntypedFormGroup({
    aerialAbility: new UntypedFormControl(null),
    commandOfArea: new UntypedFormControl(null),
    communication: new UntypedFormControl(null),
    eccentricity: new UntypedFormControl(null),
    handling: new UntypedFormControl(null),
    kicking: new UntypedFormControl(null),
    oneOnOnes: new UntypedFormControl(null),
    reflexes: new UntypedFormControl(null),
    rushingOut: new UntypedFormControl(null),
    tendencyToPunch: new UntypedFormControl(null),
    throwing: new UntypedFormControl(null),
  });

  public playerDataFormGroup = new UntypedFormGroup({
    general: this.playerDataGeneralFormGroup,
    positions: this.playerDataPositionFormGroup,
    mental: this.playerDataMentalFormGroup,
    physical: this.playerDataPhysicalFormGroup,
    technical: this.playerDataTechnicalFormGroup,
    goalkeeping: this.playerDataGoalkeepingFormGroup,
  });

  public nonPlayerDataFormGroup = new UntypedFormGroup({
    ca: new UntypedFormControl(0),
    pa: new UntypedFormControl(0),
    currentReputation: new UntypedFormControl(null),
    homeReputation: new UntypedFormControl(null),
    worldReputation: new UntypedFormControl(null),
  });

  public playerForm = new UntypedFormGroup({
    id: new UntypedFormControl(null),
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

  public useCustomClubId: boolean = false;

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

  onChangeClub() {
    console.log("CLUB", this.playerForm.value.clubInfo.id)
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
