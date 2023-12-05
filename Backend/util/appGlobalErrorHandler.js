const apiResponse = require("./apiResponse");
const AppError = require("./appError");
const { badRequest, notFound, unprocessable, unauthorized } =
  require(`./statusCode`).statusCode;

module.exports = (err, req, res, next) => {
  if (err.name === "CastError") err = handleCastErrorDB(err);
  if (err.code === 11000) err = handleDuplicateFieldsDB(err);
  if (err.name === "JsonWebTokenError") err = handleJWTError(err);
  if (err.name === "TokenExpiredError") err = handleJWTExpiredError(err);
  if (err.name === "ValidationError") err = handleValidationErrorDB(err);

  apiResponse.errorResponse(err, res);
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, badRequest);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate Field Value: ${value}. Use another value`;
  return new AppError(message, badRequest);
};

const handleValidationErrorDB = (err) => {
  // console.log("error", err.errors);
  const errors = "Object.values.apply(err.errors).map(el=>el.message);";

  // for (const [key, value] of Object.entries(err.errors)) {
  // 	console.log(`${key[properties]}`);
  // }
  const message = err;
  return new AppError(message, unprocessable);
};

const handleJWTExpiredError = (err) =>
  new AppError("Login session has been expired, Login again", unauthorized);

const handleJWTError = (err) => new AppError("Unauthorized", unauthorized);
