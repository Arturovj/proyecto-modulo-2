const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gymSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Gym name is required'],        
    },
    address: {
        type: String,
        required: [true, "Gym address is required"]
    },
    image: {
        type: String,
        default: '',
    },
    categories: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        minlength: [20, 'Please add a description that is at least 20 characters long']
    },
    capacity: {
        type: Number,
    }
},{
    timestamps: true
})

const Gym = mongoose.model('Gym', gymSchema)
module.exports = Gym;