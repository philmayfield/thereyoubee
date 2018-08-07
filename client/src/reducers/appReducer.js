import {
  IS_LOADING,
  NOT_LOADING,
  ACTION_CONFIRM
} from "../actions/actionTypes";

const defaultState = {
  loadingArr: [],
  confirmObject: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        loadingArr: [...state.loadingArr, action.payload]
      };

    case NOT_LOADING:
      return {
        ...state,
        loadingArr: state.loadingArr.filter(item => item !== action.payload),
        confirmObject: {}
      };

    case ACTION_CONFIRM:
      return {
        ...state,
        confirmObject: action.payload
      };

    default:
      return state;
  }
};
