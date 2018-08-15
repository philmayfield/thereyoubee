import { SET_CURRENT_PLACE, RESET_CURRENT_PLACE } from "../actions/actionTypes";

const initialState = {
  address: "",
  suggestion: "",
  place_id: "",
  latLng: {
    lat: "",
    lng: ""
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PLACE:
      return {
        ...state,
        ...action.payload
      };

    case RESET_CURRENT_PLACE:
      return initialState;

    default:
      return state;
  }
};
