const request = require('supertest')
const app = require('../src/app')
const Application = require('../src/models/application')
const {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    posOne,
    posTwo,
} = require('./fixtures/db')

test('Should create application for userOne', async () => {
    const response = await request(app).post('/applicationTest').send({
        position: 'Nurse',
        name: 'Mike',
        phone: '555-123-4567',
        email: 'mike@example.com',
        filepath:'public\\applications\\sample-resume.pdf'
    }).expect(500)

    // Assert that the database was changed correctly
    const user = await Application.findOne({name: "Mike"})
    expect(user).not.toBeNull()
})

test('Should fetch applications', async () => {
    const response = await request(app)
        .get('/applicants')
        .send()
        .expect(200)
})

test('Should not create applicant with an invalid email', async () => {
    const response = await request(app)
        .get('/application')
        .send({
            position: 'Nurse',
            name: 'Mike',
            phone: '555-123-4567',
            email: 'mike',
            filepath:"public\\applications\\sample-resume.pdf"
        })
        .expect(200)
})

test('Should not create applicant with an invalid phone number', async () => {
    const response = await request(app)
        .get('/application')
        .send({
            position: 'Nurse',
            name: 'Mike',
            phone: 'phone',
            email: 'mike@example.com',
            filepath:"public\\applications\\sample-resume.pdf"
        })
        .expect(200)
})