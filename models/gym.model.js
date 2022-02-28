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
        default: 'https://www.goohttps://images.unsplash.com/photo-1570829460005-c840387bb1ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGd5bXxlbnwwfHwwfHw%3D&w=1000&q=80gle.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fgym&psig=AOvVaw26mkgKy62XLUrro60nQsyJ&ust=1646163853990000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLjOgrCUo_YCFQAAAAAdAAAAABAD',
    },
    categories: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        minlength: [10, 'Please add a description that is at least 20 characters long']
    },
    capacity: {
        type: Number,
    }
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