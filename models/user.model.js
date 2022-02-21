const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 
const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: 'name is required',
      minLength: [3, 'name needs at least 3 chars']
    },
    email: {
      type: String,
      required: 'email is required',
      match: [EMAIL_PATTERN, 'email is not valid'],
      unique: true
    },
    password: {
      type: String,
      required: 'password is required',
      match: [PASSWORD_PATTERN, 'password needs at least 8 chars'],
    },
    googleID: {
      type: String
    }, 
    image: {
      type: String,
      default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Faui.atlassian.com%2Faui%2F8.8%2Fdocs%2Favatars.html&psig=AOvVaw0YvFYgP7uuOlN_jF19fjN4&ust=1645561107301000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMDrofzOkfYCFQAAAAAdAAAAABAD',
    },
     active: {
      type: Boolean,
      default: false
    }, 
    activationToken: {
      type: String,
      default: () => {
        return Math.random().toString(36).substring(7) +
        Math.random().toString(36).substring(7) +
        Math.random().toString(36).substring(7) +
        Math.random().toString(36).substring(7)
      }
    } 
  });

   userSchema.pre('save', function(next) {
    const user = this;
  
    if (user.isModified('password')) {
      bcrypt.hash(user.password, SALT_ROUNDS)
        .then((hash) => {
          user.password = hash
          next()
        })
        .catch(err => next(err))
    } else {
      next()
    }
  }) 
  
    userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password)
  } 
  
  const User = mongoose.model('User', userSchema); 
  
  module.exports = User;