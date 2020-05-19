module.exports = {
    
    addStatus: {
        "properties": {
            "status_code": { "type": ["number"]},
        },
        "required": [ "status_code" ]   
    },
    updateStatus: {
        "properties": {
            "status_code": { "type": ["number"]},
        },
        "required": [ "status_code" ]   
    },
    addAvailability: {
        "properties": {
            "fromDate": { "type": ["string"]},
            "toDate": { "type": ["string"]},
        },
        "required": [ "fromDate" , "toDate" ]   
    },
    
}