module.exports={
    
    updateUserPassword: {
        "properties": {
            "password": { "type": ["string"], "minLength": 8  },  
        },
        "required": [ "password" ]
    },
    addUserAccountDetails: {
        "properties": {
            "email": { "type": ["string"] },
            "name": { "type": ["string"] },
            "mobile": { "type": ["string"], "maxLength": 12, "minLength": 12 }

        },
        "required": [ "email", "name" ]
    },
    updateUserAccountDetails: {
        "properties": {
            "role": { "type": ["string"] },
            "is_active": { "type": ["string"] },
            "_id": { "type": ["string"] },
            "name": { "type": ["string"] },
            "email": { "type": ["string"] },
            "mobile": { "type": ["string"], "maxLength": 12, "minLength": 12 }
        },
        "required": [ "name", "mobile", "email" ]
    },
    
}