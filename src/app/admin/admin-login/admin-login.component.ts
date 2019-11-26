import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as AdminActions from '../store/admin.actions';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {}

  onLogin() {
    this.store.dispatch(
      new AdminActions.LoginStart("/admin/")
    );
  }
}
