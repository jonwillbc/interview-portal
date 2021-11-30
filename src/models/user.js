const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    PIN: {
        type: Number,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.statics.findPIN = async (PIN) => {
    const user = await User.findOne({ PIN })

    if (!user) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'mySecret')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

const User = mongoose.model('User', userSchema)
module.exports = User