

const multer = require("multer");
const fs = require("fs");
const randomstring = require("randomstring");
const path = require("path");

exports.uploadFilesLocal = function (folderName, subFolderName, request, response, callback) {
    try {
        var storage = multer.diskStorage({
            destination: function (request, response, callback) {
                var root = './uploads';
                if (!fs.existsSync(root)) {
                    fs.mkdirSync(root);
                }
                var dir = root + '/' + folderName + '/';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                dir = root + '/' + folderName + '/' + subFolderName + '/';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                callback(null, dir);

            },
            filename: function (req, file, callback) {
                var convFileName = Date.now() + randomstring.generate({ length: 4, charset: 'alphabetic' }) + path.extname(file.originalname);
                callback(null, convFileName);
            },
            limits: "limit"
        });

        var upload = multer({
            storage: storage
        }).any();

        upload(request, response, callback);
    } catch (error) {
        console.log("from multer", error);

    }

}