module.exports = {

    signUp: {
        "properties": {
            "name": { "type": ["string"] },
            "email": { "type": ["string"] },
            "password": { "type": ["string"], "minLength": 8 },
            "mobile": { "type": ["string"], "maxLength": 12, "minLength": 12 }
        },
        "required": ["mobile", "password"]
    },
    logIn: {
        "properties": {
            "mobile": { "type": ["string"] },
            "password": { "type": ["string"] },
        },
        "required": ["mobile", "password"]
    },
    verifyEmailOtp: {
        "properties": {
            "email": { "type": ["string"] },
            "code": { "type": ["string"] }
        },
        "required": ["email", "code"]
    },
    verifyMobileOtp: {
        "properties": {
            "mobile": { "type": ["string"] },
            "code": { "type": ["string"] }
        },
        "required": ["mobile", "code"]
    },
    register: {
        "properties": {
            "mobile": { "type": ["string"], "maxLength": 12, "minLength": 12 }
        },
        "required": ["mobile"]
    },
}


