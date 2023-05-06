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
  // await taskManager.createAllTables()
  await taskManager.createTask(
    'teste',
    'desc',
    'pending',
    'high',
    [2, 3],
    [4, 5]
  )
  // const resultSingleTasks = await taskManager.getTaskById(3)
  const resultDeleteTask = await taskManager.deleteTask(4)
  // const resultAllTasks = await taskManager.getAllTasks()

  // console.log(resultSingleTasks)
  console.log(resultDeleteTask)
  // console.log(resultAllTasks)
})()
