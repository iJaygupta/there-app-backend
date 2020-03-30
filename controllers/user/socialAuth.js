

module.exports.socialAuth = function (utils, collection) {
    const { User } = collection;

    return {

        checkUserExistAndSignUp: (socialProfileDetails, socialAccountType) => {
            return new Promise((resolve, reject) => {
                let accountDetails = {};
                if (socialAccountType === 'facebook') {
                    accountDetails = {
                        profile_id: socialProfileDetails.id,
                        email: socialProfileDetails.email,
                        name: (socialProfileDetails && socialProfileDetails.first_name) ? (socialProfileDetails.last_name ? `${socialProfileDetails.first_name} ${socialProfileDetails.last_name}` : socialProfileDetails.first_name) : ""
                    }
                } else {
                    accountDetails = {
                        profile_id: socialProfileDetails.sub,
                        email: socialProfileDetails.email,
                        name: socialProfileDetails.name,
                        profilePic: socialProfileDetails.picture,
                        is_email_verified: socialProfileDetails.email_verified,
                    }

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

                    } else if (!userDetails.profile_id) {
                        User.findOneAndUpdate({ "email": accountDetails.email }, { $set: { "is_active": true, profile_id: socialProfileDetails.id } }).then((result) => {
                            if (result) {
                                resolve(result);
                            }
                        }).catch((error) => {
                            reject(error);
                        })
                    } else {
                        resolve(accountDetails);
                    }

                })
            })

        },


    }

}
