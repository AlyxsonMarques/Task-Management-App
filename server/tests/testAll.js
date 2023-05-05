/* eslint-disable no-console */
const UseCases = require('../UseCases/UseCases')
const TaskRepository = require('../Repositories/taskRepository')
const Database = require('../Database/Database')

const database = new Database(
  'localhost',
  5432,
  'alyxson',
  '123',
  'taskmanagement'
)
const taskRepository = new TaskRepository(database)
const taskManager = new UseCases(taskRepository)

;(async () => {
  await taskManager.createAllTables()
  const resultCreateTask = await taskManager.createTask(
    'Teste',
    'Desc',
    'pending',
    'low',
    [1, 5, 6],
    [2, 3, 4]
  )
  const resultQueryTasks = await taskManager.getAllTasks()

  console.log(resultCreateTask)
  console.log(resultQueryTasks)
})()
