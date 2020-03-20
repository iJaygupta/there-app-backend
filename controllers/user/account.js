// let User = require('../../models/user');
const bcrypt = require("bcryptjs");
const uploader = require("./../../lib/fileHandler");
const auth = require('../../common/auth');


module.exports.account = function (utils, collection) {
    const { User } = collection

    return {

        getUserAccountDetails: (request, response) => {
            let userId = request.headers.payload.id;
            User.findById({ _id: userId }).then((userData) => {
                utils.sendResponse(response, false, 200, 4008, userData);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },
        addUserAccountDetails: (request, response) => {
            let userId = request.headers.payload.id;
            User.updateOne({ _id: userId }, { $set: request.body }).then((success) => {
                utils.sendResponse(response, false, 200, 4023);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })

        },
        updateUserAccountDetails: (request, response) => {
            let userId = request.headers.payload.id;
            User.updateOne({ _id: userId }, { $set: request.body }).then((success) => {
                utils.sendResponse(response, false, 200, 4023);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },
        updateUserPassword: (request, response) => {

            let userId = request.headers.payload.id;
            let oldPassword = request.body.oldPassword;
            let password = request.body.password;
<<<<<<< HEAD
            password = bcrypt.hashSync(password);
            User.getModel().findOne({ _id: userId }).then((userDetails) => {
=======
            let hash = bcrypt.hashSync(password);
            request.body.password = hash;
            User.findOne({ _id: userId }).then((userDetails) => {
>>>>>>> scale
                if (!userDetails) {
                    utils.sendResponse(response, false, 200, 1000);
                }
                else {
<<<<<<< HEAD
                    bcrypt.compare(oldPassword, userDetails.password,  (error, result) => {
                        if (error) {
                            utils.sendResponse(response, false, 200, 1000);
                        } else if (!result) {
                            utils.sendResponse(response, true, 400, 4035);
                        } else {
                            User.getModel().updateOne({ _id: userId }, { $set: { 'password': password } }).then(data => {
                                if (!data) {
                                    utils.sendResponse(response, false, 200, 1000);
                                }
                                else {
                                    utils.sendResponse(response, false, 200, 4024);
                                }
                            });
=======
                    User.updateOne({_id: userId }, { $set: { 'password': request.body.password } }).then(data => {
                        if (!data) {
                            utils.sendResponse(response, false, 200, 4021);
>>>>>>> scale
                        }
                    })

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
