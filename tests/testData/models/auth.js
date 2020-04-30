
module.exports = {

    signUp: {
        data: {
            'mobile': '918808974265',
            'password': 'Pass1234'
        }
    },
    appSignUp: {
        data: {
            'mobile': '918808974265',
            'password': 'Pass1234'
        }
    },
    appLogin: {
        data: {
            'mobile': '918808974265',
            'password': 'Pass1234'
        }
    },
    confirmUserAccount: {
        params: {
            'confirmationCode': 'dfjkfgjkjksdfsdfjk'
        }
    },
    confirmationCodeByUserId: {
        params: {
            'userId': 3
        }
    },
    forgotPassword: {
        data: {
            'email': 'jayguptazzz@gmail.com'
        }
    },
    confirmPasswordResetCode: {
        params: {
            'recoveryCode': 'fjhdfhjkuihjsdky'
        }
    },
    resetPassword: {
        data: {
            'newPassword': 'abcdef',
            'recoveryCode': 'fjhdfhjkuihjsdky',
            'userId': 3
        }
    },
    changePassword: {
        data: {
            'newPassword': 'abcdef',
            'userId': 3
        }
    }

};
