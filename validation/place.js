const Validator = require("validator");
const isEmpty = require("./empty").isEmpty;
const notEmpty = require("./empty").notEmpty;

module.exports = function validatePlaceInput(data = {}) {
  let errors = {};

  data.address = notEmpty(data.address) ? data.address : "";
  data.place_id = notEmpty(data.place_id) ? data.place_id : "";
  // data.lat = notEmpty(data.lat) ? `${data.lat}` : "";
  // data.lng = notEmpty(data.lng) ? `${data.lng}` : "";

  // address validations
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address is required";
  }
  // place_id validations
  if (Validator.isEmpty(data.place_id)) {
    errors.place_id = "Place ID is required";
  }
  // // lat validations
  // if (Validator.isEmpty(data.lat)) {
  //   errors.lat = "Latitude is required";
  // }
  // // lng validations
  // if (Validator.isEmpty(data.lng)) {
  //   errors.lng = "Longitude is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
