


module.exports = function (appUrl, chai, should, assert, models) {
    return [
        {
            description: "SignUp Case-1 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("user/signup")
                    .send(models.auth.appSignUp1.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 4034);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "SignUp Case-2 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("user/signup")
                    .send(models.auth.appSignUp2.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(400);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 9001);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "SignUp Case-3 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("user/signup")
                    .send(models.auth.appSignUp3.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(400);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 9001);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "SignUp Case-4 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("user/signup")
                    .send(models.auth.appSignUp4.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(400);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 9001);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Login Case-1 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("user/login")
                    .send(models.auth.appLogin1.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 4001);
                            res.body.should.have.property('token');
                            res.body.should.have.property('data');
                            res.body.data.should.have.property('id');
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Login Case-2 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("user/login")
                    .send(models.auth.appLogin2.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(400);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 9001);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Login Case-3 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("user/login")
                    .send(models.auth.appLogin3.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(400);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 9001);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Login Case-4 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post("user/login")
                    .send(models.auth.appLogin4.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(400);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 9001);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Send-Email-Otp Case-1 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/send-email-otp')
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 2000);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Send-Email-Otp Case-2 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/send-email-otp')

                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                            
                            done();

                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Send-Phone-Otp Case-1 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/send-phone-otp')
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 4009);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Send-Phone-Otp Case-2 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/send-phone-otp')
                    .end(function (err, res) {
                        try {
                            res.should.have.status(401);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Forgot-Password Case-1 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/forgot-password')
                    .send(models.auth.forgotPassword1.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 2000);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Forgot-Password Case-2 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/forgot-password')
                    .send(models.auth.forgotPassword2.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(200);
                            res.body.should.have.property('error', false);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 4002);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Forgot-Password Case-3 Auth-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/forgot-password')
                    .send(models.auth.forgotPassword3.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(400);
                            res.body.should.have.property('error', true);
                            res.body.should.have.property('msg');
                            res.body.should.have.property('code', 9001);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        }
    ];
};
