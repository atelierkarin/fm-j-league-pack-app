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

@NgModule({
  declarations: [DatabaseComponent, DatabaseMainComponent, DatabaseLeagueComponent, DatabaseClubComponent, DatabasePlayerComponent, PositionImageComponent, PlayerDetailStatusComponent, PersonalDataComponent, DiscussAreaMainComponent, CommentFormComponent, DisplayCommentsComponent],
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