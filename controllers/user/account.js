let User = require('../../models/user');
const bcrypt = require("bcryptjs");


module.exports.account = function (utils) {

    return {

        getUserAccountDetails: (request, response) => {
            let userId = request.params.id;
            User.getModel().findById({ _id: userId }).then((userData) => {
                utils.sendResponse(response, false, 200, 4008, userData);
            });
        },
        addUserAccountDetails: (request, response) => {

            console.log("addUserAccountDetails");

        },

        updateUserAccountDetails: (request, response) => {

            let userId = request.params.id;
            User.getModel().updateOne({ _id: userId }, { $set: request.body }).then((success) => {
                utils.sendResponse(response, false, 200, 4023);

            }).catch((error) => {
                console.log("Error while updating user details")
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

            console.log("updateUserPassword");

        }
    }

}
