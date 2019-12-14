let User = require('../../models/user');
const bcrypt = require("bcryptjs");
const uploader = require("./../../lib/fileHandler");
const auth = require('../../common/auth');


module.exports.account = function (utils) {

    return {

        getUserAccountDetails: (request, response) => {
            let userId = request.headers.payload.id;
            User.getModel().findById({ _id: userId }).then((userData) => {
                utils.sendResponse(response, false, 200, 4008, userData);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },
        addUserAccountDetails: (request, response) => {
            let userId = request.headers.payload.id;
            User.getModel().updateOne({ _id: userId }, { $set: request.body }).then((success) => {
                utils.sendResponse(response, false, 200, 4023);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })

        },
        updateUserAccountDetails: (request, response) => {
            let userId = request.headers.payload.id;
            User.getModel().updateOne({ _id: userId }, { $set: request.body }).then((success) => {
                utils.sendResponse(response, false, 200, 4023);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },
        updateUserPassword: (request, response) => {

            let email = request.body.email;
            let password = request.body.password;
            let hash = bcrypt.hashSync(password);
            request.body.password = hash;
            User.getModel().findOne({ email: email }).then((userDetails) => {
                if (!userDetails) {
                    utils.sendResponse(response, false, 200, 4002);
                }
                else {
                    User.getModel().updateOne({ 'email': email }, { $set: { 'password': request.body.password } }).then(data => {
                        if (!data) {
                            utils.sendResponse(response, false, 200, 4021);
                        }
                        else {
                            utils.sendResponse(response, false, 200, 4020);
                        }
                    });
                }
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            });

        },
        addUserProfilePicture: (request, response) => {
            uploader.uploadFilesLocal("user", "profile", request, response, function (err, data) {
                if (err) {
                    utils.sendResponse(response, true, 500, 1000);
                } else {
                    auth.updateProfilePicDetails(request.headers.payload.id, request.files[0].filename).then((data) => {
                        utils.sendResponse(response, false, 200, 4026)
                    }).catch((error) => {
                        utils.sendResponse(response, true, 500, 1000);
                    })
                }
            })
        }
    }

}
