module.exports = {

    signUp: {
        "properties": {
            "name": { "type": ["string"] },
            "email": { "type": ["string"] },
            "password": { "type": ["string"], "minLength": 8 },
            "mobile": { "type": ["string"], "maxLength": 12, "minLength": 12 }
        }
    },
    logIn: {
        "properties": {
            "mobile": { "type": ["string"] },
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


