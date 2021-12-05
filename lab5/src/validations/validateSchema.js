function errorResponse(schemaErrors) {
    const errors = schemaErrors.map(error => {
        const { path, message } = error;
        return { path, message };
    });

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
            res.status(400).json(errorResponse(result.error.details));
            return;
        }

        next();
    };
}

module.exports = validateSchema;
