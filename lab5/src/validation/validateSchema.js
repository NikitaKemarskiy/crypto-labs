const _ = require('lodash');

function errorResponse(schemaErrors) {
  const errors = schemaErrors.map((error) => _.pick(error, ['path', 'message']));

  return {
    status: 'Failed',
    errors
  };
}

function validateSchema(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (result.error) {
      return res
        .status(400)
        .json(errorResponse(result.error.details));
    }

    next();
  };
}

module.exports = validateSchema;
