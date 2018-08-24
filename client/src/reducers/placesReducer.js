import {
  GET_PLACES,
  FLAG_PLACE,
  UNFLAG_PLACE,
  SAVE_CURRENT_PLACE,
  DELETE_PLACE,
  RESET_PLACES,
  SAVE_LIST,
  FILTER_PLACES,
  SET_PLACE_LIST
} from "../actions/actionTypes";
import compare from "../common/compare";

export default (state = [], action) => {
  switch (action.type) {
    case GET_PLACES:
      return action.payload;

    case SAVE_CURRENT_PLACE:
      return [...state, action.payload].sort(compare("suggestion"));

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

    case RESET_PLACES:
    case SAVE_LIST: // saving a new list, places has to be empty
      return [];

    case FILTER_PLACES:
      return state.filter(place => place.list_id === action.payload);

    case SET_PLACE_LIST:
      return state.map(place => {
        if (place._id === action.payload.place_id) {
          place.list_id = action.payload.list_id;
        }
        return place;
      });

    default:
      return state;
  }
};
