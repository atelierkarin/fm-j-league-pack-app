import { PlayerData } from "./PlayerData.interface";

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
      return p.basicInfo.name === alias1 || (p.basicInfo.name === alias1 && ((p.basicInfo.dob && p.basicInfo.dob === alias2) || (p.location.id === parseInt(alias2))))
    }
  });
}

export const getPlayerFromIdName = (players: PlayerData[], id: number, name: string): PlayerData => {
  return players.find(p => p.location.id === id && p.basicInfo.name === name);
}

export const getPlayerPosition = (p: PlayerData): string => {
  if (!p || !p.playerData || !p.playerData.positions) return "";
  if (p.playerData.positions.goalkeeper > 1) return "GK";
  let positionList = [];
  if (p.playerData.positions.defenderCentral >= 15 || p.playerData.positions.defenderLeft >= 15 || p.playerData.positions.defenderRight >= 15) {
    let defenderList = [];
    if (p.playerData.positions.defenderLeft >= 15) defenderList.push("L");
    if (p.playerData.positions.defenderCentral >= 15) defenderList.push("C");
    if (p.playerData.positions.defenderRight >= 15) defenderList.push("R");
    positionList.push("D (" + defenderList.join('') + ")");
  }
  if (p.playerData.positions.wingBackLeft >= 15 || p.playerData.positions.wingBackRight >= 15) {
    let wingList = [];
    if (p.playerData.positions.wingBackLeft >= 15) wingList.push("L");
    if (p.playerData.positions.wingBackRight >= 15) wingList.push("R");
    positionList.push("W (" + wingList.join('') + ")");
  }
  if (p.playerData.positions.defensiveMidfielder >= 15) positionList.push("DM");

  if (p.playerData.positions.midfielderCentral >= 15 || p.playerData.positions.midfielderLeft >= 15 || p.playerData.positions.midfielderRight >= 15) {
    let midfielderList = [];
    if (p.playerData.positions.midfielderLeft >= 15) midfielderList.push("L");
    if (p.playerData.positions.midfielderCentral >= 15) midfielderList.push("C");
    if (p.playerData.positions.midfielderRight >= 15) midfielderList.push("R");
    positionList.push("M (" + midfielderList.join('') + ")");
  }
  if (p.playerData.positions.attackingMidfielderCentral >= 15 || p.playerData.positions.attackingMidfielderLeft >= 15 || p.playerData.positions.attackingMidfielderRight >= 15) {
    let attackingMidfielderList = [];
    if (p.playerData.positions.attackingMidfielderLeft >= 15) attackingMidfielderList.push("L");
    if (p.playerData.positions.attackingMidfielderCentral >= 15) attackingMidfielderList.push("C");
    if (p.playerData.positions.attackingMidfielderRight >= 15) attackingMidfielderList.push("R");
    positionList.push("AM (" + attackingMidfielderList.join('') + ")");
  }
  if (p.playerData.positions.striker >= 15) positionList.push("ST (C)");

  return positionList.join(", ");
}