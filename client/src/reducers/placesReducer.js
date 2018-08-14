import {
  GET_PLACES,
  FLAG_PLACE,
  UNFLAG_PLACE,
  SAVE_CURRENT_PLACE,
  DELETE_PLACE
  // SET_CURRENT_PLACE
} from "../actions/actionTypes";
// import { notEmpty } from "../common/empty";

export default (state = [], action) => {
  switch (action.type) {
    case GET_PLACES:
      return action.payload;

    case SAVE_CURRENT_PLACE:
      return [...state, action.payload.data];

    case FLAG_PLACE:
      return state.map(place => {
        if (place._id === action.payload) {
          place.deleteFlag = true;
        }
        return place;
      });

    case UNFLAG_PLACE:
      return state.map(place => {
        if (place._id === action.payload) {
          delete place.deleteFlag;
        }
        return place;
      });

    case DELETE_PLACE:
      return state.filter(place => place._id !== action.payload);

    default:
      return state;
  }
};
