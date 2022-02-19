const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user.model');

module.exports.register = (req, res, next) => {
    res.render('auth/register')
  }
  
module.exports.login = (req, res, next) => {
res.render('auth/login')
}

module.exports.doRegister = (req, res, next) => {
    const user = req.body;
  
    // { email: 'Already in use' }
    const renderWithErrors = (errors) => {
      res.render('auth/register', { errors, user })
    }
  
    User.findOne({ email: user.email })
      .then((userFound) => {
        if (userFound) {
          renderWithErrors({ email: 'Email already in use' })
        }  else {
          if (req.file) {
            user.image = req.file.path
          }
          return User.create(user)
            .then((createdUser) => {
/*               mailer.sendActivationEmail(createdUser.email, createdUser.activationToken)
 */              res.redirect('/login')
            })
  
        } 
      })
      .catch(err => {
        if (err instanceof mongoose.Error.ValidationError) {
          renderWithErrors(err.errors)
        } else {
          next(err)
        }
      })
  }

/*   const doLogin = (req, res, next, provider = 'local-auth') => {
    passport.authenticate(provider, (err, user, validations) => {
      if (err) {
        next(err)
      } else if(!user) {
        res.status(404).render('auth/login', { errorMessage: validations.error })
      } else {
        req.login(user, (loginError) => {
          console.log({user});
          if (loginError) {
            next(loginError)
          } else {
            req.flash('flashMessage', 'You have succesfully signed in')
            res.redirect('/profile')
          }
        })
      }
    })(req, res, next)
  }
  
  module.exports.doLogin = (req, res, next) => {
    doLogin(req, res, next)
  } */