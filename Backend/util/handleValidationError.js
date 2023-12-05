const { validationResult } = require("express-validator");
const AppError = require("./appError");
const { statusCode } = require(`./statusCode`);

exports.expressValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let message = "";
    for (error of errors.errors) {
      message = message + " " + error.msg;
    }
    throw new AppError(message, statusCode.notFound);
  }
  next();
};
