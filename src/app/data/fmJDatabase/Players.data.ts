import { PlayerData, PlayerDataPosition } from "./PlayerData.interface";

export const getPlayersFromClubId = (players: PlayerData[], clubId: number): PlayerData[] => {
  return players.filter(p => {
    if (p.clubInfo) {
      const isClubInfo = p.clubInfo.id === clubId;
      if (isClubInfo) return true;
    }
    if (p.loanInfo) {
      const isLoanInfo = p.loanInfo.id === clubId;
      if (isLoanInfo) return true;
    }
    return false;
  })
}

export const getPlayerFromAlias = (players: PlayerData[], alias1: string, alias2: string): PlayerData => {
  return players.find(p => {
    if (!alias2) {
      return p.basicInfo.name === alias1
    } else {
      return p.basicInfo.name === alias1 || (p.basicInfo.name === alias1 && ((p.basicInfo.dob && p.basicInfo.dob === alias2) || (p.id === parseInt(alias2))))
    }
  });
}

export const getPlayerFromIdName = (players: PlayerData[], id: number, name: string): PlayerData => {
  return players.find(p => p.id === id && p.basicInfo.name === name);
}

export const getPlayerPosition = (positions: PlayerDataPosition): string => {
  if (!positions) return "";
  if (positions.goalkeeper > 1) return "GK";
  let positionList = [];
  if (positions.defenderCentral >= 15 || positions.defenderLeft >= 15 || positions.defenderRight >= 15) {
    let defenderList = [];
    if (positions.defenderLeft >= 15) defenderList.push("L");
    if (positions.defenderCentral >= 15) defenderList.push("C");
    if (positions.defenderRight >= 15) defenderList.push("R");
    positionList.push("D (" + defenderList.join('') + ")");
  }
  if (positions.wingBackLeft >= 15 || positions.wingBackRight >= 15) {
    let wingList = [];
    if (positions.wingBackLeft >= 15) wingList.push("L");
    if (positions.wingBackRight >= 15) wingList.push("R");
    positionList.push("W (" + wingList.join('') + ")");
  }
  if (positions.defensiveMidfielder >= 15) positionList.push("DM");

  if (positions.midfielderCentral >= 15 || positions.midfielderLeft >= 15 || positions.midfielderRight >= 15) {
    let midfielderList = [];
    if (positions.midfielderLeft >= 15) midfielderList.push("L");
    if (positions.midfielderCentral >= 15) midfielderList.push("C");
    if (positions.midfielderRight >= 15) midfielderList.push("R");
    positionList.push("M (" + midfielderList.join('') + ")");
  }
  if (positions.attackingMidfielderCentral >= 15 || positions.attackingMidfielderLeft >= 15 || positions.attackingMidfielderRight >= 15) {
    let attackingMidfielderList = [];
    if (positions.attackingMidfielderLeft >= 15) attackingMidfielderList.push("L");
    if (positions.attackingMidfielderCentral >= 15) attackingMidfielderList.push("C");
    if (positions.attackingMidfielderRight >= 15) attackingMidfielderList.push("R");
    positionList.push("AM (" + attackingMidfielderList.join('') + ")");
  }
  if (positions.striker >= 15) positionList.push("ST (C)");

  return positionList.join(", ");
}