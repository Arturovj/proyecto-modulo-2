const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = require('../models/user.model')

passport.serializeUser((user, next) => {
  console.log(user, 'seria')
    next(null, user._id)
})

passport.deserializeUser((id, next) => {
  console.log(id, 'deserial')
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