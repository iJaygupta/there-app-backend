const { TEST_USER_PASSWORD, TEST_USER_NEW_PASSWORD, TEST_USER_EMAIL, TEST_USER_NAME } = process.env

module.exports = {

    accountDetail1: {
        data: {
            "email": TEST_USER_EMAIL
        }
    },
    accountDetail2: {
        data: []
    },
    accountDetailUpdate1: {
        data: {
            "name": TEST_USER_NAME
        }
    },
    accountDetailUpdate2: {
        data: []
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
