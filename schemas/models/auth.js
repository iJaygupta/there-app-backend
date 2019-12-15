module.exports = {

    signUp: {
        "properties": {
            "name": { "type": ["string"] },
            "email": { "type": ["string"] },
            "password": { "type": ["string"] },
            "mobile": { "type": ["string"] }
        }
    },
    logIn: {
        "properties": {
            "email": { "type": ["string"] },
            "password": { "type": ["string"] },
        }       
    },
    verifyEmailOtp: {
        "properties": {
            "id":{ "type": ["string"] },
            "email": { "type": ["string"] },
            "code": { "type": ["string"] }
        }
    },
    verifyMobileOtp: {
        "properties": {
            "id":{ "type": ["number"] },
            "mobile": { "type": ["number"] },
            "code": { "type": ["number"] }
        }
    }
}


