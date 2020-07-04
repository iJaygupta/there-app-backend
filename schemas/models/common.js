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
  
}