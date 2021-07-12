"use strict";

class ValidationException extends Error {
  constructor(data) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super();

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationException);
    }

    this.name = "ValidationException";
    this.message = "There are errors with payload";
    this.data = data;
    this.status = 400;
  }
}

module.exports = ValidationException;
