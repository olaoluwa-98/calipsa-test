export default class NotAuthorizedException extends Error {
  constructor(message, data = null) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super();

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotAuthorizedException);
    }

    this.name = "NotAuthorizedException";
    this.message = message;
    this.status = 401;
    this.data = data;
  }
}
