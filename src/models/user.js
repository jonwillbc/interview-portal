const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    PIN: {
        type: Number,
    }
})

userSchema.statics.findPIN = async (PIN) => {
    const user = await User.findOne({ PIN })

    if (!user) {
        throw new Error('Unable to login')
    }

    return user
}

const User = mongoose.model('User', userSchema)
module.exports = User