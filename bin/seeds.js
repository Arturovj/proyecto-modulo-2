require('dotenv').config()

const mongoose = require('mongoose')
const Gym = require('../models/gym.model')
const gyms = require('../data/gyms.json')

require('../config/db.config')

mongoose.connection.once('open', () => {
    console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);
    mongoose.connection.db
      .dropDatabase()
        .then(() => `O.o! ${mongoose.connection.db.databaseName} dropped!`)
        .then(() => {
          gyms.forEach(gym => {
            new Gym({
              ...gym,
              categories: ['pool', 'martialArts', "gym"],
              description: 'lorem sentence grater than 10 characters',
              capacity: Math.floor(Math.random() * 100 + 10),
            }).save()
            .then((createdGym) => console.log(createdGym))
            
          })
        })
        .catch(err => console.error('mongoose', err))
  })