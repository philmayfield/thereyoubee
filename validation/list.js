const Validator = require("validator");
const isEmpty = require("./empty").isEmpty;
const notEmpty = require("./empty").notEmpty;

module.exports = function validateListInput(data = {}) {
  let errors = {};

  data.name = notEmpty(data.name) ? data.name : "";

  // name validations
  if (Validator.isEmpty(data.name)) {
    errors.listName = "A list name is required";
  }
  if (!Validator.isLength(data.name, { min: 1, max: 40 })) {
    errors.listName =
      "Sorry, the list name cant be more than 40 characters long";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
