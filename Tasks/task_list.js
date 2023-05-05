// list of tasks
let tasks = [
  {
    id: '1',
    title: 'Zimmer aufräumen',
    creation_date: '2023-05-01',
    completion_date: '2023-05-06'
  },
  {
    id: '2',
    title: 'Pflanzen giessen',
    creation_date: '2023-05-01',
    completion_date: '2023-05-02'
  },
  {
    id: '3',
    title: 'Hausaufgaben machen',
    creation_date: '2023-05-01',
    completion_date: '2023-05-04'
  },
  {
    id: '4',
    title: 'Einkaufen',
    creation_date: '2023-05-01',
    completion_date: '2023-05-03'
  }
]

// show all tasks, ähnlich wie bei bibliothek.js
function findAllTasks () {
  return tasks
}

// create task, ähnlich wie bei bibliothek.js
function create (task) {
  tasks = [...tasks, task]
}

// show one task, ähnlich wie bei bibliothek.js
function showOneTask (id) {
  return tasks.find((t) => t.id === id)
}

// change tasks, ähnlich wie bei bibliothek.js
function change (task) {
  tasks = tasks.map((t) => t.id === task.id ? task : t)
  tasks = tasks.map((t) => {
    if (t.id === task.id) {
      return task
    } else {
      return t
    }
  })
}

// delete tasks, ähnlich wie bei bibliothek.js
function remove (id) {
  tasks = tasks.filter((t) => t.id !== id)
}

module.exports = {
  remove,
  change,
  showOneTask,
  create,
  findAllTasks
}
