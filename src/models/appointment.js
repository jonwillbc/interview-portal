const mongoose = require('mongoose')
const validator = require('validator')

const appoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true
    },
})

appoSchema.statics.deleteAppo = async (id) => {
    Appointment.findOneAndDelete({ phone:  id})
    return
}

const Appointment = mongoose.model('Appointment', appoSchema)
module.exports = Appointment