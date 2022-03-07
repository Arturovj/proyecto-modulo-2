const mongoose = require('mongoose')
const Gym = require('../models/gym.model')
const Trainer = require('../models/trainer.model')



module.exports.trainersList = (req, res, next) => {
  Trainer.find()
  .then((trainers) => {
    console.log(trainers)
    res.render('trainers/trainersList', trainers)
  })
    .catch((error) =>(error))
  }


module.exports.detailTrainer = (req, res, next) => {
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
            .then((gym) => {
              if (gym) {
                res.render('trainers/detailsTrainer', { trainer, averageRating});
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