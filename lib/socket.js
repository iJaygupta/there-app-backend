var randomstring = require("randomstring");
const _ = require('lodash');

exports = function (http, onConnect, onDisConnect, events) {

    this.io = require('socket.io')(http);

    this.io.use((socket, next) => {
        if (!Math.random()) {
            return new Error("unauthorized access");
        } else {
            return next();
        }
    });

    this.io.engine().generateId = (req) => {
        var date = new Date();
        return randomstring.generate({ length: 4, charset: 'numeric' }) + "" + date.getTime();
    }

    this.io.on('connection', function (socket) {

        onConnect(socket);

        socket.on('disconnect', function (reason) {
            onDisConnect(socket, reason);
        });

        _.forIn(events, function (value, key) {
            socket.on(key, function (data) {
                value(socket, data);
            });

        })
    })




}