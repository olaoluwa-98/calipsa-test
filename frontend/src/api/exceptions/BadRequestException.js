export default class BadRequestException extends Error {
  constructor(message) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super();

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestException);
    }

    this.name = "BadRequestException";
    this.message = message;
  }
}
