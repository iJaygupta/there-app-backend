


module.exports = function (appUrl, chai, should, assert, models) {
    return [
        {
            description: "Get-User-Account-Details Account-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/account')
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false, res.body.msg);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        }
        , {
            description: "Add-User-Account-Details Account-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/account')
                    .set('Authorization', process.env.token)
                    .send(models.account.accountDetail.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false, res.body.msg);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        }
        , {
            description: "Update-User-Account-Details Account-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/account')
                    .set('Authorization', process.env.token)
                    .send(models.account.accountDetailUpdate.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false, res.body.msg);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        }
        , {
            description: "Change-User-Password-Details Account-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/change-password')
                    .set('Authorization', process.env.token)
                    .send(models.account.updatePassword.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false, res.body.msg);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        }
    ];
};
