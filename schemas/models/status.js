module.exports = {
    
    addStatus: {
        "type": ["object"],
        "properties": {
            "status_code": { "type": ["number"]},
        },
        "required": [ "status_code" ],
        "additionalProperties": false   
    },
    updateStatus: {
        "type": ["object"],
        "properties": {
            "status_code": { "type": ["number"]},
        },
        "required": [ "status_code" ],
        "additionalProperties": false   
    },
    addAvailability: {
        "type": ["object"],
        "properties": {
            "fromDate": { "type": ["string"]},
            "toDate": { "type": ["string"]},
        },
        "required": [ "fromDate" , "toDate" ],
        "additionalProperties": false   
    },
    addVisibility: {
        "type": ["object"],
        "properties": {
            "requested_for": { "type": ["string"]},
            "value": { "type": ["array"]},
        },
        "required": [ "requested_for" , "value" ],
        "additionalProperties": false   
    },
}