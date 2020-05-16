
const { TEST_USER_MOBILE, TEST_USER_PASSWORD, TEST_USER_NEW_PASSWORD, TEST_USER_EMAIL, TEST_USER_NAME } = process.env

module.exports = {

    appSignUp1: {
        data: {
            'mobile': TEST_USER_MOBILE,
            'password': TEST_USER_PASSWORD,
            'email': TEST_USER_EMAIL
        }
    },
    appSignUp2: {
        data: {
            'mobile': TEST_USER_MOBILE,
        }
    },
    appSignUp3: {
        data: {
            'password': TEST_USER_PASSWORD
        }
    },
    appSignUp4: {
        data: {
        }
    },
    appLogin1: {
        data: {
            'mobile': TEST_USER_MOBILE,
            'password': TEST_USER_PASSWORD
        }
    },
    appLogin2: {
        data: {
            'mobile': TEST_USER_MOBILE,
        }
    },
    appLogin3: {
        data: {
            'mobile': TEST_USER_MOBILE,
        }
    },
    appLogin4: {
        data: {
            'mobile': TEST_USER_MOBILE,
        }
    },
    forgotPassword1: {
        data: {
            'email': TEST_USER_EMAIL
        }
    },
    forgotPassword2: {
        data: {
            'email': ""
        }
    },
    forgotPassword3: {
        data: {
        }
    },
};
