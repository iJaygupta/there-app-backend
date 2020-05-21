module.exports = function (appUrl, chai, should, assert, models) {
    return [
        {
            description: "Get Lookup Case-1 Common-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('common/lookup')
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
            description: "Get Lookup Case-2 Common-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('common/lookup?requested_for=contact_details')
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
            description: "Get Lookup Case-3 Common-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('common/lookup?requested_for=status_messages')
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
            description: "Get Lookup Case-4 Common-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('common/lookup?requested_for=common_questions')
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
            description: "Get Lookup Case-5 Common-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .get('common/lookup?requested_for=notification_messages')
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