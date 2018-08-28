import { IS_LOADING, NOT_LOADING } from "../actions/actionTypes";

const defaultState = {
  loadingArr: []
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
        loadingArr: state.loadingArr.filter(item => item !== action.payload)
      };

    default:
      return state;
  }
};
