var jwt = require('jsonwebtoken');
const auth = require("../../lib/auth");
const responseFile = require('../../lib/response');



module.exports.socialAuth = function (utils, collection) {
    const { User } = collection;

    return {

        checkUserExistAndSignUp: (socialProfileDetails, socialAccountType) => {
            return new Promise((resolve, reject) => {
                let accountDetails = {};
                if (socialAccountType === 'facebook') {
                    accountDetails = {
                        profile_id: socialProfileDetails.id,
                        email: socialProfileDetails.email,
                        name: (socialProfileDetails && socialProfileDetails.first_name) ? (socialProfileDetails.last_name ? `${socialProfileDetails.first_name} ${socialProfileDetails.last_name}` : socialProfileDetails.first_name) : ""
                    }
                } else {
                    accountDetails = {
                        profile_id: socialProfileDetails.sub,
                        email: socialProfileDetails.email,
                        name: socialProfileDetails.name,
                        profilePic: socialProfileDetails.picture,
                        is_email_verified: socialProfileDetails.email_verified,
                    }

                }


                User.findOne({ "email": accountDetails.email }).then((userDetails) => {
                    if (!userDetails) {
                        User.insertMany(accountDetails).then((result) => {
                            if (result) {
                                resolve(result);
                            }
                        }).catch((error) => {
                            reject(error);
                        })

                    } else if (!userDetails.profile_id) {
                        User.findOneAndUpdate({ "email": accountDetails.email }, { $set: { "is_active": true, profile_id: socialProfileDetails.id } }).then((result) => {
                            if (result) {
                                resolve(result);
                            }
                        }).catch((error) => {
                            reject(error);
                        })
                    } else {
                        resolve(accountDetails);
                    }

                })
            })

        },

        generateSocialToken: (socialProfileDetails) => {
            return new Promise((resolve, reject) => {
                jwt.sign(socialProfileDetails, process.env.SOCIAL_SECRET_KEY, { expiresIn: parseInt(process.env.SOCIAL_SECRET_KEY_VALID_TIME) }, function (err, token) {
                    if (err) {
                        reject(err);
                    }
                    resolve(token);
                });
            })
        },

        authenticateSocialUser: (request, response) => {

            let token = request.body.socialToken;
            jwt.verify(token, process.env.SOCIAL_SECRET_KEY, function (err, data) {
                if (err && err.name === 'TokenExpiredError')
                    return response.status(200).send({ error: true, code: 'TokenExpiredError', message: 'The token has been expired.' })

                if (err && err.name != 'TokenExpiredError')
                    return response.status(200).send({ error: true, message: 'Unauthorized Access.' })
                // request.headers.payload = data;

                if (data && data.email) {
                    User.findOne({ email: data.email }).then(async (userDetails) => {
                        let payload = {
                            id: userDetails._id
                            // email: userDetails.email,
                            // name: userDetails.name,
                            // mobile: userDetails.mobile
                        }
                        let token = await auth.generateAuthToken(payload);
                        let output = {
                            error: false,
                            msg: responseFile[4001]['msg'],
                            code: responseFile[4001]['code'],
                            token: token,
                            data: payload
                        }
                        response.status(200).send(output);
                    }).catch((error) => {
                        utils.sendResponse(response, true, 500, 1000);
                    })
                } else {
                    return response.status(401).send({ error: true, message: 'Unauthorized Access.' })
                }
            })

        }


    }

}
