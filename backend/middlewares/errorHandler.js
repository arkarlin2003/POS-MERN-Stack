const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (err.name === "CastError") {
    statusCode = 404;
    err.message = "Resource Not Found!";
  }
  res.status(statusCode).json({
    message: err.message,
    stack: err.stack,
  });
};

export { errorHandler };
