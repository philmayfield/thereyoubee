
import axios from 'axios';
import { SET_CURRENT_PLACE } from "./actionTypes";

export const setCurrentPlace = payload => {
  console.log("payload", payload);
  return {
    type: SET_CURRENT_PLACE,
    payload
  };
};
