const mongoose = require('mongoose')
const Gym = require('../models/gym.model')
const Comment = require('../models/comment.model')

const categories = Object.keys(require('../data/categories.json'))

module.exports.list = (req, res, next) => {
    Gym.find()
    .then((gyms) => res.render('gyms/list', {gyms}))
    .catch((error) => next(error))
}


module.exports.detail = (req, res, next) => {

    Gym.findById(req.params.id)
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'User'
        }
      })
      .then((gym) => {
        if (gym) {
          res.render('gyms/details', { gym });
        } else {
          res.redirect('/gyms');
        }
      })
      .catch(error => next(error));
  };


module.exports.create = (req, res, next) => {
    res.render('gyms/new', {
        categories: categories
    })
}

module.exports.doCreate = (req, res, next) => {
    let gymCategories = req.body.categories
    
    if (gymCategories && !Array.isArray(gymCategories)) {
        gymCategories = [gymCategories]
    }

    Gym.create(req.body)
        .then(() => res.redirect('/gyms'))
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('gyms/new', {
                    errors: error.errors,
                    gym,
                    categories
                })
            } else {
                next(error)
            }
        })
}


module.exports.doComment = (req, res, next) => {
    const comment = {
        gym: req.params.id,
        user: req.user.id,
        comment: req.body.comment,
        rating: req.body.rating 
    }
    Comment.create(comment)
        .then((commentCreated) => res.redirect(`/gyms/${commentCreated.gym}`))
        .catch(next)
    // Gym.findOneAndUpdate(req.params.id, {}, { runValidators: true, new: true })
    //   .then((gym) => res.redirect(`/gyms/${gym.id}`))
    //   .catch((error) => {
    //     if (error instanceof mongoose.Error.ValidationError) {
    //       req.body.id = req.params.id;
    //       res.status(400).render('gyms/details', {
    //         errors: error.errors,
    //         gym: req.body,
    //         categories: categories,
    //       });
    //     } else {
    //       next(error);
    //     }
    //   });
  };