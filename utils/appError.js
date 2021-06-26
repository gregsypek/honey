//Error is a build-in Class
class AppError extends Error {
  constructor(message, statusCode) {
    //only one parameter here because built-in Error Class accept this only
    super(message);
    //we don't neet this.message = message it was called by super()
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    //

    // in the stack trace -  will not pollute it
    Error.captureStackTrace(this, this.constructor);
    //mdn
    // Creates a .stack property on targetObject, which when accessed returns a string representing the location in the code at which Error.captureStackTrace() was called.
  }
}

module.exports = AppError;
