import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { PlayerType } from "../player-type.enum";

import getNationality from "./nationality-match-table";
import getPlayerType from "./job-table-match-table";

function removeEmpty(obj) {
  Object.keys(obj).forEach(function (key) {
    try {
      if (obj[key] && typeof obj[key] === "object") removeEmpty(obj[key]);
      else if (obj[key] == null) delete obj[key];
    } catch (err) {}
  });
}

@Component({
  selector: "app-import-csv-modal-content",
  templateUrl: "./import-csv-modal-content.component.html",
  styleUrls: ["./import-csv-modal-content.component.css"],
})
export class ImportCsvModalContentComponent implements OnInit {
  @Input() data;
  @Input() datafileType;
  @Input() updateId;

  public formattedData;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.formattedData = this.genPlayerData();
  }

  public genResultData() {
    if (this.updateId) {
      let returnData = {
        ...this.formattedData,
        id: this.updateId
      };
      delete returnData["basicInfo"]["name"];
      return returnData;
    } else {
      return this.formattedData;
    }
  }

  public getJsonData() {
    return JSON.stringify(this.data, null, 2);
  }

  public getJsonFormattedData() {
    return JSON.stringify(this.formattedData, null, 2);
  }

  public genPlayerData() {
    let player = {};
    player["basicInfo"] = this.getBasicInfo();

    let clubInfo = this.getClubInfo();
    if (clubInfo) player["clubInfo"] = clubInfo;

    let loanInfo = this.getLoanInfo();
    if (loanInfo) player["loanInfo"] = loanInfo;

    let personalData = this.getPersonalData();
    if (personalData) player["personalData"] = personalData;

    if (this.isPlayer()) {
      let playerData = this.getPlayerData();
      player["playerData"] = playerData;
    }

    if (this.isNonPlayer()) {
      let nonPlayerData = this.getNonPlayerData();
      if (nonPlayerData) player["nonPlayerData"] = nonPlayerData;
    }

    return player;
  }

  // PRIVATE FUNCTIONS

  private checkNotEmpty(tag): boolean {
    return tag in this.data && !!this.data[tag];
  }

  private formatNumber(v): number {
    return v && v !== 0 ? parseInt(v) : null;
  }

  private isPlayer(): boolean {
    if (this.checkNotEmpty("clubJob")) {
      const playerTypes = getPlayerType(this.data["clubJob"]);
      const findPlayersJob = playerTypes ? playerTypes.find(pt => pt === PlayerType.選手) : null;
      return findPlayersJob !== null && findPlayersJob !== undefined ? true : false;
    } else {
      return (
        (this.checkNotEmpty("ca")) ||
        (this.checkNotEmpty("pa")) ||
        this.data["person_type"] === 1 ||
        !this.isNonPlayer()
      );
    }
  }

  private isNonPlayer(): boolean {
    if (this.checkNotEmpty("clubJob")) {
      const playerTypes = getPlayerType(this.data["clubJob"]);
      return playerTypes === null || (playerTypes !== null && playerTypes.find(pt => pt > 0) !== null)
    } else {
      return this.checkNotEmpty("staffCa") || this.data["person_type"] === 2 || this.data["person_type"] === 3;
    }
  }

  private getBasicInfo() {
    let basicInfo = {};
    basicInfo["name"] = this.data["common_name"];
    basicInfo["nameEng"] =
      this.data["first_name"] + " " + this.data["last_name"];
    if (this.checkNotEmpty("dob")) basicInfo["dob"] = this.data["dob"];
    basicInfo["nationality"] = getNationality(
      parseInt(this.data["nationality"])
    );
    basicInfo["isPlayer"] = this.isPlayer();
    basicInfo["isNonPlayer"] = this.isNonPlayer();
    basicInfo["file"] = this.datafileType;

    return basicInfo;
  }

  private getClubInfo() {
    if (this.checkNotEmpty("club")) {
      const playerTypes = getPlayerType(
        this.data["clubJob"],
        this.isPlayer(),
        this.isNonPlayer()
      );
      if (playerTypes) {
        let clubInfo = {};
        clubInfo["id"] = parseInt(this.data["club"]);
        clubInfo["dateJoined"] = this.data["clubDateJoined"]
          ? this.data["clubDateJoined"]
          : null;
        clubInfo["dateRenew"] = this.data["clubDateRenewed"]
          ? this.data["clubDateRenewed"]
          : null;
        clubInfo["job"] = playerTypes;
        if (this.checkNotEmpty("clubSquadNumber")) {
          clubInfo["squadNumber"] = parseInt(this.data["clubSquadNumber"]);
        }
        return clubInfo;
      } else {
        return null;
      }
    }
    return null;
  }

  private getLoanInfo() {
    if (this.checkNotEmpty("loanClub")) {
      let loanInfo = {};
      loanInfo["id"] = parseInt(this.data["loanClub"]);
      loanInfo["dateStart"] = this.data["loanDateStart"]
        ? this.data["loanDateStart"]
        : null;
      loanInfo["dateEnd"] = this.data["loanDateEnd"]
        ? this.data["loanDateEnd"]
        : null;
      if (this.checkNotEmpty("loanSquadNumber")) {
        loanInfo["squadNumber"] = parseInt(this.data["loanSquadNumber"]);
      }
      return loanInfo;
    }
    return null;
  }

  private getPersonalData() {
    let personalData = {};
    personalData["adaptability"] = this.formatNumber(this.data["adaptability"]);
    personalData["ambition"] = this.formatNumber(this.data["ambition"]);
    personalData["controversy"] = this.formatNumber(this.data["controversy"]);
    personalData["loyalty"] = this.formatNumber(this.data["loyalty"]);
    personalData["perssure"] = this.formatNumber(this.data["pressure"]);
    personalData["professionalism"] = this.formatNumber(
      this.data["professionalism"]
    );
    personalData["sportsmanship"] = this.formatNumber(
      this.data["sportsmanship"]
    );
    personalData["temperament"] = this.formatNumber(this.data["temperament"]);
    removeEmpty(personalData);
    return Object.keys(personalData).length > 0 ? personalData : null;
  }

  private getPlayerGeneralData() {
    let general = {};
    let ca = this.formatNumber(this.data["ca"]);
    let pa = this.formatNumber(this.data["pa"]);
    general["ca"] = ca ? ca : 0;
    general["pa"] = pa ? pa : 0;
    general["currentReputation"] = this.formatNumber(
      this.data["currentReputation"]
    );
    general["homeReputation"] = this.formatNumber(this.data["homeReputation"]);
    general["worldReputation"] = this.formatNumber(
      this.data["worldReputation"]
    );
    general["height"] = this.formatNumber(this.data["height"]);
    general["weight"] = this.formatNumber(this.data["weight"]);
    general["leftFoot"] = this.formatNumber(this.data["leftFoot"]);
    general["rightFoot"] = this.formatNumber(this.data["rightFoot"]);
    removeEmpty(general);
    return Object.keys(general).length > 0 ? general : null;
  }

  private getPlayerPositionsData() {
    let positions = {};
    positions["goalkeeper"] = this.formatNumber(this.data["goalkeeper"]);
    positions["defenderLeft"] = this.formatNumber(this.data["defenderLeft"]);
    positions["defenderCentral"] = this.formatNumber(
      this.data["defenderCentral"]
    );
    positions["defenderRight"] = this.formatNumber(this.data["defenderRight"]);
    positions["defensiveMidfielder"] = this.formatNumber(
      this.data["defensiveMidfielder"]
    );
    positions["wingBackLeft"] = this.formatNumber(this.data["wingBackLeft"]);
    positions["wingBackRight"] = this.formatNumber(this.data["wingBackRight"]);
    positions["midfielderLeft"] = this.formatNumber(
      this.data["midfielderLeft"]
    );
    positions["midfielderCentral"] = this.formatNumber(
      this.data["midfielderCentral"]
    );
    positions["midfielderRight"] = this.formatNumber(
      this.data["midfielderRight"]
    );
    positions["attackingMidfielderLeft"] = this.formatNumber(
      this.data["attackingMidfielderLeft"]
    );
    positions["attackingMidfielderCentral"] = this.formatNumber(
      this.data["attackingMidfielderCentral"]
    );
    positions["attackingMidfielderRight"] = this.formatNumber(
      this.data["attackingMidfielderRight"]
    );
    positions["striker"] = this.formatNumber(this.data["striker"]);
    removeEmpty(positions);
    return Object.keys(positions).length > 0 ? positions : null;
  }

  private getPlayerMentalData() {
    let mental = {};
    mental["aggression"] = this.formatNumber(this.data["aggression"]);
    mental["anticipation"] = this.formatNumber(this.data["anticipation"]);
    mental["bravery"] = this.formatNumber(this.data["bravery"]);
    mental["composure"] = this.formatNumber(this.data["composure"]);
    mental["concentration"] = this.formatNumber(this.data["concentration"]);
    mental["consistency"] = this.formatNumber(this.data["consistency"]);
    mental["decisions"] = this.formatNumber(this.data["decisions"]);
    mental["determination"] = this.formatNumber(this.data["determination"]);
    mental["dirtiness"] = this.formatNumber(this.data["dirtiness"]);
    mental["flair"] = this.formatNumber(this.data["flair"]);
    mental["importantMatches"] = this.formatNumber(
      this.data["importantMatches"]
    );
    mental["leadership"] = this.formatNumber(this.data["leadership"]);
    mental["movement"] = this.formatNumber(this.data["movement"]);
    mental["positioning"] = this.formatNumber(this.data["positioning"]);
    mental["teamWork"] = this.formatNumber(this.data["teamWork"]);
    mental["vision"] = this.formatNumber(this.data["vision"]);
    mental["workRate"] = this.formatNumber(this.data["workRate"]);
    removeEmpty(mental);
    return Object.keys(mental).length > 0 ? mental : null;
  }

  private getPlayerPhysicalData() {
    let physical = {};
    physical["acceleration"] = this.formatNumber(this.data["acceleration"]);
    physical["agility"] = this.formatNumber(this.data["agility"]);
    physical["balance"] = this.formatNumber(this.data["balance"]);
    physical["injuryProneness"] = this.formatNumber(
      this.data["injuryProneness"]
    );
    physical["jumpingReach"] = this.formatNumber(this.data["jumpingReach"]);
    physical["naturalFitness"] = this.formatNumber(this.data["naturalFitness"]);
    physical["pace"] = this.formatNumber(this.data["pace"]);
    physical["stamina"] = this.formatNumber(this.data["stamina"]);
    physical["strength"] = this.formatNumber(this.data["strength"]);
    removeEmpty(physical);
    return Object.keys(physical).length > 0 ? physical : null;
  }

  private getPlayerTechnicalData() {
    let technical = {};
    technical["corners"] = this.formatNumber(this.data["corners"]);
    technical["crossing"] = this.formatNumber(this.data["crossing"]);
    technical["dribbling"] = this.formatNumber(this.data["dribbling"]);
    technical["finishing"] = this.formatNumber(this.data["finishing"]);
    technical["firstTouch"] = this.formatNumber(this.data["firstTouch"]);
    technical["freeKicks"] = this.formatNumber(this.data["freeKicks"]);
    technical["heading"] = this.formatNumber(this.data["heading"]);
    technical["longShots"] = this.formatNumber(this.data["longShots"]);
    technical["longThrows"] = this.formatNumber(this.data["longThrows"]);
    technical["marking"] = this.formatNumber(this.data["marking"]);
    technical["passing"] = this.formatNumber(this.data["passing"]);
    technical["penaltyTaking"] = this.formatNumber(this.data["penaltyTaking"]);
    technical["tackling"] = this.formatNumber(this.data["tackling"]);
    technical["technique"] = this.formatNumber(this.data["technique"]);
    technical["versatility"] = this.formatNumber(this.data["versatility"]);
    removeEmpty(technical);
    return Object.keys(technical).length > 0 ? technical : null;
  }

  private getPlayerGoalkeepingData() {
    let goalkeeping = {};
    goalkeeping["aerialAbility"] = this.formatNumber(
      this.data["aerialAbility"]
    );
    goalkeeping["commandOfArea"] = this.formatNumber(
      this.data["commandOfArea"]
    );
    goalkeeping["communication"] = this.formatNumber(
      this.data["communication"]
    );
    goalkeeping["eccentricity"] = this.formatNumber(this.data["eccentricity"]);
    goalkeeping["handling"] = this.formatNumber(this.data["handling"]);
    goalkeeping["kicking"] = this.formatNumber(this.data["kicking"]);
    goalkeeping["oneOnOnes"] = this.formatNumber(this.data["oneOnOnes"]);
    goalkeeping["reflexes"] = this.formatNumber(this.data["reflexes"]);
    goalkeeping["rushingOut"] = this.formatNumber(this.data["rushingOut"]);
    goalkeeping["tendencyToPunch"] = this.formatNumber(
      this.data["tendencyToPunch"]
    );
    goalkeeping["throwing"] = this.formatNumber(this.data["throwing"]);
    removeEmpty(goalkeeping);
    return Object.keys(goalkeeping).length > 0 ? goalkeeping : null;
  }

  private getPlayerData() {
    let playerData = {};
    playerData["general"] = this.getPlayerGeneralData();

    let positionsData = this.getPlayerPositionsData();
    if (positionsData) playerData["positions"] = positionsData;

    let mentalData = this.getPlayerMentalData();
    if (mentalData) playerData["mental"] = mentalData;

    let physicalData = this.getPlayerPhysicalData();
    if (physicalData) playerData["physical"] = physicalData;

    let technicalData = this.getPlayerTechnicalData();
    if (technicalData) playerData["technical"] = technicalData;

    let goalkeepingData = this.getPlayerGoalkeepingData();
    if (goalkeepingData) playerData["goalkeeping"] = goalkeepingData;
    removeEmpty(playerData);
    return Object.keys(playerData).length > 0 ? playerData : null;
  }

  private getNonPlayerData() {
    let nonPlayerData = {};
    nonPlayerData["ca"] = this.formatNumber(this.data["staffCa"]);
    nonPlayerData["pa"] = this.formatNumber(this.data["staffPa"]);
    nonPlayerData["currentReputation"] = this.formatNumber(
      this.data["staffCurrentReputation"]
    );
    nonPlayerData["homeReputation"] = this.formatNumber(
      this.data["staffHomeReputation"]
    );
    nonPlayerData["worldReputation"] = this.formatNumber(
      this.data["staffWorldReputation"]
    );

    removeEmpty(nonPlayerData);
    return Object.keys(nonPlayerData).length > 0 ? nonPlayerData : null;
  }
}
