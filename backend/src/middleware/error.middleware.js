const ApiError = require('../utils/ApiError');

const errorMiddleware = (err, _req, res, _next) => {
  const normalizedError =
    err instanceof ApiError
      ? err
      : new ApiError(500, err.message || 'Internal server error', []);

  return res.status(normalizedError.statusCode).json({
    statusCode: normalizedError.statusCode,
    message: normalizedError.message,
    errors: normalizedError.errors || [],
    success: false,
  });
};

module.exports = errorMiddleware;
