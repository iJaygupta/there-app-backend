const { TEST_USER_PASSWORD, TEST_USER_NEW_PASSWORD, TEST_USER_EMAIL, TEST_USER_NAME } = require("../testConfig");

module.exports = {

    accountDetailUpdate1: {
        data: {
            "name": TEST_USER_NAME,
            "email": TEST_USER_EMAIL
        }
    },
    accountDetailUpdate2: {
        data: {
            "wrong": "invalid",
        }
    },
    updatePassword1: {
        data: {
            "oldPassword": TEST_USER_PASSWORD,
            "password": TEST_USER_NEW_PASSWORD
        }
    },
    updatePassword2: {
        data: {
            "oldPassword": TEST_USER_PASSWORD,
        }
    },
    updatePassword3: {
        data: {
            "password": TEST_USER_NEW_PASSWORD
        }
    },
};
