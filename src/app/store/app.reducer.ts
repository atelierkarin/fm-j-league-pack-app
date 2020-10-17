import { ActionReducerMap } from '@ngrx/store';

import * as fromHistory from '../history/store/history.reducer';
import * as fromPlayerUpdate from '../player-update/store/player-update.reducer';
import * as fromAdmin from '../admin/store/admin.reducer';
import * as fromDatabase from '../database/store/database.reducer';
import * as fromDiscussArea from '../database/database-player/discuss-area/store/discuss-area.reducer';
import * as fromChangelog from '../database/database-player/changelog/store/changelog.reducer';
import * as fromCalcCa from '../calc-ca/store/calc-ca.reducer'
import * as fromCore from '../core/store/core.reducer';

import * as fromShared from '../shared/store/shared.reducer';

export interface AppState {
  history: fromHistory.State;
  admin: fromAdmin.State;
  core: fromCore.State;
  playerUpdate: fromPlayerUpdate.State;
  database: fromDatabase.State;
  discussArea: fromDiscussArea.State;
  changelog: fromChangelog.State;
  calcCa: fromCalcCa.State;
  shared: fromShared.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  history: fromHistory.historyReducer,
  admin: fromAdmin.adminReducer,
  core: fromCore.coreReducer,
  playerUpdate: fromPlayerUpdate.playerUpdateReducer,
  database: fromDatabase.databaseReducer,
  discussArea: fromDiscussArea.discussAreaReducer,
  changelog: fromChangelog.changelogReducer,
  calcCa: fromCalcCa.calcCaReducer,
  shared: fromShared.sharedReducer,
};
