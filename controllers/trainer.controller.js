const mongoose = require('mongoose')

const Trainer = require('../models/trainer.model')
const Comment = require('../models/comment.model')



module.exports.trainersList = (req, res, next) => {
  Trainer.find()
  .populate('comments')
  .then((trainers) => {
    console.log(trainers)
   const ratedTrainers = trainers.map(trainer => {
        return {
            ...trainer._doc,
            averageRating : trainer.comments.reduce((acc, curr) => acc + curr.rating, 0) / trainer.comments.length
        }
    })
    console.log(ratedTrainers)
  
    res.render('trainers/trainersList', {trainers : ratedTrainers})
})
.catch((error) => next(error))
  .then((trainers) => {
    console.log(trainers, "entrenadores")
    res.render('trainers/trainersList', {trainers})
  })
    .catch((error) =>(error))
  }
  	

module.exports.trainerDetail = (req, res, next) => {
  Comment.find({ trainer : req.params.id})
    .then((result)=> {
        let sumRatings = result.reduce((acc, curr) => acc + curr.rating, 0);
        const averageRating = sumRatings / result.length
        
            return Trainer.findById(req.params.id)
            .populate({
              path: 'comments',
              populate: {
                path: 'user',
                model: 'User'
              }
            })
            .then((trainer) => {
              if (trainer) {
                res.render('trainers/trainerDetails', { trainer, averageRating});
              } else {
                res.redirect('/trainers');
              }
            })
        })
    
    
      .catch(error => next(error));
}


module.exports.createTrainer = (req, res, next) => {
  res.render('trainers/newTrainer', {
  })
}







module.exports.doCreateTrainer = (req, res, next) => {
  let trainer = req.body

  if (req.file) {
      trainer.image = req.file.path
  }

  let trainerCategories = req.body.categories
  
  if (trainerCategories && !Array.isArray(trainerCategories)) {
      trainerCategories = [trainerCategories]
  }

  console.log('req.body', req.body)

  Trainer.create(trainer)
      .then((created) =>{
          console.log(created)
           res.redirect('/trainers')
          })
      .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
              res.status(400).render('trainers/newTrainer', {
                  errors: error.errors,
                  trainer,
                  categories
              })
          } else {
              next(error)
          }
      })
}


module.exports.doCommentTrainer = (req, res, next) => {
  const comment = {
      trainer: req.params.id,
      user: req.user.id,
      comment: req.body.comment,
      rating: req.body.rating,
      trainer: req.params.id
  }
  Comment.create(comment)
      .then((commentCreated) => res.redirect(`/trainers/${commentCreated.trainer}`))
      .catch(next)
  // trainer.findOneAndUpdate(req.params.id, {}, { runValidators: true, new: true })
  //   .then((trainer) => res.redirect(`/trainers/${trainer.id}`))
  //   .catch((error) => {
  //     if (error instanceof mongoose.Error.ValidationError) {
  //       req.body.id = req.params.id;
  //       res.status(400).render('trainers/details', {
  //         errors: error.errors,
  //         trainer: req.body,
  //         categories: categories,
  //       });
  //     } else {
  //       next(error);
  //     }
  //   });
};