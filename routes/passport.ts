// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
// load the auth variables
var bcrypt = require('bcrypt-nodejs');

//load up data-access-layer
import DTO = require('../dataAccessLayer/DTO/customerDTO');
import userManagementAdaptar = require('../dataAccessLayer/customerDataAccesslayer');
import dalModule = require('../dataAccessLayer/dataAccessLayerResponse');
import userActivityDTO = require('../dataAccessLayer/DTO/userActivityDTO');
import userActivityAdaptar = require('../dataAccessLayer/customerActivityAdaptar');

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (id, done) {
        done(null, id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        userManagementAdaptar.getUserDetailById(id,
            (adaptarSuccessResponse: dalModule.DataAccessLayerResponse<DTO.CustomerDTO>) => {
                done(null, adaptarSuccessResponse.Value);
                //done(queryError, rows[0]);
            },
            (adaptarErrorResponse: dalModule.DataAccessLayerResponse<string>) => {
                console.log(adaptarErrorResponse.ErrorSummary);
                done(adaptarErrorResponse.ErrorSummary(), false);
            });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
            function (req, email, password, done) {
                console.log('A User attempt to Sign up');
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                userManagementAdaptar.findOneUser(email,
                    (adaptarSuccessResponsefindOneUser) => {
                        if (adaptarSuccessResponsefindOneUser.Value) {
                            console.log('A user attempt to sign up with a existing username ' + "at " + new Date(Date.now()));
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                        }
                        var CustomerDTO: DTO.CustomerDTO = req.body;
                        CustomerDTO.password = bcrypt.hashSync(CustomerDTO.password, null, null),
                            userManagementAdaptar.createUser(CustomerDTO,
                                (adaptarSuccessResponseCreateUserId: dalModule.DataAccessLayerResponse<string>) => {
                                    if (adaptarSuccessResponseCreateUserId.IsSuccess()) {
                                        console.log("New User " + CustomerDTO.username + "was created " + "at " + new Date(Date.now()));
                                        userActivityAdaptar.insertUserLogin(
                                            new userActivityDTO.UserLoginDTO('', adaptarSuccessResponseCreateUserId.Value, req.sessionID, true, new Date(Date.now())),
                                            (adaptarSuccessResponseAfterInsert: dalModule.DataAccessLayerResponse<string>) => {
                                                // all is well, return successful user
                                                return done(null, adaptarSuccessResponseCreateUserId.Value);
                                            },
                                            (adaptarErrorResponse: dalModule.DataAccessLayerResponse<string>) => {
                                                console.log("Error  :" + adaptarErrorResponse.ErrorSummary());
                                                return done(null, false, req.flash('loginMessage', "Error in connecting database"));
                                            }
                                        );

                                    }
                                },
                                (adaptarErrorResponse: dalModule.DataAccessLayerResponse<DTO.CustomerDTO>) => {
                                    console.log("Error WHILE INSERTING NEW USER :" + adaptarErrorResponse.ErrorSummary());
                                    return done(null, false, req.flash('signupMessage', "Error in connecting database"));
                                });
                    },
                    (adaptarErrorResponse) => {
                        console.log("Error WHILE FINDING EXITING USER :" + adaptarErrorResponse.ErrorSummary);
                        return done(null, false, req.flash('signupMessage', "Error in connecting database"));
                    });
            }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
            function (req, email, password, done) { // callback with email and password from our form
                console.log('A User attempt to Sign in' + "at " + new Date(Date.now()));
                var CustomerDTO: DTO.CustomerDTO = req.body;
                CustomerDTO.password = bcrypt.hashSync(CustomerDTO.password, null, null),
                    userManagementAdaptar.findOneUser(email,
                        (adaptarSuccessResponse: dalModule.DataAccessLayerResponse<DTO.CustomerDTO>) => {
                            if (adaptarSuccessResponse.IsSuccess()) {
                                // if no user is found, return the message
                                if (!adaptarSuccessResponse.Value) {
                                    console.log('A user attempt to sign in with wrong user name ' + "at " + new Date(Date.now()));
                                    return done(null, false, req.flash('loginMessage', "No user found. ")); // req.flash is the way to set flashdata using connect-flash
                                }

                                // if the user is found but the password is wrong

                                if (adaptarSuccessResponse.Value.password == null) {
                                    console.log('A user attempt to sign in through local login but user is a facebook user ' + "at " + new Date(Date.now()));
                                    return done(null, false, req.flash('loginMessage', 'No user found. '));
                                }


                                if (!bcrypt.compareSync(password, adaptarSuccessResponse.Value.password)) {
                                    console.log('A user attempt to sign in with wrong password ' + "at " + new Date(Date.now()));
                                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                                }

                                userActivityAdaptar.findUserLogin(adaptarSuccessResponse.Value.id,
                                    (adaptarSuccessResponseAfterFindUserLogin: dalModule.DataAccessLayerResponse<userActivityDTO.UserLoginDTO>) => {

                                        if (adaptarSuccessResponseAfterFindUserLogin.Value !== null) {
                                            //if user is alredy loggedIn,then disallow that loggedin
                                            userActivityAdaptar.updateUserLogin(new userActivityDTO.UserLoginDTO('', adaptarSuccessResponseAfterFindUserLogin.Value.user_id, adaptarSuccessResponseAfterFindUserLogin.Value.session_id, false, adaptarSuccessResponseAfterFindUserLogin.Value.login_time),
                                                (adaptarSuccessResponseAfterUpdate: dalModule.DataAccessLayerResponse<string>) => {
                                                    //inser the new loggedin and allowed to login
                                                    userActivityAdaptar.insertUserLogin(
                                                        new userActivityDTO.UserLoginDTO('', adaptarSuccessResponseAfterFindUserLogin.Value.user_id, req.sessionID, true, new Date(Date.now())),
                                                        (adaptarSuccessResponseAfterInsert: dalModule.DataAccessLayerResponse<string>) => {
                                                            // all is well, return successful user
                                                            //return done(null, adaptarSuccessResponseAfterFindUserLogin.Value.user_id, req.flash('loginMessage','Your previous session is not properly logged out or someone has loggedin from your account'));
                                                            return done(null, adaptarSuccessResponseAfterFindUserLogin.Value.user_id, null);

                                                        },
                                                        (adaptarErrorResponse: dalModule.DataAccessLayerResponse<string>) => {
                                                            console.log("Error  :" + adaptarErrorResponse.ErrorSummary());
                                                            return done(null, false, req.flash('loginMessage', "Error in connecting database"));

                                                        }
                                                    );
                                                },
                                                (adaptarErrorResponse: dalModule.DataAccessLayerResponse<string>) => {
                                                    console.log("Error  :" + adaptarErrorResponse.ErrorSummary());
                                                    return done(null, false, req.flash('loginMessage', "Error in connecting database"));

                                                }
                                            );

                                        } else {
                                            userActivityAdaptar.insertUserLogin(
                                                new userActivityDTO.UserLoginDTO('', adaptarSuccessResponse.Value.id, req.sessionID, true, new Date(Date.now())),
                                                (adaptarSuccessResponseAfterInsert: dalModule.DataAccessLayerResponse<string>) => {
                                                    // all is well, return successful user
                                                    return done(null, adaptarSuccessResponse.Value.id, req.flash(' '));
                                                },
                                                (adaptarErrorResponse: dalModule.DataAccessLayerResponse<string>) => {
                                                    console.log("Error  :" + adaptarErrorResponse.ErrorSummary());
                                                    return done(null, false, req.flash('loginMessage', "Error in connecting database"));
                                                }
                                            );

                                        }
                                    },
                                    (adaptarErrorResponse: dalModule.DataAccessLayerResponse<string>) => {
                                        console.log("Error  :" + adaptarErrorResponse.ErrorSummary());
                                        return done(null, false, req.flash('loginMessage', "Error in connecting database"));

                                    }
                                );




                            }
                        },
                        (adaptarErrorResponse: dalModule.DataAccessLayerResponse<DTO.CustomerDTO>) => {
                            console.log("Error WHILE FINDING EXISTING USER :" + adaptarErrorResponse.ErrorSummary());
                            return done(null, false, req.flash('loginMessage', "Error in connecting database"));
                        });
            })
    );

};
