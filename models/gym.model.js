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
        default: 'https://images.unsplash.com/photo-1570829460005-c840387bb1ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGd5bXxlbnwwfHwwfHw%3D&w=1000&q=80',
    },
    categories: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        minlength: [10, 'Please add a description that is at least 20 characters long']
    },
    timeline: {
        type: String,
    },
    capacity: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    },
},{
    timestamps: true
})

gymSchema.virtual('comments',{
    ref: 'Comment',
    localField: '_id',
    foreignField: 'gym',
    justOne: false,
})

const Gym = mongoose.model('Gym', gymSchema)
module.exports = Gym;