export default class ValidationException extends Error {
  constructor(data, message = null) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super();

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationException);
    }

    this.name = "ValidationException";
    this.data = data;
    this.message = message || "Validation failed";
  }
}
