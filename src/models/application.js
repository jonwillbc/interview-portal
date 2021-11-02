const mongoose = require('mongoose')
const validator = require('validator')

const appSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    filepath:{
        type: String,
        required: true
    }
})

const Application = mongoose.model('Application', appSchema)
module.exports = Application