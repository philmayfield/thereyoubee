import { combineReducers } from "redux";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import currentPlaceReducer from "./currentPlaceReducer";
import errorReducer from "./errorReducer";
import placesReducer from "./placesReducer";
import toastReducer from "./toastReducer";

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  currentPlace: currentPlaceReducer,
  errors: errorReducer,
  places: placesReducer,
  toast: toastReducer
});
