module.exports = function (appUrl, chai, should, assert, models) {
    let connectionIds = []
    return [
        {
            description: "Add-Connections Case-1  Connections-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("user/connections")
                    .set('Authorization', process.env.token)
                    .send(models.connections.appConnections1.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 4027);
                            done();
                        }
                        catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Add-Connections Case-2  Connections-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("user/connections")
                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                            done();
                        }
                        catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Get-Connections Case-1  Connections-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get("user/connections")
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            connectionIds.push((res.body.data[0].contact_list[0]._id));
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 4028);
                            res.body.should.have.property('data');
                            done();
                        }
                        catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Get-Connections Case-2  Connections-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get("user/connections")
                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                            done();
                        }
                        catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Get-Block-Connection Case-1  Connections-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get("user/connections/block")
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 4028);
                            done();
                        }
                        catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Get-Block-Connections Case-2  Connections-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get("user/connections/block")
                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                            done();
                        }
                        catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Delete-Connections Case-1  Connections-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .delete(`user/connections?connectionIds=${JSON.stringify(connectionIds)}`)
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 4029);
                            done();
                        }
                        catch (error) {
                            done(error);
                        }
                    });
            }
        },
    ];
};
