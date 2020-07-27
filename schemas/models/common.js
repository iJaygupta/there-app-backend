module.exports = {
    
    getCountries: {
        "properties": {
            "requested_for": { "type": ["string"]},
            "value": { "type": ["array"]},
        },
        "additionalProperties": false
    },
    addQuery: {
        "properties": {
            "query": { "type": ["string"], },  
        },
        "required": [ "query" ],
        "additionalProperties": false
    },

    contactUs: {
        "properties" : {
            "email": { "type": ["string"]},
            "fullName":{ "type": ["string"] },
            "phoneNumber": { "type": ["string"]},
            "query": { "type": ["string"]}

        },
        "required" : ["email","fullName","phoneNumber","query"],
        "additionalProperties" : false
    },
    teamMembers: {
        "properties" : {
            "name": {"type" : ["string"]},
            "designation": {"type" : ["string"]},
            "phone_number": {"type" :["string"]},
            "image": {"type" : ["string"]}, 
            "bio": {"type" : ["string"]},
            "order" : {"type" : ["number"]},
            "is_active" :{ "type": ["boolean"] }

        },
        "required" : ["name","designation","phone_number","bio", "order","is_active"],
        "additionalProperties" : false
    },

    
  
}