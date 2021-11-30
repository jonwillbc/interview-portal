const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/application')
const Task = require('../../src/models/position')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    position: 'Nurse',
    name: 'Mike',
    phone: '555-123-4567',
    email: 'mike@example.com',
    filepath:"public\\applications\\sample-resume.pdf"
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    position: 'Surgeon',
    name: 'Jess',
    phone: '555-321-4567',
    email: 'jess@example.com',
    filepath:"public\\applications\\sample-resume.pdf"
}

const posOne = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Nurse'
}

const posTwo = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Surgeon'
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    posOne,
    posTwo
}