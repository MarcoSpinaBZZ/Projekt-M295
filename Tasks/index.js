// alles const machen inspiriert von Sami Hindi
const express = require('express')
const cors = require('cors')
const session = require('express-session')

const router = require('./login.js')
const router2 = require('./tasks.js')

const app = express()
const port = 3002

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

// session template inspiriert bei Aufgabe: Beispiel einer Session mit Cookie mit NodeJS und express-session
app.use(express.json())
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}))

// Idee router zu benutzen von Sami Hindi empfohlen bekommen
app.use('/', router)

app.use('/tasks', router2)

app.listen(port, () => {
  console.log('Server ist gestartet :)')
})
