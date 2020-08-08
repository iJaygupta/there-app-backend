
const { TEST_USER_CONNECTION1_NAME, TEST_USER_CONNECTION2_NAME, TEST_USER_CONNECTION1_MOBILE, TEST_USER_CONNECTION2_MOBILE } = require("../testConfig");

module.exports = {
    appConnections1: {
        data: [
            {
                "name": TEST_USER_CONNECTION1_NAME,
                "mobile": TEST_USER_CONNECTION1_MOBILE
            },
            {
                "name": TEST_USER_CONNECTION2_NAME,
                "mobile": TEST_USER_CONNECTION2_MOBILE
            }
        ]

    }
};
