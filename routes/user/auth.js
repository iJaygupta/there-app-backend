module.exports.auth = function (app, controller, error, auth, middleware, schema) {

    app.route("/user/signup").post(middleware.validateAjv(schema.auth.signUp), function (request, response) {
        try {
            controller.signUp(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/login").post(middleware.validateAjv(schema.auth.logIn), function (request, response) {
        try {
            controller.logIn(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/logout").post(auth, function (request, response) {
        try {
            controller.logout(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/forgot-password").post(middleware.validateAjv(schema.auth.forgotPassword), function (request, response) {
        try {
            controller.forgotPassword(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })


    app.route("/user/send-phone-otp").get(auth, function (request, response) {
        try {
            controller.sendPhoneCode(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/send-email-otp").get(auth, function (request, response) {
        try {
            controller.sendEmailCode(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/verify-email-otp").post(auth, middleware.validateAjv(schema.auth.verifyEmailOtp), function (request, response) {
        try {
            controller.verifyEmailCode(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/verify-mobile-otp").post(auth, middleware.validateAjv(schema.auth.verifyMobileOtp), function (request, response) {
        try {
            controller.verifyMobileCode(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/confirm-forgot-password/:token").get(function (request, response) {
        try {
            controller.confirmForgotPassword(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/api/v2/refresh-token").post(function (request, response) {
        try {
            controller.refreshToken(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })
}