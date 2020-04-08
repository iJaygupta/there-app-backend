require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http").Server(app);
const bodyParser = require('body-parser');
const cors = require("cors");


const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: '40mb' }));
app.use(bodyParser.json({ limit: '40mb' }));
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send({
        "error": false,
        "code": 200,
        "msg": "Welcome to There App !!",
    });
});

try {
    require('./loadPlugins')(app, http);
} catch (error) {
    console.log(`Error in Loading Plugins ${error}`);
}

app.all("*", function (req, res) {
    res.status(404).send({
        error: true,
        "code": 404,
        msg: "API Not Found"
    });
});

http.listen(PORT, function () {
    console.log(`Express server running on port ${PORT}`);
})



