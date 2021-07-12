"use strict";

const logger = require("../utilities/logger");

const errorHandler = (error, req, res, next) => {
  let message = error.message || "Something went wrong. Please try again";
  let statusCode = 500;
  let data;

  switch (error.name) {
    case "UnauthorizedException":
      message = "Invalid or missing JWT token";
      statusCode = 401;
      break;
    case "BadRequestException":
      message = error.message;
      statusCode = 400;
      break;
    case "ValidationException":
      data = error.data;
      statusCode = 400;
      break;
    case "CustomError":
      data = error.data;
      message = "Resource not found";
      statusCode = 404;
      break;
    default:
      break;
  }
  if (statusCode == 500) logger.error(error);
  return res
    .status(statusCode)
    .send({ message: statusCode == 500 ? "Something went wrong. Please try again" : message, data });
};

const wrapAsync = fn => {
  return function (req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
};

module.exports = { errorHandler, wrapAsync };
