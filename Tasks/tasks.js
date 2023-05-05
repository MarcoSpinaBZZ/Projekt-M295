const express = require('express')
const cors = require('cors')
const session = require('express-session')

const { findAllTasks, create, showOneTask, change, remove } = require('./task_list.js')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cors())

// session template inspiriert bei Aufgabe: Beispiel einer Session mit Cookie mit NodeJS und express-session
app.use(express.json())
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}))

// show all tasks, ähnlich wie bei bibliothek.js (mit verification)
app.get('/', (req, res) => {
  if (req.session.email) {
    res.status(200).send(findAllTasks())
  } else {
    res.status(403).json({ error: 'You are not logged in!' })
  }
})

// create task, ähnlich wie bei bibliothek.js (mit verification)
app.post('/', (req, res) => {
  if (req.session.email) {
    const task = {
      id: req.body.id,
      title: req.body.title,
      creation_date: req.body.creation_date,
      completion_date: req.body.completion_date
    }
    create(task)
    res.status(201).send(findAllTasks())
  } else {
    res.status(403).json({ error: 'You are not logged in!' })
  }
})

// show one task, ähnlich wie bei bibliothek.js (mit verification)
app.get('/:id', (req, res) => {
  if (req.session.email) {
    if (findAllTasks().find((t) => t.id === req.params.id)) {
      res.status(200).send(showOneTask(req.params.id))
    } else {
      res.status(404).send()
    }
  } else {
    res.status(403).json({ error: 'You are not logged in!' })
  }
})

// change tasks, ähnlich wie bei bibliothek.js (mit verification)
app.put('/:id', (req, res) => {
  if (req.session.email) {
    const changedTask = {
      id: req.params.id,
      title: req.body.title,
      creation_date: req.body.creation_date,
      completion_date: req.body.completion_date
    }
    change(changedTask)
    res.status(200).send(findAllTasks())
  } else {
    res.status(403).json({ error: 'You are not logged in!' })
  }
})

// delete tasks, ähnlich wie bei bibliothek.js (mit verification)
app.delete('/:id', (req, res) => {
  if (req.session.email) {
    if (findAllTasks().find((t) => t.id === req.params.id)) {
      res.status(204).send()
      remove(req.params.id)
    } else {
      res.status(404).send()
    }
  } else {
    res.status(403).json({ error: 'You are not logged in!' })
  }
})

module.exports = app
