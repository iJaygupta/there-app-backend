module.exports = function (appUrl, chai, should, assert, models) {
    return [
        {
            description: "Get Lookup Case-1 Common-User-Controller",
            callback: function (done) {

                chai.request(appUrl)
                    .post('user/lookup')
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