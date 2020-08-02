const bcrypt = require("bcryptjs");
const uploader = require("./../../lib/fileHandler");
const auth = require('../../common/auth');


module.exports.account = function (utils, collection) {
    const { User } = collection;

    return {
        getUserAccountDetails: async (request, response) => {
            try {
                let userId = request.headers.payload.id;
                let userData = await User.findById({ _id: userId });
                utils.sendResponse(response, false, 200, 4008, userData);
            }
            catch (error) {
                utils.sendResponse(response, true, 500, 1000);
            }
        },
        updateUserAccountDetails: async (request, response) => {
            try {
                let userId = request.headers.payload.id;
                const options = { new: true };
                await User.updateOne({ _id: userId }, { $set: request.body }, options);
                utils.sendResponse(response, false, 200, 4023);
            }
            catch (error) {
                utils.sendResponse(response, true, 500, 1000);
            }
        },
        updateUserPassword: (request, response) => {
            let userId = request.headers.payload.id;
            let oldPassword = request.body.oldPassword;
            let password = request.body.password;
            let hash = bcrypt.hashSync(password);
            request.body.password = hash;
            User.findOne({ _id: userId }).then((userDetails) => {
                if (!userDetails) {
                    utils.sendResponse(response, false, 200, 1000);
                }
                else {
                    bcrypt.compare(oldPassword, userDetails.password, (error, result) => {
                        if (error) {
                            utils.sendResponse(response, false, 200, 1000);
                        } else if (!result) {
                            utils.sendResponse(response, true, 400, 4035);
                        } else {
                            User.updateOne({ _id: userId }, { $set: { 'password': hash } }).then(data => {
                                if (!data) {
                                    utils.sendResponse(response, false, 200, 1000);
                                }
                                else {
                                    utils.sendResponse(response, false, 200, 4024);
                                }
                            });
                        }
                    })

                }
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000, error);
            });

        },
        addUserProfilePicture: (request, response) => {

            let userId = request.headers.payload.id;
            uploader.uploadFilesLocal("user", "profile", userId, request, response, function (err, data) {
                if (err) {
                    utils.sendResponse(response, true, 500, 1000);
                } else {
                    let localFolderPath = "/home/jaygupta/Desktop/app-sprint/uploads/user/profile/" + userId;
                    uploader.uploadFileOnS3("user/profile/" + userId, localFolderPath, request.files[0].filename).then((data) => {
                        auth.updateProfilePicDetails(request.headers.payload.id, request.files[0].filename, User).then((data) => {
                            utils.sendResponse(response, false, 200, 4026);
                        }).catch((error) => {
                            utils.sendResponse(response, true, 500, 1000);
                        })
                    }).catch((error) => {
                        utils.sendResponse(response, true, 500, 1000);
                    })
                }
            })

        }
    }

}
