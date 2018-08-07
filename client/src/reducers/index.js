import { combineReducers } from "redux";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import placesReducer from "./placesReducer";
import currentPlaceReducer from "./currentPlaceReducer";

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  errors: errorReducer,
  places: placesReducer,
  currentPlace: currentPlaceReducer
});
