import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { FormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";

import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { HistoryComponent } from "./history/history.component";
import { HistoryItemComponent } from "./history/history-item/history-item.component";
import { GuideComponent } from "./guide/guide.component";
import { PlayerUpdateComponent } from "./player-update/player-update.component";
import { PlayerUpdateCardComponent } from "./player-update/player-update-card/player-update-card.component";
import { RecordTableComponent } from "./player-update/record-table/record-table.component";
import { DiscussBoardComponent } from './discuss-board/discuss-board.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/auth";
import { environment } from "../environments/environment";

import * as fromApp from "./store/app.reducer";
import { CoreEffects } from "./core/store/core.effects";
import { HistoryEffects } from "./history/store/history.effects";
import { AdminEffects } from "./admin/store/admin.effects";
import { PlayerUpdateEffects } from "./player-update/store/player-update.effects";
import { DatabaseEffects } from "./database/store/database.effects";
import { DiscussAreaEffects } from "./database/database-player/discuss-area/store/discuss-area.effects";
import { ChangelogEffects } from "./database/database-player/changelog/store/changelog.effects";
import { CalcCaEffects } from "./calc-ca/store/calc-ca.effects";


let apiDomain = "http://127.0.0.1:4000/";
if (environment.production) {
  apiDomain = "https://fm-j-league-pack.uc.r.appspot.com";
}

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    GuideComponent,
    HistoryItemComponent,
    PlayerUpdateComponent,
    PlayerUpdateCardComponent,
    RecordTableComponent,
    DiscussBoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    ApolloModule,
    HttpLinkModule,
    NgxDaterangepickerMd.forRoot(),
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      CoreEffects,
      HistoryEffects,
      AdminEffects,
      PlayerUpdateEffects,
      DatabaseEffects,
      DiscussAreaEffects,
      ChangelogEffects,
      CalcCaEffects
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [AngularFirestore, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: apiDomain }),
      cache: new InMemoryCache({
        addTypename: false
      }),
    });
  }
}
