import { combineReducers } from "redux";
import authReducer from "./authReducer";
import currentPlaceReducer from "./currentPlaceReducer";

export default combineReducers({
  auth: authReducer,
  currentPlace: currentPlaceReducer
});
