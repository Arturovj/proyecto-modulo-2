const mongoose = require('mongoose')
const Gym = require('../models/gym.model')
const categories = Object.keys(require('../data/categories.json'))

module.exports.list = (req, res, next) => {
    Gym.find()
    .then((gyms) => res.render('gyms/list', {gyms})
    .catch((error) => next(error))
    )
}

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