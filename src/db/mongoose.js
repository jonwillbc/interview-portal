const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://taskapp:3iTVkd5vExTCpxgJ@cluster0.pzuat.mongodb.net/test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})