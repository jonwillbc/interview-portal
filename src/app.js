const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const User = require('./models/user')
//const userRouter = require('./routers/user')
//const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

/*const me = new User({
    name: 'John',
    PIN: 87654321
   })

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})*/


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome',
        name: 'Jonathan Williams and Luke Stubbs'
    })
})

app.get('/interviewer', (req, res) => {
    res.render('interviewer', {
        title: 'Interviewer',
        name: 'Jonathan Williams and Luke Stubbs'
    })
})

app.get('/applicant', (req, res) => {
    res.render('applicant', {
        title: 'Applicant',
        name: 'Jonathan Williams and Luke Stubbs'
    })
})



app.get('/users', async (req, res) => {
    if (!req.query.pin) {
        return res.send({
            error: 'You must provide a PIN!'
        })
    }
    try{
        const user = await User.findPIN(req.query.pin)
        res.send({ user })
    } catch (e){
        res.status(400).send()
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jonathan Williams and Luke Stubbs',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jonathan Williams and Luke Stubbs',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' +port+'.')
})