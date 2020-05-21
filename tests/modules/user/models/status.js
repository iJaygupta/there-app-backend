


module.exports = function (appUrl, chai, should, assert, models) {
    return [
        {
            description: "Add-Status Case-1 Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/add-status')
                    .set('Authorization', process.env.token)
                    .send(models.status.addStatus.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Add-Status Case-2 Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/add-status')
                    .send(models.status.addStatus.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Get-My-Status case-1  Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/get-my-status')
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('data');
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Get-My-Status Case-2  Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/get-my-status')
                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Get-Active-Status Case-1  Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/get-active-status')
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('data');
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Get-Active-Status Case-2  Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/get-active-status')
                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Add-Availability Case-1 Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/add-availability')
                    .set('Authorization', process.env.token)
                    .send(models.status.availability1.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Add-Availability Case-2 Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/add-availability')
                    .send(models.status.availability1.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Add-Availability Case-3 Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/add-availability')
                    .set('Authorization', process.env.token)
                    .send(models.status.availability2.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(400);
                            res.body.should.have.property('error', true);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Add-Availability Case-4 Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/add-availability')
                    .set('Authorization', process.env.token)
                    .send(models.status.availability3.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(400);
                            res.body.should.have.property('error', true);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Add-Availability Case-5 Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/add-availability')
                    .set('Authorization', process.env.token)
                    .send(models.status.availability4.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(400);
                            res.body.should.have.property('error', true);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Add-Visibility Case-1 Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/add-visibility')
                    .set('Authorization', process.env.token)
                    .send(models.status.visibility.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Add-Visibility Case-2 Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/add-visibility')
                    .send(models.status.visibility.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Delete-Status Case-1 Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .delete('user/delete-status')
                    .set('Authorization', process.env.token)
                    .send(models.status.addStatus.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 4025)
                            res.body.should.have.property('data')
                            res.body.data.should.have.property('n')
                            res.body.data.should.have.property('ok')
                            res.body.data.should.have.property('deletedCount')
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Delete-status Case-2 Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .delete('user/delete-status')
                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Hide-Status Case-1 Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/hide-status')
                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Hide-Status Case-2 Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/hide-status')
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        }
        ];
};
