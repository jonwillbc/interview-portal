const mongoose = require('mongoose')
const validator = require('validator')

const positionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
})

const Position = mongoose.model('Position', positionSchema)
module.exports = Position