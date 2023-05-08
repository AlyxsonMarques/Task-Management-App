const dotenv = require('dotenv').config()

const User = require('../Entities/User')
const UserUseCases = require('../UseCases/UserUseCases.js')
const UserRepository = require('../Repositories/userRepository.js')

const Team = require('../Entities/Team')
const TeamUseCases = require('../UseCases/TeamUseCases.js')
const TeamRepository = require('../Repositories/teamRepository.js')

const Task = require('../Entities/Task')
const TaskUseCases = require('../UseCases/TaskUseCases.js')
const TaskRepository = require('../Repositories/taskRepository.js')

const Database = require('../Database/Database.js')

const database = new Database(
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_USER,
  process.env.DB_PASS,
  process.env.DB_NAME
)

const userRepository = new UserRepository(database)
const userUseCases = new UserUseCases(userRepository)

const teamRepository = new TeamRepository(database)
const teamUseCases = new TeamUseCases(teamRepository)

const taskRepository = new TaskRepository(database)
const taskUseCases = new TaskUseCases(taskRepository)

module.exports = {
  userUseCases,
  teamUseCases,
  taskUseCases,
}
