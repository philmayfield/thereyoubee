import { SET_LIST, RESET_LIST } from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_LIST:
      return action.payload;

    case RESET_LIST:
      return {};

    default:
      return state;
  }
};
