const { find } = require("../models/gym.model")
const User = require("../models/user.model")
const Comment = require("../models/comment.model")

module.exports.profile = (req, res, next) => {
    Comment.find({user: req.user.id})
    .populate({
      path: 'gym',
      populate: {
        path: 'comments',
        model: 'Comment'
      }
    })
    .then((comments) => {
        const gyms = comments.map((comment) => comment.gym).filter(g => g);
        const cleanGyms = [];
        console.log(gyms)
        gyms.forEach((gym) => !cleanGyms.some(g => g.id === gym.id) && cleanGyms.push(gym))
        return cleanGyms


        
    }).then((gyms) => {
      const ratedGyms = gyms.map(gym => {
        return {
            ...gym._doc,
            averageRating : gym.comments.reduce((acc, curr) => acc + curr.rating, 0) / gym.comments.length
        }
      })
      res.render('partials/profile', { gyms: ratedGyms })
    })
}

module.exports.editUser = (req, res, next) => {
    console.log(req.params.id)
    User.findById(req.params.id)
      .then((user) => {
        res.render('users/editUser', {
          user,
        });
      })
      .catch(next)
  
};

module.exports.doEditUser = (req, res, next) => {
    console.log(req.body)
    if (req.file){
        req.body.image = req.file.path
    } else {
        delete req.body.image
    }

    User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
      .then((user) => {
          console.log(user)
          res.redirect('/profile')
        })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          req.body.id = req.params.id;
          res.status(400).render(`users/${user._id}/edit`, {
            errors: error.errors,
            user: req.body,
            categories: categories,
          });
        } else {
          next(error);
        }
      });
  };