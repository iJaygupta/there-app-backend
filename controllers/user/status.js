const Status = require('../../models/status');
const statusCodes = require("../../common/userStatus");


exports.status = function (utils) {

    return {

        getStatus: (request, response) => {
            
            let email = request.headers.payload.email|| "";
            Status.getModel().find({ email: email }).then((data) => {
                utils.sendResponse(response, false, 200, 4022, data);
            })
        },

        getActiveStatus: (request, response) => {
            let email = request.body.email || ""
            Status.getModel().find({ email: email, is_Active: true }).then((data) => {
                utils.sendResponse(response, false, 200, 4022, data);
            })
        },

        addStatus: (request, response) => {
            let param = {
                status_code: request.body.status_code || "",
                status_message: statusCodes[request.body.status_code].msg,
                email: request.body.email
            };
            Status.getModel().insertMany(param).then((data) => {
                utils.sendResponse(response, false, 200, 4021);
            })

        },

        updateStatus: (request, response) => {

            console.log("updateStatus");

        },

        deleteStatus: (request, response) => {

            console.log("deleteStatus");

        },

        hideStatus: (request, response) => {
            let param = { is_Active: false };
            Status.getModel().updateOne({}, { $set: param }).then((data) => {
                utils.sendResponse(response, false, 200, 4021);
            })
        }
    }

}
