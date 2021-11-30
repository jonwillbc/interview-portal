const mongoose = require('mongoose')
const validator = require('validator')

const positionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
})

positionSchema.statics.addPos = async (name) => {
    const posi = new Position({
        name: name
    })
    posi.save()
        .then(response => console.log(response))
        .catch(err => console.error(err))

    return posi
}

const Position = mongoose.model('Position', positionSchema)
module.exports = Position