import { SET_CURRENT_PLACE, SAVE_CURRENT_PLACE } from "../actions/actionTypes";
// import { notEmpty } from "../common/empty";

const initialState = {
  address: "",
  suggestion: "",
  place_id: "",
  latLng: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PLACE:
      return {
        ...state,
        ...action.payload
      };

    case SAVE_CURRENT_PLACE:
      return initialState;

    default:
      return state;
  }
};
