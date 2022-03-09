const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trainerSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Trainer name is required'],        
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1570829460005-c840387bb1ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGd5bXxlbnwwfHwwfHw%3D&w=1000&q=80',
    },
    description: {
        type: String,
        minlength: [10, 'Please add a description that is at least 20 characters long']
    },
    contact: {
        type: String,
        required: [true, 'Contact form is required']
    },
    instagram: {
        type: String,
    },
    twitter: {
        type: String,
    },
    facebook: {
        type: String,
    },

},{
    timestamps: true
})

trainerSchema.virtual('comments',{
    ref: 'Comment',
    localField: '_id',
    foreignField: 'trainer',
    justOne: false,
})


const Trainer = mongoose.model('Trainer', trainerSchema)
module.exports = Trainer;