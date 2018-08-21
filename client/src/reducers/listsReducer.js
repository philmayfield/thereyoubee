import {
  GET_LISTS,
  SAVE_LIST,
  FLAG_LIST,
  UNFLAG_LIST,
  DELETE_LIST,
  RESET_LISTS
} from "../actions/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case GET_LISTS:
      return action.payload;

    case SAVE_LIST:
      return [...state, action.payload.data];

    case FLAG_LIST:
      return state.map(place => {
        if (place._id === action.payload) {
          place.deleteFlag = true;
        }
        return place;
      });

    case UNFLAG_LIST:
      return state.map(place => {
        if (place._id === action.payload) {
          delete place.deleteFlag;
        }
        return place;
      });

    case DELETE_LIST:
      return state.filter(list => list._id !== action.payload);

    case RESET_LISTS:
      return [];

    default:
      return state;
  }
};
