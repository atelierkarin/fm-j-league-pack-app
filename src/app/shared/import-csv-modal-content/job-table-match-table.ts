import { PlayerType } from "../player-type.enum";

let jobType = {}
jobType[1] = [PlayerType["オーナー／社長"]]
jobType[2] = [PlayerType["オーナー／社長"]]
jobType[4] = [PlayerType["フットボールディレクター"]]
jobType[5] = [PlayerType["監督"]]
jobType[6] = [PlayerType["アシスタントマネージャー"]]
jobType[7] = [PlayerType["コーチ"]]
jobType[8] = [PlayerType["コーチ"]]
jobType[9] = [PlayerType["スカウト"]]
jobType[10] = [PlayerType["トレーナー"]]
jobType[11] = [PlayerType["選手"]]
jobType[12] = [PlayerType["選手"],PlayerType["監督"]]
jobType[13] = [PlayerType["選手"],PlayerType["アシスタントマネージャー"]]
jobType[14] = [PlayerType["選手"],PlayerType["コーチ"]]
jobType[15] = [PlayerType["選手"],PlayerType["コーチ"]]
jobType[21] = [PlayerType["選手"],PlayerType["オーナー／社長"]]
jobType[26] = [PlayerType["GKコーチ"]]
jobType[27] = [PlayerType["選手"],PlayerType["GKコーチ"]]
jobType[30] = [PlayerType["コーチ"]]
jobType[34] = [PlayerType["チーフスカウト"]]
jobType[36] = [PlayerType["ヘッドフィジオ"]]
jobType[38] = [PlayerType["取締役"]]
jobType[55] = [PlayerType["フィジカルコーチ"]]
jobType[100] = [PlayerType["ユース管理責任者"]]
jobType[128] = [PlayerType["選手"],PlayerType["フットボールディレクター"]]
jobType[173] = [PlayerType["スポーツサイエンティスト"]]

export default (id=0, isPlayer=true, isNonPlayer=false) => {
  if (id in jobType) {
    return jobType[id];
  } else if (id == 0) {
    return isPlayer ? jobType[11] : jobType[8];
  }
  return null;
}