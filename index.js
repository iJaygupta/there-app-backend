require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http").Server(app);
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 8000;

app.use(express.json({limit : '40mb'}));
app.use(bodyParser.json({limit : '40mb'}));


try {
     require('./loadPlugins')(app, http);
} catch (error) {
    console.log("Error in Loading Plugins"+error);
}

http.listen(PORT, function(){
    console.log(`Express server running on port ${PORT}`);
})



