const Contacts = require('../../models/contacts');
const statusCodes = require("../../common/userStatus");


exports.connections = function (utils) {

    return {

        getConnections: (request, response) => {

            let email = request.headers.payload.email || "";
            Contacts.getModel().find({ email: email }).then((data) => {
                utils.sendResponse(response, false, 200, 4022, data);
            })
        },

        getActiveConnections: (request, response) => {
            let email = request.headers.payload.email || ""
            Contacts.getModel().find({ email: email, is_Active: true }).then((data) => {
                utils.sendResponse(response, false, 200, 4022, data);
            })
        },

        addConnection: (request, response) => {
            let param = {
                email: request.body.email,
                contacts_list: [{
                    email: request.body.email,
                    mobile: request.body.mobile,
                    name: request.body.name

                }
                ]
            };
            Contacts.getModel().insertMany(param).then((data) => {
                utils.sendResponse(response, false, 200, 4021);
            })

        },

        updateStatus: (request, response) => {

            console.log("updateStatus");

        },

        deleteStatus: (request, response) => {
            let id = request.params.id;
            console.log(request.params.id);
            console.log("deleteStatus");
            Contacts.getModel().deleteOne({ _id: id }).then((data) => {
                utils.sendResponse(response, false, 200, 4025, data);
            })
        },

        hideStatus: (request, response) => {
            let param = { is_Active: false };
            Contacts.getModel().updateOne({}, { $set: param }).then((data) => {
                utils.sendResponse(response, false, 200, 4021);
            })
        }
    }

}
