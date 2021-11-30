const mongoose = require('mongoose')
const validator = require('validator')

const appSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Phone number is invalid')
            }
        },
        required: true
    },
    email:{
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        },
        required: true
    },
    filepath:{
        type: String,
    }
})

const Application = mongoose.model('Application', appSchema)
module.exports = Application