const mongoose = require('mongoose')
const Gym = require('../models/gym.model')
const Comment = require('../models/comment.model')

const categories = Object.keys(require('../data/categories.json'))

module.exports.list = (req, res, next) => {
    Gym.find()
    .populate('comments')
    .then((gyms) => {
        console.log(gyms)
       const ratedGyms = gyms.map(gym => {
            return {
                ...gym._doc,
                averageRating : gym.comments.reduce((acc, curr) => acc + curr.rating, 0) / gym.comments.length
            }
        })
        console.log(ratedGyms)
      
        res.render('gyms/list', {gyms : ratedGyms})
    })
    .catch((error) => next(error))
}


module.exports.detail = (req, res, next) => {

    Comment.find({ gym : req.params.id})
    .then((result)=> {
        let sumRatings = result.reduce((acc, curr) => acc + curr.rating, 0);
        const averageRating = sumRatings / result.length
        
            return Gym.findById(req.params.id)
            .populate({
              path: 'comments',
              populate: {
                path: 'user',
                model: 'User'
              }
            })
            .then((gym) => {
              if (gym) {
                res.render('gyms/details', { gym, averageRating});
              } else {
                res.redirect('/gyms');
              }
            })
        })
    
    
      .catch(error => next(error));
  };


module.exports.create = (req, res, next) => {
    res.render('gyms/new', {
        categories: categories
    })
}

module.exports.doCreate = (req, res, next) => {
    req.body.user = req.user.id
    let gym = req.body

    if (req.file) {
        gym.image = req.file.path
    }

    let gymCategories = req.body.categories
    
    if (gymCategories && !Array.isArray(gymCategories)) {
        gymCategories = [gymCategories]
    }

    console.log('req.body', req.body)

    Gym.create(gym)
        .then((created) =>{
            console.log(created)
             res.redirect('/gyms')
            })
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


  module.exports.editGym = (req, res, next) => {

    Gym.findById(req.params.id)
      .then((gym) => {
        res.render('gyms/editGym', {
          gym,
        });
      })
      .catch(next)
  
  };

 
module.exports.doEditGym = (req, res, next) => {
  Gym.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
    .then((gym) => res.redirect(`/gyms/${gym.id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        req.body.id = req.params.id;
        res.status(400).render('gym/editGym', {
          errors: error.errors,
          gym: req.body,
          categories: categories,
        });
      } else {
        next(error);
      }
    });
};

  module.exports.delete = (req, res, next) => {
    Gym.findByIdAndDelete(req.params.id)
      .then(() => res.redirect('/gyms'))
      .catch(error => next(error));
  };

