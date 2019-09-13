var jwt = require('jsonwebtoken');


exports.generateAuthToken = function (userDetails) {
    return new Promise((resolve, reject) => {
        let payload = {
            email: userDetails.email,
            mobile: userDetails.mobile
        }
        jwt.sign(payload, process.env.SECRET_KEY, function (err, token) {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    })
}

exports.verifyAuthToken = function (request, response, next) {
    let token = request.headers['authorization'];
    jwt.verify(token, process.env.SECRET_KEY, function (err) {
        if (err && err.name === 'TokenExpiredError')
            return response.status(401).send({ error: true, code: 'TokenExpiredError', message: 'The token has been expired.' })

        if (err && err.name != 'TokenExpiredError')
            return response.status(401).send({ error: true, message: 'Unauthorized Access.' })

        next();
    })
}
