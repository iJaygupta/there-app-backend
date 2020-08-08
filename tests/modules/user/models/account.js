


module.exports = function (appUrl, chai, should, assert, models) {
    return [
        {
            description: "Get-User-Account-Details Case-1 Account-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/account')
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('data')
                            res.body.data.should.have.property('is_email_verified')
                            res.body.data.should.have.property('is_phone_verified')
                            res.body.data.should.have.property('role')
                            res.body.data.should.have.property('is_active')
                            res.body.data.should.have.property('_id')
                            res.body.data.should.have.property('email')
                            res.body.data.should.have.property('mobile')
                            res.body.data.should.have.property('registered_on')
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Get-User-Account-Details Case-2 Account-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/account')
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
            description: "Update-User-Account-Details Case-1 Account-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/account')
                    .set('Authorization', process.env.token)
                    .send(models.account.accountDetailUpdate1.data)
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
            description: "Update-User-Account-Details Case-2 Account-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/account')
                    .send(models.account.accountDetailUpdate1.data)
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
            description: "Update-User-Account-Details Case-3 Account-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/account')
                    .set('Authorization', process.env.token)
                    .send(models.account.accountDetailUpdate2.data)
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
            description: "Change-User-Password-Details Case-1 Account-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/change-password')
                    .set('Authorization', process.env.token)
                    .send(models.account.updatePassword1.data)
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
            description: "Change-User-Password-Details Case-2 Account-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/change-password')
                    .send(models.account.updatePassword1.data)
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
            description: "Change-User-Password-Details Case-3 Account-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/change-password')
                    .set('Authorization', process.env.token)
                    .send(models.account.updatePassword2.data)
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
            description: "Change-User-Password-Details Case-4 Account-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/change-password')
                    .set('Authorization', process.env.token)
                    .send(models.account.updatePassword3.data)
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
    ];
};
