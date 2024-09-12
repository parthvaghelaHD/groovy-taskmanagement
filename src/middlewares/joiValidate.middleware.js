import apiResponse from '../helpers/apiResponse.helper.js';

const options = {
    abortEarly: true,
    allowUnknown: true,
    stripUnknown: true,
};

export default (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], options);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map((i) => i.message).join(',');
            return apiResponse(res, { code: 422, status: 400, message });
        }
    };
};
