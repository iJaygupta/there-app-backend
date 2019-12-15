const Status = require('../../models/status');
const statusCodes = require("../../common/userStatus");


exports.status = function (utils) {

    return {

        getStatus: (request, response) => {
            let user_id = request.headers.payload.id;
            Status.getModel().find({ user_id: user_id }).then((data) => {
                utils.sendResponse(response, false, 200, 4022, data);
            })
        },

        getActiveStatus: (request, response) => {
            let user_id = request.headers.payload.id;
            Status.getModel().find({ user_id: user_id, is_active: true }).then((data) => {
                utils.sendResponse(response, false, 200, 4022, data);
            })
        },

        addStatus: (request, response) => {
            let param = {
                status_code: request.body.status_code || "",
                status_message: statusCodes[request.body.status_code].msg,
                user_id: request.headers.payload.id
            };
            Status.getModel().insertMany(param).then((data) => {
                utils.sendResponse(response, false, 200, 4021);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })

        },

        updateStatus: (request, response) => {
            let param = {
                status_code: request.body.status_code || "",
                status_message: statusCodes[request.body.status_code].msg,
                user_id: request.headers.payload.id
            };
            Status.getModel().updateOne(param).then((data) => {
                utils.sendResponse(response, false, 200, 4021);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },

        deleteStatus: (request, response) => {
            let param = {
                user_id: request.headers.payload.id,
                status_code: request.body.status_code
            };
            Status.getModel().deleteOne(param).then((data) => {
                utils.sendResponse(response, false, 200, 4025);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })

        },

        hideStatus: (request, response) => {
            let param = { is_Active: false };
            Status.getModel().updateOne({}, { $set: param }).then((data) => {
                utils.sendResponse(response, false, 200, 4021);
            })
        },
        addAvailability: (request, response) => {
            let user_id = request.headers.payload.id;
            let param = {
                fromDate: request.body.fromDate,
                toDate: request.body.toDate,
            };
            var query = {};
            query = { $push: { "availability": param } };

            Status.getModel().update({ user_id: user_id }, query, { "upsert": true }).then((data) => {
                utils.sendResponse(response, false, 200, 4030);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })

        }
    }

}
