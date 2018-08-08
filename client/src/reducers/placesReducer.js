import {
  GET_PLACES,
  SAVE_CURRENT_PLACE
  // SET_CURRENT_PLACE
} from "../actions/actionTypes";
// import { notEmpty } from "../common/empty";

export default (state = [], action) => {
  switch (action.type) {
    case GET_PLACES:
      return action.payload;

    case SAVE_CURRENT_PLACE:
      return [...state, action.payload.data];

    default:
      return state;
  }
};
