import * as CalcCaActions from './calc-ca.actions'

export interface State {
  ca: number,

  updateError: string;
  loading: boolean;
}

const initialState: State = {
  ca: 0,

  updateError: null,
  loading: false
};

export function calcCaReducer(
  state = initialState,
  action: CalcCaActions.CalcCaActions
) {
  switch (action.type) {
    case CalcCaActions.CALC_CA:
      return {
        ...state,
        ca: 0,
        updateError: null,
        loading: true
      };
    case CalcCaActions.SET_CA:
      return {
        ...state,
        ca: action.payload,
        updateError: null,
        loading: false
      };
    case CalcCaActions.CALC_SUCCESS:
      return {
        ...state,
        updateError: null,
        loading: false
      };
    case CalcCaActions.CALC_FAIL:
      return {
        ...state,
        updateError: action.payload,
        loading: false
      };
    default:
      return state;
  }
}