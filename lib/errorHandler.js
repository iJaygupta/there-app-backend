

module.exports = function (err, response) {
    response.send({ error: true, msg: "Error encountered by Node", data: err.stack });
}