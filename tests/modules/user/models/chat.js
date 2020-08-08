

module.exports = function (appUrl, chai, should, assert, models) {
    let chatRoomId, messageId;
    return [
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
                            res.should.have.status(422);
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
            description: "Get-ChatRoom Case-1 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/chatroom')
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            chatRoomId = res.body.data[0]._id;
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
            description: "Update-ChatRoom Case-1 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put(`user/chatroom/${chatRoomId}`)
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
                    .put(`user/chatroom/${chatRoomId}`)
                    .set('Authorization', process.env.token)
                    .send(models.chat.chatRoomUpdate2.data)
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
            description: "Update-ChatRoom Case-3 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put(`user/chatroom/${chatRoomId}`)
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
            description: "Delete-ChatRoom Case-1 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .delete(`user/chatroom/${chatRoomId}`)
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
            description: "Delete-ChatRoom Case-2 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .delete(`user/chatroom/${chatRoomId}`)
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
            description: "Get-Msg Case-1 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('user/message')
                    .set('Authorization', process.env.token)
                    .end(function (err, res) {
                        try {
                            messageId = res.body.data[0]._id;
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
            description: "Update-Msg Case-1 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put(`user/message/${messageId}`)
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
                    .put(`user/message/${messageId}`)
                    .set('Authorization', process.env.token)
                    .send(models.chat.MsgUpdate2.data)
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
            description: "Update-Msg Case-3 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .put(`user/message/${messageId}`)
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
                    .delete(`user/message/${messageId}`)
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
            description: "Delete-Msg Case-2 Chat-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .delete(`user/message/${messageId}`)
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