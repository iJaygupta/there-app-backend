
const { TEST_USER_MOBILE, TEST_USER_PASSWORD, TEST_USER_NEW_PASSWORD, TEST_USER_EMAIL, TEST_USER_NAME,TEST_USER_WRONG_MOBILE } = process.env

module.exports =
 {
    appConnections1: {
        data: {
            'name' : TEST_USER_NAME,
            'mobile': TEST_USER_MOBILE
        }
    },
    appConnections2: {
        data: {
            'name' : TEST_USER_NAME
        }
    },
    appConnections3: {
        data: {
            'mobile': TEST_USER_WRONG_MOBILE
        }
    },
    appConnections4: {
        data: {
        }
    },
 

};
