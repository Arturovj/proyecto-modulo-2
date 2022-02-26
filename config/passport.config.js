const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = require('../models/user.model')

passport.serializeUser((user, next) => {
    next(null, user._id)
})

passport.deserializeUser((id, next) => {
    User.findById(id)
      .then(user => {
        next(null, user)
      })
    .catch(next)
})

passport.use('local-auth', new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },

    (email,password,next) => {
        User.findOne({ email })
        .then((user) => {
            if (!user) {
              next(null, false, { error: "Email or password are incorrect" })
            } else {
              return user.checkPassword(password)
                .then((match) => {
                  if (!match) {
                    next(null, false, { error: "Email or password are incorrect" })
                  } else {
                    if (user.active) {
                      next(null, user)
                    } else {
                      next(null, false, { error: "Check your email. You have to activate your account" })
                    }
                  }
                })
            }
          })
          .catch(err => next(err))
      }
))

passport.use('google-auth', new GoogleStrategy (
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, next) => {
    const googleID = profile.id;
    const email = profile.emails[0] ? profile.emails[0].value : undefined;
    const name = profile.displayName;

    if (googleID && email){
      User.findOne({
        $or: [
          { googleID },
          { email }
        ]
      })
        .then (user => {
          if (user){
            next(null, user)
          } else {
            return User.create({
              email,
              googleID,
              password: mongoose.Types.ObjectId(),
              name
            })
              .then(createdUser => {
                next(null, createdUser)
              })
          }
        })
        .catch(err => next(err))
    } else {
      next(null, false, { error: 'Error connecting to Google Auth'})
    }
  }
))