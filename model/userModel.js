const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 10,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    age: {
        type: Number,
        required: true,
        min: 0
    }
})

const User = new mongoose.model("User", userSchema)
module.exports = User