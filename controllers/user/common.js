module.exports.common = function(utils, collection) {
  const { Contactfaq, Common } = collection;

  return {
    getQuestionsAddress: (request, response) => {
      const commonDocument = {
        title: "There APP Config Messages",
        status_messages: [
          { status_id: "601", msg: "Available" },
          { status_id: "602", msg: "Busy" },
          { status_id: "603", msg: "Can't Talk Text Only" },
          { status_id: "604", msg: "In a Meeting" },
          { status_id: "605", msg: "In Shopping" },
          { status_id: "606", msg: "In Washroom" },
          { status_id: "607", msg: "In Office" },
          { status_id: "608", msg: "Travelling" },
          { status_id: "609", msg: "With Family" },
          { status_id: "610", msg: "On a Date" },
          { status_id: "611", msg: "Having Meal" }
        ],
        contact_us_message: [
          {
            name: "There",
            address: "Aya Nagar, New Delhi, 110047",
            phone_number: "+011 87756"
          }
        ],
        app_common_questions: [
          {
            question_id: "101",
            question:
              "What type of app is this ? Any reference app link will be helpful"
          },
          { question_id: "102", question: "how can this app helpful" },
          {
            question_id: "103",
            question: "is this app available for ios or anddroid both"
          }
        ],
        notification_messages: [
          {
            notification_id: "601",
            msg: "Hello , I am available to take call now"
          },
          { notification_id: "602", msg: "Busy, Not Available on call now" },
          {
            notification_id: "602",
            msg:
              "Hello Friends , Its my holiday today so all set for Group call"
          },
          { notification_id: "602", msg: "Busy, Can't Talk Text Only" }
        ]
      };
      console.log("before common insert");

      Common.insert(commonDocument)
        .then(result => {
          console.log("insert result", commonDocument);
        })
        .catch(error => {
          console.log("insert error");
        });

      const common_type = request.query.name;
      console.log("contact-us", common_type);

      if (common_type == "contact-us") {
        Common.find({})
          .populate("contact_us_message")
          .exec()
          .then(data => {
            console.log("insert data", data);
            utils.sendResponse(response, false, 200, 4028, data);
          })
          .catch(error => {
            utils.sendResponse(response, true, 500, 1000);
          });
      } else {
        Common.find({})
          .populate("app_common_questions")
          .exec()
          .then(questions => {
            console.log("questions", questions);
            utils.sendResponse(response, false, 200, 4028, questions);
          })
          .catch(error => {
            utils.sendResponse(response, true, 500, 1000);
          });
      }
    }
  };
};
