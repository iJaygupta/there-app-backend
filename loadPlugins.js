/*
   To load all plugins one by one and push all service in an object
*/

const fs = require('fs');
const error = require('./lib/errorHandler');
const utils = require('./common/utils');
const auth = require('./lib/auth');
const validator = require('./lib/validator');
const schema = require('./schemas/factory');
const { collection } = require('./db_connect');


const authenticate = function (request, response, next) {
    let token = request.headers['authorization'];
    if (!token)
        return response.status(401).send({ auth: false, message: 'No token provided.' });

    auth.verifyAuthToken(request, response, next);
}

module.exports = function (app, http) {
    fs.readdirSync('./routes').forEach((module) => {
        var moduleDir = './routes/' + module;

        fs.readdirSync(moduleDir).forEach((plugin) => {
            let factory = require('./controllers/' + module + "/" + plugin);
            let route = require(moduleDir + "/" + plugin);
            plugin = plugin.split(".");
            route = route[plugin[0]];
            factory = factory[plugin[0]](utils, collection);
            route(app, factory, error, authenticate, validator, schema);
        })
        console.log(module + " Service Loaded");

    })

}





