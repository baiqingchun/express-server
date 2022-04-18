function HttpError (code, error) {
  // this.name = "Error";
  this.code = code;
  this.message = error.message;
  Error.call(this, error.message);
  Error.captureStackTrace(this, this.constructor);
  // this.status = code;
  // this.inner = error;
}

HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;

module.exports = HttpError;
