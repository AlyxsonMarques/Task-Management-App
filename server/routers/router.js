const express = require('express')
const router = express.Router()

const {
  userUseCases,
  teamUseCases,
  taskUseCases,
} = require('../controllers/controller')

router
  .route('/users')
  .post(async (req, res) => {
    res.json(await userUseCases.createUser(req.body.email, req.body.password))
  })
  .get(async (req, res) => {
    res.json(await userUseCases.getAllUsers())
  })

router
  .route('/users/:id')
  .get(async (req, res) => {
    res.json(await userUseCases.getUserById(req.params.id))
  })
  .patch(async (req, res) => {
    res.json(
      await userUseCases.updateUser(
        req.params.id,
        req.body.name,
        req.body.password
      )
    )
  })
  .delete(async (req, res) => {
    res.json(await userUseCases.deleteUser(req.params.id))
  })

router
  .route('/teams')
  .post(async (req, res) => {
    res.json(
      await teamUseCases.createTeam(
        req.body.name,
        req.body.members,
        req.body.administrators
      )
    )
  })
  .get(async (req, res) => {
    res.json(await teamUseCases.getAllTeams())
  })

router
  .route('/teams/:id')
  .get(async (req, res) => {
    res.json(await teamUseCases.getTeamById(req.params.id))
  })
  .patch(async (req, res) => {
    res.json(
      await teamUseCases.updateTeam(
        req.params.id,
        req.body.name,
        req.body.members,
        req.body.administrators
      )
    )
  })
  .delete(async (req, res) => {
    res.json(await teamUseCases.deleteTeam(req.params.id))
  })

router
  .route('/tasks')
  .post(async (req, res) => {
    res.json(
      await taskUseCases.createTask(
        req.body.title,
        req.body.description,
        req.body.state,
        req.body.priority,
        req.body.team,
        req.body.user
      )
    )
  })
  .get(async (req, res) => {
    res.json(await taskUseCases.getAllTasks())
  })

router
  .route('/tasks/:id')
  .get(async (req, res) => {
    res.json(await taskUseCases.getTaskById(req.params.id))
  })
  .patch(async (req, res) => {
    res.json(
      await taskUseCases.updateTask(
        req.params.id,
        req.body.title,
        req.body.description,
        req.body.state,
        req.body.priority,
        req.body.team,
        req.body.user
      )
    )
  })
  .delete(async (req, res) => {
    res.json(await taskUseCases.deleteTask(req.params.id))
  })
module.exports = router
