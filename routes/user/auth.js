module.exports.auth = function (app, controller, error, auth, middleware) {
     
    app.route("/user/signup").post(function (request, response) {
        try {
            controller.signUp(request, response);
        }
        catch (err) {   
            console.log(err);    
            error(err, response)
        }
    })

    app.route("/user/login").post(function (request, response) {
        try {
            controller.logIn(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/logout").post(auth,function (request, response) {
        try {
            controller.logout(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/forgot-password").get(function (request, response) {
        try {
            controller.forgotPassword(request, response);
        }
        catch (err) {
            error(err, response)
        }
    }) 


    app.route("/user/send-phone-otp/:id").get(function (request, response) {
        try {
            controller.sendPhoneCode(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/send-email-otp/:id").get(function (request, response) {
        try {
            controller.sendEmailCode(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/verify-email-otp").post(function (request, response) {
        try {
            controller.verifyEmailCode(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/verify-mobile-otp").post(function (request, response) {
        try {
            controller.verifyMobileCode(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

}