import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '../shared/shared.module';

import { DatabaseRoutingModule } from './database-routing.module';

import { DatabaseComponent } from './database.component';
import { DatabaseMainComponent } from './database-main/database-main.component';
import { DatabaseLeagueComponent } from './database-league/database-league.component';
import { DatabaseClubComponent } from './database-club/database-club.component';
import { DatabasePlayerComponent } from './database-player/database-player.component';
import { PositionImageComponent } from './database-player/position-image/position-image.component';
import { PlayerDetailStatusComponent } from './database-player/player-detail-status/player-detail-status.component';
import { PersonalDataComponent } from './database-player/personal-data/personal-data.component';
import { DiscussAreaMainComponent } from './database-player/discuss-area/discuss-area-main/discuss-area-main.component';
import { CommentFormComponent } from './database-player/discuss-area/comment-form/comment-form/comment-form.component';
import { DisplayCommentsComponent } from './database-player/discuss-area/display-comments/display-comments/display-comments.component';
import { ChangelogComponent } from './database-player/changelog/changelog.component';
import { RecordFormatterComponent } from './database-player/changelog/record-formatter/record-formatter.component';
import { DatabaseAllClubsComponent } from './database-main/database-all-clubs/database-all-clubs.component';
import { DatabaseRecentUpdatesComponent } from './database-main/database-recent-updates/database-recent-updates.component';
import { DatabaseMostAccessedComponent } from './database-main/database-most-accessed/database-most-accessed.component';
import { ClubStatusComponent } from './database-league/club-status/club-status.component';
import { StatusBadgeComponent } from './status-badge/status-badge.component';
import { ListStaffComponent } from './database-club/list-staff/list-staff.component';
import { ListPlayersComponent } from './database-club/list-players/list-players.component';
import { DatabaseRecentCommentedComponent } from './database-main/database-recent-commented/database-recent-commented.component';
import { PlayerHistoryComponent } from './database-player/player-history/player-history.component';

@NgModule({
  declarations: [DatabaseComponent, DatabaseMainComponent, DatabaseLeagueComponent, DatabaseClubComponent, DatabasePlayerComponent, PositionImageComponent, PlayerDetailStatusComponent, PersonalDataComponent, DiscussAreaMainComponent, CommentFormComponent, DisplayCommentsComponent, ChangelogComponent, RecordFormatterComponent, DatabaseAllClubsComponent, DatabaseRecentUpdatesComponent, DatabaseMostAccessedComponent, ClubStatusComponent, StatusBadgeComponent, ListStaffComponent, ListPlayersComponent, DatabaseRecentCommentedComponent, PlayerHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forChild([{ path: '', component: DatabaseComponent }]),
    SharedModule,
    DatabaseRoutingModule
  ]
})
export class DatabaseModule {}