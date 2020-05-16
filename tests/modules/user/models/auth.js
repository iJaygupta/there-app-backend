


module.exports = function (appUrl, chai, should, assert, models) {
    return [
        {
        description: "SignUp Auth-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .post("user/signup")
                .send(models.auth.appsignUp.data)
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
        description: "SignUp Auth-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .post("user/signup")
                .send(models.auth.appsignUp.data)
                .end(function (err, res) {
                    try {
                        res.should.have.status(400);
                        res.body.should.have.property('error', false, res.body.msg);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        }
    }, 
    {
        description: "SignUp Auth-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .post("user/signup")
                .send(models.auth.appsignUp.data)
                .end(function (err, res) {
                    try {
                        res.should.have.status(400);
                        res.body.should.have.property('error', false, res.body.msg);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        }
    }, 
    {
        description: "SignUp Auth-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .post("user/signup")
                .send(models.auth.appsignUp.data)
                .end(function (err, res) {
                    try {
                        res.should.have.status(400);
                        res.body.should.have.property('error', false, res.body.msg);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        }
    }, 
    {
        description: "Login Auth-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .post("user/login")
                .send(models.auth.appLogin.data)
                .end(function (err, res) {
                    try {
                        res.should.have.status(200);
                        res.body.should.have.property('error', false, res.body.msg);
                        // res.body.should.have.property('token', false, res.body.token);
                        // res.body.should.have.property('data', false, res.body.data);
                        // res.body.should.have.property('id', false, res.body.data.id);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        }
    },
    {
        description: "Login Auth-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .post("user/login")
                .send(models.auth.appLogin.data)
                .end(function (err, res) {
                    try {
                        res.should.have.status(400);
                        res.body.should.have.property('error', false, res.body.msg);
                        // res.body.should.have.property('token', false, res.body.token);
                        // res.body.should.have.property('data', false, res.body.data);
                        // res.body.should.have.property('id', false, res.body.data.id);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        }
    },
    {
        description: "Login Auth-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .post("user/login")
                .send(models.auth.appLogin.data)
                .end(function (err, res) {
                    try {
                        res.should.have.status(400);
                        res.body.should.have.property('error', false, res.body.msg);
                        // res.body.should.have.property('token', false, res.body.token);
                        // res.body.should.have.property('data', false, res.body.data);
                        // res.body.should.have.property('id', false, res.body.data.id);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        }
    },
    {
        description: "Login Auth-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .post("user/login")
                .send(models.auth.appLogin.data)
                .end(function (err, res) {
                    try {
                        res.should.have.status(400);
                        res.body.should.have.property('error', false, res.body.msg);
                        // res.body.should.have.property('token', false, res.body.token);
                        // res.body.should.have.property('data', false, res.body.data);
                        // res.body.should.have.property('id', false, res.body.data.id);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        }
    },
    {
        description: "Send-Email-Otp Auth-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .get('user/send-email-otp')
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
        description: "Send-Email-Otp Auth-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .get('user/send-email-otp')
                .set('Authorization', process.env.token)
                .end(function (err, res) {
                    try {
                        res.should.have.status(400);
                        res.body.should.have.property('error', false, res.body.msg);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        }
    },
    {
        description: "Send-Phone-Otp Auth-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .get('user/send-phone-otp')
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
        description: "Forgot-Password Auth-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .post('user/forgot-password')
                .send(models.auth.forgotPassword.data)
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
        description: "Forgot-Password Auth-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .post('user/forgot-password')
                .send(models.auth.forgotPassword.data)
                .end(function (err, res) {
                    try {
                        res.should.have.status(400);
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
