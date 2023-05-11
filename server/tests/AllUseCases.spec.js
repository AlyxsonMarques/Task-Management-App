const dotenv = require('dotenv').config()
const axios = require('axios')

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
  it('Sign-in a user with email and password', async () => {
    testUserToken = await userUseCases.signIn('foo@bar.com', 'foo')
    expect(typeof testUserToken).toBe('string')
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
  it('Get teams by user id', async () => {
    expect(await teamUseCases.getTeamsByUserId([0])).toBeInstanceOf(Array)
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
      undefined,
      77
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

describe('Routes', () => {
  let testUser = {
    id: undefined,
    email: undefined,
    password: undefined,
    token: undefined,
  }
  let testTask = {
    id: undefined,
  }
  it('Should signup', async () => {
    const { data } = await axios.post(
      `http://localhost:${process.env.PORT}/signup`,
      {
        email: 'agoravai',
        password: '12345678',
      }
    )
    testUser.id = data.id
    testUser.email = data.email
    testUser.password = data.password

    expect(typeof data.id).toBe('number')
  })
  it('Should signin', async () => {
    const { data } = await axios.post(
      `http://localhost:${process.env.PORT}/signin`,
      {
        email: 'agoravai',
        password: '12345678',
      }
    )

    testUser.token = data.encodedToken
    expect(typeof data.encodedToken).toBe('string')
  })

  describe('/me/tasks', () => {
    it('POST -> Should create a new task', async () => {
      console.log(testUser)
      const { data } = await axios.post(
        `http://localhost:${process.env.PORT}/me/tasks`,
        {
          title: 'Test Task',
          description: 'Test Task Description',
          state: 'pending',
          priority: 'low',
          team: null,
          user: testUser.id,
        },
        {
          headers: {
            authorization: testUser.token,
          },
        }
      )

      testTask.id = data.id
      expect(data).toHaveProperty('user', testUser.id)
    })
    it('GET -> Should get all tasks', async () => {
      const { data } = await axios.get(
        `http://localhost:${process.env.PORT}/me/tasks`,
        {
          headers: {
            authorization: testUser.token,
          },
        }
      )
      expect(data).toBeInstanceOf(Array)
    })
    it('PATCH -> Should update a task', async () => {
      const { data } = await axios.patch(
        `http://localhost:${process.env.PORT}/me/tasks/`,
        {
          id: testTask.id,
          title: 'Test New Task',
          description: 'Test Task New Description',
          state: 'pending',
          priority: 'low',
          team: null,
          user: testUser.id,
        },
        {
          headers: {
            authorization: testUser.token,
          },
        }
      )

      expect(data).toHaveProperty('user', testUser.id)
    })
    it('DELETE -> Should delete a task', async () => {
      const { data } = await axios.delete(
        `http://localhost:${process.env.PORT}/me/tasks/`,
        {
          id: testTask.id,
        },
        {
          headers: {
            authorization: testUser.token,
          },
        }
      )

      expect(data).toHaveProperty('user', testUser.id)
    })
  })
  describe('/me/teams', () => {
    it('(todo): POST -> Should create a new team', async () => {})
    it('(todo): GET -> Should get all teams', async () => {})
    it('(todo): PATCH -> Should update a team', async () => {})
    it('(todo): DELETE -> Should delete a team', async () => {})
  })
  describe('/me/teams/:teamId/tasks', () => {
    it('(todo): POST -> Should create a new task for a team', async () => {})
    it('(todo): GET -> Should get all tasks for a team', async () => {})
    it('(todo): PATCH -> Should update a task for a team', async () => {})
    it('(todo): DELETE -> Should delete a task for a team', async () => {})
  })
})
