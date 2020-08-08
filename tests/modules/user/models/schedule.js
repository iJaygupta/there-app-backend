


module.exports = function (appUrl, chai, should, assert, models) {
    return [
        {
            description: "Get-User-Schedule Case-1 Schedule-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/schedule')
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
        },
        {
            description: "Get-User-Schedule Case-2 Schedule-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/schedule')
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
            description: "Add-User-Schedule Case-1 Schedule-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/schedule')
                    .set('Authorization', process.env.token)
                    .send(models.schedule.addSchedule1.data)
                    .end(function (err, res) {
                        try {
                            //conosle.log("+ ", res.body, " +");
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);

                            done();
                        } catch (error) {
                            done
                        }
                    });
            }
        },
        {
            description: "Add-User-Schedule Case-2 Schedule-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/schedule')
                    .set('Authorization', process.env.token)
                    .send(models.schedule.addSchedule2.data)
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
            description: "Add-User-Schedule Case-3 Schedule-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/schedule')
                    .send(models.schedule.addSchedule2.data)
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
            description: "Update-Schedule Case-1 Schedule-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/schedule/5f0a0332042a7028fce89a57')
                    .set('Authorization', process.env.token)
                    .send(models.schedule.scheduleUpdate1.data)
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
            description: "Update-Schedule Case-2 Schedule-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/schedule/5f0a0332042a7028fce89a57')
                    .set('Authorization', process.env.token)
                    .send(models.schedule.scheduleUpdate2.data)
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
            description: "Update-Schedule Case-3 Schedule-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/schedule/5f0a0332042a7028fce89a57')
                    .send(models.schedule.scheduleUpdate1.data)
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
            description: "Delete-Schedule Case-1 Schedule-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .delete('user/schedule/5f0a059e042a7028fce89a5c')
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
        },
        {
            description: "Delete-Schedule Case-2 Schedule-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .delete('user/schedule/5f0a059e042a7028fce89a5c')
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
        }
    ];
};
