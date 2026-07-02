const ApiError = require('../utils/ApiError');

const validate = (schema, source = 'body') => (req, _res, next) => {
  if (!schema) return next();

  const { error, value } = schema.validate(req[source], {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return next(
      new ApiError(
        400,
        'Validation failed',
        error.details.map((detail) => ({
          message: detail.message,
          path: detail.path,
        }))
      )
    );
  }

  req[source] = value;
  return next();
};

module.exports = validate;
