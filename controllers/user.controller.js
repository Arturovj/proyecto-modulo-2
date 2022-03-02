const { find } = require("../models/gym.model")
const User = require("../models/user.model")
const Comment = require("../models/comment.model")

module.exports.profile = (req, res, next) => {
    Comment.find({user: req.user.id})
    .populate('gym')
    .then((comments) => {
        const gyms = comments.map((comment) => comment.gym);
        const cleanGyms = [];
        gyms.forEach((gym) => !cleanGyms.some(g => g.id === gym.id) && cleanGyms.push(gym))

        console.log(cleanGyms)
        res.render('users/profile', { gyms: cleanGyms })
    })
}