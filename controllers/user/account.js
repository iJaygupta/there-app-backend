let User = require('../../models/user');


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
                response.send("successfully updated")

            }).catch((error) => {
                console.log("Error while updating user details")
            })



        },

        updateUserPassword: (request, response) => {

            console.log("updateUserPassword");
            console.log('working on update');

        },

        addUserProfilePicture: (request, response) => {

            console.log("updateUserPassword");

        }
    }

}
