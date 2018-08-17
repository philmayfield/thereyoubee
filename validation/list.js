const Validator = require("validator");
const isEmpty = require("./empty").isEmpty;
const notEmpty = require("./empty").notEmpty;

module.exports = function validateListInput(data = {}) {
  let errors = {};

  data.name = notEmpty(data.name) ? data.name : "";

  // name validations
  if (Validator.isEmpty(data.name)) {
    errors.name = "A list name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
