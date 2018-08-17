import { combineReducers } from "redux";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import currentPlaceReducer from "./currentPlaceReducer";
import errorReducer from "./errorReducer";
import placesReducer from "./placesReducer";
import toastReducer from "./toastReducer";
import currentListReducer from "./currentListReducer";
import listsReducer from "./listsReducer";

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  currentPlace: currentPlaceReducer,
  currentList: currentListReducer,
  errors: errorReducer,
  places: placesReducer,
  lists: listsReducer,
  toast: toastReducer
});
