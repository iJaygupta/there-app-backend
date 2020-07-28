module.exports = {

    createChatroom: {
        "type": ["object"],
        "properties": {
            "name": { "type": ["string"] },
            "filename": { "type": "string" },
            "description": { "type": "string" },
        },
        "required": ["name"],
        "additionalProperties": false
    },
    updateChatroom: {
        "type": ["object"],
        "properties": {
            "name": { "type": ["string"] },
            "filename": { "type": "string" },
            "description": { "type": "string" },
        },
        "additionalProperties": false
    },
    addMessage: {
        "type": ["object"],
        "properties": {
            "name": { "type": ["string"] },
            "content": { "type": ["string"] },
            "is_seen": { "type": ["boolean"] }
        },
        "additionalProperties": false
    },
    updateMessage: {
        "type": ["object"],
        "properties": {
            "name": { "type": ["string"] },
            "content": { "type": ["string"] },
            "is_seen": { "type": ["boolean"] }
        },
        "additionalProperties": false
    },
}
