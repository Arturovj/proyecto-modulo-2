const mongoose = require('mongoose');
const Schema = mongoose.Schema

const commentSchema = new Schema({
    gym : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gym',
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer',
    },

    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
},{
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
