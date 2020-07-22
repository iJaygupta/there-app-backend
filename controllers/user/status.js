const statusCodes = require("../../common/userStatus");
const scheduler = require('../../lib/scheduler');
const fcm = require('../../lib/fcm');
const elasticHandler = require("../../lib/elasticSearch");
const bodybuilder = require('bodybuilder');



exports.status = function (utils, collection) {

    const { Status, Notification, Common, Activity, User } = collection
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
            Activity.find({ user_id: user_id, }, { is_status_active: 1, status_id: 1, status_message: 1 }).then((data) => {

                if (data[0] && data[0].is_status_active === true) {
                    utils.sendResponse(response, false, 200, 4022, data);
                } else {
                    utils.sendResponse(response, true, 500, 4033);
                }
            })
        },

        addStatus: (request, response) => {

            let user_id = request.headers.payload.id;
            let statusData = {
                status_id: request.body.status_code || "",
                status_message: statusCodes[request.body.status_code].msg,
                user_id: user_id,
                is_status_active: true
            };

            var query = {};
            let documentData = {};
            documentData.doc = {};
            documentData.doc.status = {
                status_id: statusData.status_id,
                status_message: statusData.status_message
            };
            elasticHandler.updateDocument(user_id, process.env.ELASTIC_USER_INDEX, process.env.ELASTIC_USER_DOC_TYPE, documentData)
                .then(data => {
                    console.log(data);
                })

            Status.insertMany(statusData).then((data) => {
                if (data.length && data[0]._id) {
                    query = { $push: { "status_list": data[0]._id }, ...statusData };
                    Activity.update({ user_id: user_id }, query, { "upsert": true }).then((data) => {
                        utils.sendResponse(response, false, 200, 4021, data);
                    })
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
            let user_id = request.headers.payload.id;

            Activity.updateOne({ user_id: user_id }, { $set: { is_status_active: false } }, { "upsert": false }).then((data) => {

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

            let documentData = {};
            documentData.doc = {};
            documentData.doc.availability = param;
            elasticHandler.updateDocument(user_id, process.env.ELASTIC_USER_INDEX, process.env.ELASTIC_USER_DOC_TYPE, documentData)
                .then(data => {
                    console.log(data);
                })

            // const sendNotification = function () {
            //     console.log("Sending Notification");
            //     Activity.find({ user_id: user_id }).then((data) => {
            //         if (!data.length) {
            //             Common.find({}).then((data) => {
            //                 if (data && data.length) {
            //                     console.log("Common Data-->>", data);
            //                     let notificationData = {
            //                         content: data.notification_messages[0].msg,
            //                         user_id: user_id
            //                     }
            //                     Notification.insertMany(notificationData).then(data => {
            //                         console.log("Notification recorded", data)
            //                     }).catch((error) => {
            //                         console.log("error while adding data");
            //                     })
            //                 } else {
            //                     console.log("common data ==>>", data);
            //                     let notificationData = {
            //                         content: "Hello !! I am free",
            //                         user_id: user_id
            //                     }
            //                     Notification.insertMany(notificationData).then(data => {
            //                         console.log("Notification recorded", data)
            //                     }).catch(error => {
            //                         console.log("error while adding data");
            //                     })

            //                 }


            //             })

            //         } else {
            //             console.log("Activity Found", data);
            //             var messageContent, receiver;
            //             if (data && data.availability_message) {
            //                 messageContent = data.availability_message;
            //             }
            //             if (data && data.availability_visible_to) {
            //                 receiver = data.availability_visible_to;
            //             }
            //             let notificationData = {
            //                 content: "Hello !! I am free",
            //                 user_id: user_id
            //             }
            //             Notification.insertMany(notificationData).then(data => {
            //                 console.log("Notification recorded", data)
            //             }).catch(error => {
            //                 console.log("error while adding data");
            //             })

            //         }


            //     }).catch(error => {
            //         console.log("break sdkjgfkdsg---------", error)
            //     })

            // }

            Activity.update({ user_id: user_id }, query, { "upsert": true }).then((data) => {
                const availabilityDateTime = request.body.fromDate;
                // scheduler.jobScheduler(availabilityDateTime, sendNotification)
                utils.sendResponse(response, false, 200, 4030);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })

        },
        getStatus: (request, response) => {

            let user_id = request.headers.payload.id;
            let mobile = request.query.mobile;


            var statusQuery = bodybuilder();
            if (mobile) {
                statusQuery = statusQuery.query("match", "mobile", mobile)
            }
            statusQuery = statusQuery.query("match", "status_visible_to", user_id)
            statusQuery = statusQuery.build();

            elasticHandler.sendRequest(process.env.ELASTIC_USER_INDEX, process.env.ELASTIC_USER_DOC_TYPE, statusQuery)
                .then((statusData) => {
                    if (statusData.data.length && statusData.data[0].status) {
                        statusData = [statusData.data[0].status]
                        utils.sendResponse(response, false, 200, 4022, statusData);
                    } else {
                        utils.sendResponse(response, true, 500, 4031);
                    }

                })
                .catch((data) => {
                    response.json(data);
                })

        },
        addVisibility: (request, response) => {

            let user_id = request.headers.payload.id;
            let requested_for = request.body.requested_for;
            let value = request.body.value;

            let documentData = {};
            if (requested_for && value) {
                documentData.doc = {
                    [requested_for]: value
                };
            }

            elasticHandler.updateDocument(user_id, process.env.ELASTIC_USER_INDEX, process.env.ELASTIC_USER_DOC_TYPE, documentData)
                .then(data => {
                    utils.sendResponse(response, false, 200, 4040, data);
                }).catch(error => {
                    utils.sendResponse(response, true, 500, 1000, error);
                })

        }
    }

}
