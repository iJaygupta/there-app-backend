module.exports = {

    createChatroom: {
        "properties": {
            "name": { "type": ["string"] },
            "filename": { "type": ["string"] },
            "description": { "type": ["string"] },
        },
        "required": ["name"],
        additionalProperties: false,
    },
    updateChatroom: {
        "properties": {
            "name": { "type": ["string"] },
            "filename": { "type": ["string"] },
            "description": { "type": ["string"] },
        },
        additionalProperties: false,
    },
    addMessage: {
        "properties": {
            "name": { "type": ["string"] },
            "content": { "type": ["string"] },
            "is_seen": { "type": ["boolean"] },
        },
        additionalProperties: false,
    },
    updateMessage: {
        "properties": {
            "name": { "type": ["string"] },
            "content": { "type": ["string"] },
            "is_seen": { "type": ["boolean"] },
        },
        additionalProperties: false,
    },
}
