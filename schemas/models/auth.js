module.exports = {

    signUp: {
        "type": ["object"],
        "properties": {
            "name": { "type": ["string"] },
            "email": { "type": ["string"] },
            "password": { "type": ["string"], "minLength": 8 },
            "mobile": { "type": ["string"], "maxLength": 12, "minLength": 12 }
        },
        "required": ["mobile", "password"],
        "additionalProperties": false
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
            "mobile": { "type": ["string"], "maxLength": 15, "minLength": 12 }
        },
        "required": ["mobile"]
    },
    forgotPassword: {
        "properties": {
            "email": { "type": ["string"] }
        },
        "required": ["email"]
    }
}


