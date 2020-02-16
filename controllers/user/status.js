// const Status = require('../../models/status');
const statusCodes = require("../../common/userStatus");


exports.status = function (utils, collection) {
    const {Status } = collection
    return {

        getMyStatus: (request, response) => {
            let user_id = request.headers.payload.id;
            Status.find({
                user_id: user_id
            }).then((data) => {
                if (data[0] && data[0].is_active === true) {
                    utils.sendResponse(response, false, 200, 4022, data);
                } else {
                    utils.sendResponse(response, true, 500, 4031);
                }
            })
        },

        getActiveStatus: (request, response) => {
            let user_id = request.headers.payload.id;
            Status.find({ user_id: user_id, }).then((data) => {
                if (data[0] && data[0].is_active === true) {
                    utils.sendResponse(response, false, 200, 4022, data);
                } else {
                    utils.sendResponse(response, true, 500, 4033);
                }
            })
        },

        addStatus: (request, response) => {
            let param = {
                status_code: request.body.status_code || "",
                status_message: statusCodes[request.body.status_code].msg,
                user_id: request.headers.payload.id
            };
            Status.insertMany(param).then((data) => {
                utils.sendResponse(response, false, 200, 4021);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })

        },

        updateStatus: (request, response) => {

            let user_id = request.headers.payload.id,
                status_code = request.body.status_code || "",
                status_message = statusCodes[request.body.status_code].msg;

            Status.findOneAndUpdate({ "user_id": user_id }, { $set: { "status_code": status_code, "status_message": status_message } }).then((data) => {
                if (data && data.is_active === true) {
                    utils.sendResponse(response, false, 200, 4021, data);
                } else {
                    utils.sendResponse(response, true, 500, 4032);
                }
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },

        deleteStatus: (request, response) => {
            let user_id = request.headers.payload.id;
            let param = { "user_id": user_id };
            ((request.query.force_active == 'true') ? param.is_active = true : !(request.query.force_all == 'true') ? param.is_active = false : "")
            Status.deleteMany(param).then((data) => {
                utils.sendResponse(response, false, 200, 4025, data);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000, error);
            })
        },

        hideStatus: (request, response) => {
            let param = { "is_active": false };
            let user_id = request.headers.payload.id;
            let status_code = request.query.force_all;
            let condition;
            if (status_code !== "true") { condition = { "user_id": user_id, "status_code": status_code }; }
            else { condition = { "user_id": user_id }; }

            Status.updateMany(condition, { $set: param }).then((data) => {
                utils.sendResponse(response, false, 200, 4021, data);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
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

            Status.update({ user_id: user_id }, query, { "upsert": true }).then((data) => {
                utils.sendResponse(response, false, 200, 4030);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })

        },
        getStatus: (request, response) => {

        }
    }

}
