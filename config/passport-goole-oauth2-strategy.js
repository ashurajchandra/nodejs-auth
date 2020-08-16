const passport = require("passport");
const env = require("./environment");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");
const User = require("../models/user");

// =======configuring for google authentication =======

//Tell paasport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      //configure with your google ouath api credentials....
      clientID: env.google_clientID,
      clientSecret: env.google_clientSecret,
      callbackURL: env.google_callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in finding user  --> google auth");
        }
        console.log(profile);
        if (user) {
          //if found set this user as req.user
          return done(null, user);
        } else {
          // if not found, create the user and set it as the req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("error in creating user", err);
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
