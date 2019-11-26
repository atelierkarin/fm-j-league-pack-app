import { User } from '../user.model';
import * as AdminActions from './admin.actions';

export interface State {
  user: User;
  isAdmin: boolean;
  redirectUrl: string;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  isAdmin: false,
  redirectUrl: null,
  authError: null,
  loading: false
};

export function adminReducer(state = initialState, action: AdminActions.AdminActions) {
  switch (action.type) {
    case AdminActions.AUTH_SUCCESS:
      const user = new User(action.payload.email, action.payload.displayName, action.payload.uuid, action.payload.token, action.payload.expirationDate);
      return {
        ...state,
        isAdmin: action.payload.isAdmin,
        authError: null,
        user: user,
        loading: false
      };
    case AdminActions.LOGOUT:
      localStorage.removeItem('userData');
      return {
        ...state,
        user: null
      };
    case AdminActions.AUTH_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    case AdminActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    case AdminActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        redirectUrl: action.payload,
        loading: true
      };
    default:
      return state;
  }
}