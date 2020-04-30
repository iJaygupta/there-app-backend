


module.exports = function (appUrl, chai, should, assert, models) {
    return [
        {
            description: "Add-Status  Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/add-status')
                    .set('Authorization', process.env.token)
                    .send(models.status.addStatus.data)
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
        },
        {
            description: "Get-My-Status  Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/get-my-status')
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
        },
        {
            description: "Get-Active-Status  Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/get-active-status')
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
        },
        {
            description: "Add-Availability Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/add-availability')
                    .set('Authorization', process.env.token)
                    .send(models.status.availability.data)
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
        },
        {
            description: "Add-Visibility  Status-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/add-visibility')
                    .set('Authorization', process.env.token)
                    .send(models.status.visibility.data)
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
