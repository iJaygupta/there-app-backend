const modelsPath = "./models/"

module.exports = {
    auth: require(modelsPath + 'auth'),
    account: require(modelsPath + 'account'),
    status : require(modelsPath + 'status'),
    connections: require(modelsPath + 'connections'),
}