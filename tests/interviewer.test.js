const request = require('supertest')
const app = require('../src/app')
const Position = require('../src/models/position')
const { userOneId, userOne } = require('./fixtures/db')

test('Should login to interviewer page', async () => {
    const response = await request(app)
        .get('/users?pin=12345678')
        .send()
        .expect(200)
})

test('Should not login to interviewer page with incorrect pin', async () => {
    const response = await request(app)
        .get('/users?pin=88888888')
        .send()
        .expect(400)
})

test('Should properly add position', async () => {
    const response = await request(app)
        .get('/position?name=Nurse')
        .send()
        .expect(200)

    // Assert that the database was changed correctly
    const user = await Position.findOne({name: "Nurse"})
    expect(user).not.toBeNull()    
})

test('Should not add position if no name is specified', async () => {
    const response = await request(app)
        .get('/position')
        .send()
        .expect(401)
})

test('Should properly get positions', async () => {
    const response = await request(app)
        .get('/positions')
        .send()
        .expect(200)
})
