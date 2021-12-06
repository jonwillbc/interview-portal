const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const User = require('./models/user')
const Application = require('./models/application')
const Position = require('./models/position')
const bodyParser = require('body-parser');
const Appointment = require('./models/appointment')

const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended: true}));

const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/applications');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.pdf');
    },
  });
  var upload = multer({ storage: storage });

/*const testUser = new User({
    name: 'test',
    PIN: 12345678
})
testUser.save()
        .then(response => console.log(response))
        .catch(err => console.error(err))
*/

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

app.post('/application', upload.single('upload'), async (req, res) => {
    //console.log(req.body)
    const app = new Application({
        position: req.body.position,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        filepath: req.file.path
    })
    app.save()
        .then(response => console.log(response))
        .catch(err => console.error(err))
    res.render('thanks', {
        title: 'Application Submitted',
        name: 'Jonathan Williams and Luke Stubbs'
    })
})

app.post('/applicationTest', upload.single('upload'), async (req, res) => {
    //console.log(req.body)
    const app = new Application({
        position: req.body.position,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        filepath: req.body.filepath
    })
    app.save()
        .then(response => console.log(response))
        .catch(err => console.error(err))
    res.render('thanks', {
        title: 'Application Submitted',
        name: 'Jonathan Williams and Luke Stubbs'
    })
})

app.get('/applicants', async (req, res) => {
    try {
        const apps = await Application.find({})
        res.send(apps)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/position',  async (req, res) => {
    if (!req.query.name) {
        return res.status(401).send({
            error: 'You must provide a Name!'
        })
    }

    const posi = await Position.addPos(req.query.name)
    res.status(200).send()
})

app.get('/positions',  async (req, res) => {
    try {
        const pos = await Position.find({})
        res.send(pos)
    } catch (e) {
        res.status(500).send()
    }
})

app.post('/schedule', async (req, res) => {
    //console.log(req.body)
    const app = new Appointment({
        name: req.body.name,
        date: req.body.date,
        time: req.body.time
    })
    app.save()
        .then(response => console.log(response))
        .catch(err => console.error(err))
    res.render('interviewer')
})

app.get('/appointments',  async (req, res) => {
    try {
        const appo = await Appointment.find({})
        res.send(appo)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/deleteApp',  async (req, res) => {
    console.log('delete')
    if (!req.query.id) {
        return res.status(401).send({
            error: 'You must provide an ID!'
        })
    }
    //const appo = Appointment.findOne({phone:  req.query.id})
    await Application.deleteApp(req.query.id)
    res.render('interviewer')
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

module.exports = app