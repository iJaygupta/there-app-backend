var jwt = require('jsonwebtoken');
const utils = require('../common/utils');


exports.generateAuthToken = function (payload, Session) {
    let token_data = {};
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: parseInt(process.env.SECRET_KEY_VALID_TIME) }, function (err, token) {
            if (err) {
                reject(err);
            }
            generateRefreshToken(token, payload.id, Session)
                .then(refreshToken => {
                    token_data['accessToken'] = token;
                    token_data['refreshToken'] = refreshToken;
                    token_data['expiresIn'] = process.env.SECRET_KEY_VALID_TIME;
                    resolve(token_data);
                })
                .catch(error => {
                    reject(err);
                })
        });
    })
}

exports.verifyAuthToken = function (request, response, next) {
    let token = request.headers['authorization'];
    jwt.verify(token, process.env.SECRET_KEY, function (err, data) {
        if (err && err.name === 'TokenExpiredError')
            return response.status(401).send({ error: true, code: 'TokenExpiredError', message: 'The token has been expired.' })

        if (err && err.name != 'TokenExpiredError')
            return response.status(401).send({ error: true, message: 'Unauthorized Access.' })
        request.headers.payload = data;
        next();
    })
}

exports.decodeForgotPasswordToken = function (response, token) {
    return jwt.verify(token, process.env.SECRET_KEY, function (err, data) {
        if (err && err.name === 'TokenExpiredError')
            return utils.sendResponse(response, true, 401, 4036);
        if (err && err.name != 'TokenExpiredError')
            return utils.sendResponse(response, false, 401, 4037);
        return data;
    })
}

function generateRefreshToken(accessToken, userId, Session) {
    return new Promise((resolve, reject) => {
        jwt.sign({ accessToken }, process.env.SECRET_KEY, { expiresIn: parseInt(process.env.SECRET_KEY_VALID_TIME) }, function (err, refreshToken) {
            if (err) {
                return reject(err);
            }
            sessionData = {
                access_token : accessToken,
                refresh_token: refreshToken,
                user_id: userId
            }
            resolve(refreshToken);
            Session.insertMany(sessionData)
        });
    })
}