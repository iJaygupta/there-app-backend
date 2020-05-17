module.exports = function (appUrl, chai, should, assert, models) {
    return [
        {
            description: "Get-Connections Case-1  Connection-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get("/user/get-connections")
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 4028);
                            res.body.should.have.property('data');
                        }
                         catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Get-Connections Case-2  Connection-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get("/user/get-connections")
                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                        }
                         catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Get-Active-Connection Case-1  Connection-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get("/user/get-active-connections")
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 4028);
                        
                        }
                         catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Get-Active-Connections Case-2  Connection-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get("/user/get-active-connections")
                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                            
                        
                        }
                         catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Add-Connections Case-1  Connection-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("/user/add-connection")
                    .send(models.connections.appConnections1.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 4027);
                        }
                         catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Add-Connections Case-2  Connection-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("/user/add-connection")
                    .send(models.connections.appConnections2.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(400);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                        }
                         catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Add-Connections Case-3  Connection-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("/user/add-connection")
                    .send(models.connections.appConnections3.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(400);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                        }
                         catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Add-Connections Case-4  Connection-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("/user/add-connection")
                    .send(models.connections.appConnections4.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(400);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                        }
                         catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Delete-Connections Case-1  Connection-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .delete("/user/delete-connection/:id")
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 4029);
                        }
                         catch (error) {
                            done(error);
                        }
                        
                    });
            }
        },
        {
            description: "Delete-Connections Case-2  Connection-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .delete("/user/delete-connection/:id")
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                        }
                         catch (error) {
                            done(error);
                        }
                        
                    });
            }
        },
        
    ];
};
