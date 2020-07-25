

module.exports = function (appUrl, chai, should, assert, models) {
    return [
        {
            description: "Get-ChatRoom Case-1 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/chatroom')
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
            description: "Get-ChatRoom Case-2 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/chatroom')
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
            description: "Add-ChatRoom Case-1 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/chatroom')
                    .set('Authorization', process.env.token)
                    .send(models.chat.addChatRoom1.data)
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
            description: "Add-ChatRoom Case-2 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/chatroom')
                    .set('Authorization', process.env.token)
                    .send(models.chat.addChatRoom2.data)
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
            description: "Add-ChatRoom Case-3 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/chatroom')
                    .send(models.chat.addChatRoom2.data)
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
            description: "Update-ChatRoom Case-1 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/chatroom/5f14deb1ef0eea341cb29899')
                    .set('Authorization', process.env.token)
                    .send(models.chat.chatRoomUpdate1.data)
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
            description: "Update-ChatRoom Case-2 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/chatroom/5f14deb1ef0eea341cb29899')
                    .set('Authorization', process.env.token)
                    .send(models.chat.chatRoomUpdate2.data)
                    .end(function (err, res) {
                        try {
                            res.should.have.status(500);
                            res.body.should.have.property('error', true);
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            }
        },
        {
            description: "Update-ChatRoom Case-3 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put('user/chatroom/5f14deb1ef0eea341cb29899')
                    .send(models.chat.chatRoomUpdate1.data)
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
            description: "Delete-Chat Case-1 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .delete('user/chatroom/5f1ab812626fa6392053118d')
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
            description: "Delete-Chat Case-2 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .delete('user/chatroom/5f1ab812626fa6392053118d')
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
        description: "Get-Msg Case-1 Chat-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .get('user/message')
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
        description: "Get-Msg Case-2 Chat-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .get('user/message')
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
        description: "Add-Msg Case-1 Chat-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .post('user/message')
                .set('Authorization', process.env.token)
                .send(models.chat.addMsg1.data)
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
        description: "Add-Msg Case-2 Chat-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .post('user/message')
                .send(models.chat.addMsg1.data)
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
        description: "Update-Msg Case-1 Chat-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .put('user/message/5f1ab8b944fa4e12acf4479b')
                .set('Authorization', process.env.token)
                .send(models.chat.MsgUpdate1.data)
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
        description: "Update-Msg Case-2 Chat-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .put('user/message/5f1ab8b944fa4e12acf4479b')
                .set('Authorization', process.env.token)
                .send(models.chat. MsgUpdate2.data)
                .end(function (err, res) {
                    try {
                        res.should.have.status(500);
                        res.body.should.have.property('error', true);
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        }
    },
    {
        description: "Update-Msg Case-3 Chat-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .put('user/message/5f1ab8b944fa4e12acf4479b')
                .send(models.chat.MsgUpdate1.data)
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
        description: "Delete-Msg Case-1 Chat-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .delete('user/message/5f1ab8e144fa4e12acf4479c')
                .set('Authorization', process.env.token)
                .end(function (err, res) {
                    try {
                        res.should.have.status(200);
                        res.body.should.have.property('error', false);
                        done();
                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        }
    },
    {
        description: "Delete-Msg Case-2 Chat-User-Controller",
        callback: function (done) {

            chai.request(appUrl)
                .delete('user/message/5f1ab8e144fa4e12acf4479c')
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
}