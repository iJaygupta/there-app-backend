const Status = require('../../models/status');
const statusCodes = require("../../common/userStatus");


exports.status = function (utils) {

    return {

        getStatus: (request, response) => {
<<<<<<< HEAD
            
            let email = request.headers.payload.email|| "";
=======

            let email = request.headers.payload.email || "";
>>>>>>> master
            Status.getModel().find({ email: email }).then((data) => {
                utils.sendResponse(response, false, 200, 4022, data);
            })
        },

        getActiveStatus: (request, response) => {
            let email = request.headers.payload.email || ""
            Status.getModel().find({ email: email, is_Active: true }).then((data) => {
                utils.sendResponse(response, false, 200, 4022, data);
            })
        },

        addStatus: (request, response) => {
            let param = {
                status_code: request.body.status_code || "",
                status_message: statusCodes[request.body.status_code].msg,
                email: request.headers.payload.email
            };
            Status.getModel().insertMany(param).then((data) => {
                utils.sendResponse(response, false, 200, 4021);
            })

        },

        updateStatus: (request, response) => {

            console.log("updateStatus");

        },

        deleteStatus: (request, response) => {
            let id = request.params.id;
<<<<<<< HEAD
          console.log(request.params.id);
=======
            console.log(request.params.id);
>>>>>>> master
            console.log("deleteStatus");
            Status.getModel().deleteOne({ _id: id }).then((data) => {
                utils.sendResponse(response, false, 200, 4025, data);
            })
        },

        hideStatus: (request, response) => {
            let param = { is_Active: false };
            Status.getModel().updateOne({}, { $set: param }).then((data) => {
                utils.sendResponse(response, false, 200, 4021);
            })
<<<<<<< HEAD
=======
        },
        addAvailability: (request, response) => {
            let email = request.headers.payload.email || "";
            let param = {
                fromDate: request.body.fromDate,
                toDate: request.body.toDate,
            };
            var query = {};
            query = { $push: { "availability": param } };

            Status.getModel().update({ email: email }, query, { "upsert": true }).then((data) => {
                // utils.sendResponse(response, false, 200, 4027);
                response.send(data)
            }).catch((error) => {
                // utils.sendResponse(response, true, 500, 1000);
                response.send(error);
            })

>>>>>>> master
        }
    }

}
