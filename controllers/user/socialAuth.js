

module.exports.socialAuth = function (utils, collection) {
    const { User } = collection;

    return {

        checkUserExistAndSignUp: (socialProfileDetails) => {
            return new Promise((resolve, reject) => {
                let accountDetails = {
                    profile_id: socialProfileDetails.id,
                    email: socialProfileDetails.email,
                    name: (socialProfileDetails && socialProfileDetails.first_name) ? (socialProfileDetails.last_name ? `${socialProfileDetails.first_name} ${socialProfileDetails.last_name}` : socialProfileDetails.first_name) : ""
                }

                User.findOne({ "email": accountDetails.email }).then((userDetails) => {
                    if (!userDetails) {
                        User.insertMany(accountDetails).then((result) => {
                            if (result) {
                                resolve(result);
                            }
                        }).catch((error) => {
                            reject(error);
                        })

                    } else {
                        User.findOneAndUpdate({ "email": accountDetails.email }, { $set: { "is_active": true, profile_id: socialProfileDetails.id } }).then((result) => {
                            if (result) {
                                resolve(result);
                            }
                        }).catch((error) => {
                            reject(error);
                        })
                    }

                })
            })

        },


    }

}
