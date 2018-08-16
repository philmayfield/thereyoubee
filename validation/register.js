const Validator = require("validator");
const isEmpty = require("./empty").isEmpty;
const notEmpty = require("./empty").notEmpty;

module.exports = function validateRegisterInput(data = {}) {
  let errors = {};

  data.username = notEmpty(data.username) ? data.username : "";
  data.password = notEmpty(data.password) ? data.password : "";
  data.password2 = notEmpty(data.password2) ? data.password2 : "";

  // username validations
  if (!Validator.isLength(data.username, { min: 2, max: 20 })) {
    errors.username = "Username must be between 2 and 20 characters long";
  }
  if (!Validator.isAlphanumeric(data.username)) {
    errors.username = "Username can only be alpha-numeric";
  }
  if (!Validator.equals(data.username.split(" ").length.toString(), "1")) {
    errors.username = "Username cant have spaces (duh)";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // password validations
  if (!Validator.isLength(data.password, { min: 5, max: 20 })) {
    errors.password = "Password must be between 5 and 20 characters long";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Uh oh, these passwords dont match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
