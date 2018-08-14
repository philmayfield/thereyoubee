// actions related to the app - confirmation

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  IS_LOADING,
  NOT_LOADING
} from "./actionTypes";

// get errors
export const getErrors = err => {
  return {
    type: GET_ERRORS,
    payload: err
  };
};

// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// app is loading state
export const isLoading = payload => {
  return {
    type: IS_LOADING,
    payload
  };
};

// app is not loading state
export const notLoading = payload => {
  return {
    type: NOT_LOADING,
    payload
  };
};
