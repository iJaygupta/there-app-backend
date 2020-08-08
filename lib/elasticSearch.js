/*
 * @Description : Common library for hitting elastic search
 * @Author : Jay
 * @Version : 1.0
 */

const elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: process.env.ELASTIC_HOST || "http://localhost:9200",
    log: [{
        type: 'stdio',
        levels: ['error', 'warning'],
        "requestTimeout": 3000
    }]
});

exports.sendRequest = function (indexName, docType, query) {
    return new Promise((resolve, reject) => {
        var queryParams = {
            index: indexName,
            type: docType,
            body: query
        };
        client.search(queryParams, function (error, data) {
            var output = {};
            if (error) {
                output.error = true;
                output.msg = "Unable to process request from elastic. Please try again later..!!";
                output.data = error;
                output.code = error.statusCode;
                reject(output);
            } else {
                output.error = false;
                output.total = data.hits.total.value;
                output.data = data.hits.hits;
                output.data.forEach(function (obj, index) {
                    output.data[index] = obj._source;
                    if (output.data[index].matched_queries != 'undefined') {
                        output.data[index].matched_queries = obj.matched_queries;
                    }
                });
                if (data.aggregations) {
                    output.data = data.aggregations;
                }
            }
            resolve(output);
        });

    })
}

exports.addDocument = function (_id, indexName, docType, data) {
    return new Promise((resolve, reject) => {
        client.index({
            index: indexName,
            id: _id,
            type: docType,
            body: data
        }, function (error, resp, status) {
            let output = {};
            if (error) {
                output.error = true;
                output.msg = "Error : while adding document..!!";
                output.data = error;
                output.code = error.statusCode;
                reject(output);
            }
            else {
                output.error = false;
                output.data = resp;
                output.msg = "Successfully added document..!!";
                resolve(output);
            }
        });
    })
}

exports.updateDocument = function (_id, indexName, docType, data) {
    return new Promise((resolve, reject) => {
        client.update({
            index: indexName,
            id: _id,
            type: docType,
            body: data
        }, function (error, resp, status) {
            let output = {};
            if (error) {
                output.error = true;
                output.msg = "Error : while updating document..!!";
                output.data = error;
                output.code = error.code;
                reject(output);
            }
            else {
                output.error = false;
                output.data = resp;
                output.msg = "Successfully Updated document..!!";
                resolve(output);
            }
        });
    })
}

exports.delete = function (id, indexName, docType) {
    return new Promise((resolve, reject) => {
        client.delete({
            index: indexName,
            id: id,
            type: docType
        }, function (err, resp, status) {
            if (err) return reject(error);
            resolve(resp);
        });
    })
}


