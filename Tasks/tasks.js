import express from 'express'
import cors from 'cors'
import { findAllTasks, create, showOneTask, change, remove } from './task_list.js'

const app = express()
const port = 3002

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// show all tasks, ähnlich wie bei bibliothek.js
app.get('/tasks', (req, res) => {
  res.status(200).send(findAllTasks())
})

// create task, ähnlich wie bei bibliothek.js
app.post('/tasks', (req, res) => {
  const task = {
    id: req.body.id,
    title: req.body.title,
    creation_date: req.body.creation_date,
    completion_date: req.body.completion_date
  }
  create(task)
  res.status(201).send(findAllTasks())
})

// show one task, ähnlich wie bei bibliothek.js
app.get('/tasks/:id', (req, res) => {
  if (findAllTasks().find((t) => t.id === req.params.id)) {
    res.status(200).send(showOneTask(req.params.id))
  } else {
    res.status(404).send()
  }
})

// change tasks, ähnlich wie bei bibliothek.js
app.put('/tasks/:id', (req, res) => {
  const changedTask = {
    id: req.params.id,
    title: req.body.title,
    creation_date: req.body.creation_date,
    completion_date: req.body.completion_date
  }
  change(changedTask)
  res.status(200).send(findAllTasks())
})

// delete tasks, ähnlich wie bei bibliothek.js
app.delete('/tasks/:id', (req, res) => {
  if (findAllTasks().find((t) => t.id === req.params.id)) {
    res.status(204).send()
    remove(req.params.id)
  } else {
    res.status(404).send()
  }
})

app.listen(port, () => {
  console.log('Server ist gestartet :)')
})
