
const Ajv = require("ajv");
const ajv = new Ajv();

exports.validateAjv = (schema) => {
    return function (request, response, next) {
        var validate = ajv.compile(schema);
        if (validate(request.body)) {
            next();
        } else {
            utils.ajvErrors(validate.errors, function (errMsg) {
                var output = {
                    error: true,
                    msg: errMsg,
                    code: 9001,
                    data: null
                }
                response.json(output);
            })
        }
    }
}

