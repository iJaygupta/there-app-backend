const { TEST_USER_PASSWORD, TEST_USER_NEW_PASSWORD, TEST_USER_EMAIL, TEST_USER_NAME } = process.env

module.exports = {

    accountDetail: {
        data: {
            "email": TEST_USER_EMAIL
        }
    },
    accountDetailUpdate: {
        data: {
            "name": TEST_USER_NAME
        }
    },
    updatePassword: {
        data: {
            "oldPassword": TEST_USER_PASSWORD,
            "password": TEST_USER_NEW_PASSWORD
        }
    },
};
