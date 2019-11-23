const Contacts = require('../../models/contacts');


exports.connections = function (utils) {

    return {

        getConnections: (request, response) => {
            let email = request.headers.payload.email || "";
            Contacts.getModel().find({ email: email }).then((data) => {
                utils.sendResponse(response, false, 200, 4028, data);
            })
        },

        getActiveConnections: (request, response) => {
            let email = request.headers.payload.email || ""
            Contacts.getModel().find({ email: email, isAvailable: true }).then((data) => {
                utils.sendResponse(response, false, 200, 4022, data);
            })
        },

        addConnection: (request, response) => {
            let email = request.headers.payload.email || "";
            let param = {
                email: request.body.email,
                mobile: request.body.mobile,
                name: request.body.name
            };
            var query = {};
            query = { $push: { "contacts_list": param } };

            Contacts.getModel().update({ email: email }, query, { "upsert": true }).then((data) => {
                utils.sendResponse(response, false, 200, 4027);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },
        updateConnections: (request, response) => {
            Contacts.getModel().updateOne().then((updated) => {
                console.log(updated);
            }).catch((error) => {
                console.log(error);
            });
        },

        deleteConnection: (request, response) => {
            let email = request.headers.payload.email || "";
            let param = {
                "email": request.params.email
            };
            var query = {};
            query = { $pull: { "contacts_list": param } };

            Contacts.getModel().update({ email: email }, query).then((data) => {
                utils.sendResponse(response, false, 200, 4029);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },

    }

}


