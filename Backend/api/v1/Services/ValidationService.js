const AppError = require("utils/appError");
const { unprocessable } = require(`utils/statusCode`).statusCode;

class ValidationService {
  static isRequired(value, key) {
    if (!value || value.toString().trim() == "")
      throw new AppError(`${key} is required`, unprocessable);
    return value;
  }
}

module.exports = ValidationService;
