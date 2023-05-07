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
  'localhost',
  5432,
  'alyxson',
  '123',
  'taskmanagement'
)

const userRepository = new UserRepository(database)
const userUseCases = new UserUseCases(userRepository)

const teamRepository = new TeamRepository(database)
const teamUseCases = new TeamUseCases(teamRepository)

const taskRepository = new TaskRepository(database)
const taskUseCases = new TaskUseCases(taskRepository)

let testUser
let testTeam
let testTask

describe('User CRUD', () => {
  it('Creates a new user', async () => {
    testUser = await userUseCases.createUser('foo@bar.com', 'foo')
    expect(testUser).toBeInstanceOf(User)
  })
  it('Get all users', async () => {
    expect(await userUseCases.getAllUsers()).toBeInstanceOf(Array)
  })
  it('Get user by id', async () => {
    expect(await userUseCases.getUserById(testUser.id)).toBeInstanceOf(User)
  })
  it('Update user by id', async () => {
    expect(
      await userUseCases.updateUser(testUser.id, 'new name', 'new pass')
    ).toBeInstanceOf(User)
  })
  it('Deletes user', async () => {
    expect(await userUseCases.deleteUser(testUser.id)).toBeInstanceOf(User)
  })
})

describe('Team CRUD', () => {
  it('Creates a new team', async () => {
    testTeam = await teamUseCases.createTeam('test team', [0], [0])
    expect(testTeam).toBeInstanceOf(Team)
  })
  it('Get all teams', async () => {
    expect(await teamUseCases.getAllTeams()).toBeInstanceOf(Array)
  })
  it('Get team by id', async () => {
    expect(await teamUseCases.getTeamById(testTeam.id)).toBeInstanceOf(Team)
  })
  it('Update team by id', async () => {
    expect(
      await teamUseCases.updateTeam(testTeam.id, 'new team name')
    ).toBeInstanceOf(Team)
  })
  it('Deletes team', async () => {
    expect(await teamUseCases.deleteTeam(testTeam.id)).toBeInstanceOf(Team)
  })
})

describe('Task CRUD', () => {
  it('Creates a new task', async () => {
    testTask = await taskUseCases.createTask(
      'Test Task',
      'Test Task Description',
      'pending',
      'low',
      2,
      2
    )
    expect(testTask).toBeInstanceOf(Task)
  })

  it('Get all tasks', async () => {
    expect(await taskUseCases.getAllTasks()).toBeInstanceOf(Array)
  })

  it('Get task by id', async () => {
    expect(await taskUseCases.getTaskById(testTask.id)).toBeInstanceOf(Task)
  })
  it('Updates task by id', async () => {
    expect(
      await taskUseCases.updateTask(
        testTask.id,
        'new task name',
        'new description',
        'new status',
        'new priority'
      )
    ).toBeInstanceOf(Task)
  })
  it('Delete task', async () => {
    expect(await taskUseCases.deleteTask(testTask.id)).toBeInstanceOf(Task)
  })
})
