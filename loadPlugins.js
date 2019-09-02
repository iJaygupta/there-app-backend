/*
to load all plugins one by one and push all service in an object
*/

const fs = require('fs');

const authenticate = function (request, response, next) {

    if (Math.random()) {
        next();
    } else {
        response.json({ error: true, msg: "Unauthorized Access" });
    }
}

module.exports = function (app, http) {
    fs.readdirSync('./routes').forEach((module) => {
        var moduleDir = './routes/' + module;
        fs.readdirSync(moduleDir).forEach((plugin) => {
            let factory = require('./controllers/' + module + "/" + plugin);
            let route = require(moduleDir + "/" + plugin);
            plugin = plugin.split(".");
            route = route[plugin[0]];
            factory = factory[plugin[0]]();    
            route(app,factory);
            console.log(module+" Service Loaded");
        })
    })

}





