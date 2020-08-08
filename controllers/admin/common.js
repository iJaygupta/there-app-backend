module.exports.common = function (utils, collection) {
    const { Queries, Common, ContactUs, Team } = collection;
    return {
        getQueries: async (request, response) => {
            try {
                let queries = await Queries.find({});
                utils.sendResponse(response, false, 200, 4051, queries);
            }
            catch (error) {
                utils.sendResponse(response, true, 500, 1000);
            }
        },

        getContactUs: async (request, response) => {
            try {
                let contactus = await ContactUs.find({});
                utils.sendResponse(response, false, 200, 4076, contactus);

            }
            catch (error) {
                utils.sendResponse(response, true, 500, 1000);
            }
        },

        addTeamMember: async (request, response) => {
            try {
                let team = new Team({
                    name: request.body.name,
                    designation: request.body.designation,
                    phone_number: request.body.phone_number,
                    image: request.body.image,
                    bio: request.body.bio,
                    order: request.body.order,
                    is_active: request.body.is_active
                })
                team = await team.save();
                utils.sendResponse(response, false, 200, 4077, team);
            }
            catch (error) {
                utils.sendResponse(response, true, 500, 1000);
            }

        },
    }
};
