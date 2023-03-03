const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "SequelizeValidationError") {
    // when invalid/short id is used in URL for product
    const message = `Please input a valid values`;
    err = new ErrorHandler(message, 400);
  }

  //cast error
  if (err.name === "CastError") {
    // when invalid/short id is used in URL for product
    const message = `Resource not found Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  //jwt token expire
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    status: err.statusCode,
  });
};
