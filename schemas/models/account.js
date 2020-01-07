module.exports={
    
    updateUserPassword: {
        "properties": {
            "password": { "type": ["string"], "minLength": 8  },  
        },
        "required": [ "password" ]
    }
}