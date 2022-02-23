const mongoose = require('mongoose')
const Gym = require('../models/gym.model')

module.exports.list = (req, res, next) => {
    Gym.find()
    .then((gyms) => res.render('gyms/list', {gyms})
    .catch((error) => next(error))
    )
}