export default class NetworkException extends Error {
  constructor(message, status, data = null) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super();

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NetworkException);
    }

    this.name = "NetworkException";
    this.message = message;
    this.status = status;
    this.data = data;
  }
}
