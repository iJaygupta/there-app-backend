let User = require('../../models/user');


module.exports.account = function (responseFile) {

    return {

        getUserAccountDetails: (request, response) => {
            let userId = request.params.id;
            User.getModel().findById({ _id: userId }).then((userData) => {
                response.json({ error: false, code: responseFile[4008]['code'], msg: responseFile[4008]['msg'], data: userData });

            });
        },

        addUserAccountDetails: (request, response) => {

            console.log("addUserAccountDetails");

        },

        updateUserAccountDetails: (request, response) => {

            console.log("updateUserAccountDetails");

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
