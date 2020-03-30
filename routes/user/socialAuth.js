

exports.socialAuth = function (app, controller, error, auth, middleware) {

    // Required dependencies 

    const passport = require('passport')
        , FacebookStrategy = require('passport-facebook').Strategy
        , cookieParser = require('cookie-parser')
        , session = require('express-session')
        , GoogleStrategy = require('passport-google-oauth20')


    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });


    // Use the Facebook Strategy within Passport.

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_API_KEY,
        clientSecret: process.env.FACEBOOK_API_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        assReqToCallback: true,
        profileFields: ['id', 'emails', 'name']
    },
        function (accessToken, refreshToken, profile, callback) {
            process.nextTick(async function () {
                try {
                    //Check whether the User exists or not using profile.id
                    profile = await controller.checkUserExistAndSignUp(profile._json, "facebook");
                    return callback(null, profile[0]);
                } catch (error) {
                    return callback(true, error);
                }


            });
        }
    ));


    app.set('views', global.appDir + '../../common/');
    app.set('view engine', 'ejs');
    app.use(cookieParser());
    app.use(session({ secret: 'keyboard cat', key: 'sid' }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.route('/account').get(ensureAuthenticated, function (req, res) {

        res.render('account', { user: req.user });
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/user/facebook-login', failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.route("/user/facebook-login").get(function (request, response) {
        try {
            response.render('template', { user: request.user });
        }
        catch (err) {
            error(err, response)
        }
    })


    function ensureAuthenticated(req, res, next) {

        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login')
    }



    // Google Strategy config

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_API_KEY,
        clientSecret: process.env.GOOGLE_API_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
        (accessToken, refreshToken, profile, callback) => {
            process.nextTick(async function () {
                try {
                    //Check whether the User exists or not using email
                    await controller.checkUserExistAndSignUp(profile._json, "google");
                    return callback(null, profile);
                } catch (error) {
                    return callback(true, error);
                }


            });
        }
    ));

    // Middleware to check if the user is authenticated
    function isUserAuthenticated(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.send('You must login!');
        }
    }

    // Routes
    // app.get('/', (req, res) => {
    //     res.render('template', { user: req.user });
    // });

    // passport.authenticate middleware is used here to authenticate the request
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'], // Used to specify the required data
    }));

    // The middleware receives the data from Google and runs the function on Strategy config
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
       
        res.redirect('/user/google-login');

    });

    // Secret route
    app.get('/secret', isUserAuthenticated, (req, res) => {
        res.send('You have reached the secret route');
    });

    // Logout route
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.route("/user/google-login").get(function (request, response) {
        try {
            response.render('template', { user: { name: request.user.displayName } });
        }
        catch (err) {
            error(err, response)
        }
    })
}