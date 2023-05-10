const dotenv = require('dotenv').config()

const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const {
  userUseCases,
  teamUseCases,
  taskUseCases,
} = require('../controllers/controller')

const { authenticateJwt } = require('../middlewares/authenticate')

router.route('/signup').post(async (req, res) => {
  const user = await userUseCases.createUser(req.body.email, req.body.password)
  res.status(201).json(user)
})

router.route('/signin').post(async (req, res) => {
  const userToken = await userUseCases.signIn(req.body.email, req.body.password)
  if (userToken?.msg) {
    res.status(401).json(userToken)
  } else {
    jwt.verify(userToken, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json(err)
      } else {
        res.status(200).json({
          msg: 'Successful login',
          encodedToken: userToken,
          decodedToken: decoded,
        })
      }
    })
  }
})

router
  .route('/me/tasks')
  .post(authenticateJwt, async (req, res) => {
    const userId = req.id
    const task = await taskUseCases.createTask(
      req.body.title,
      req.body.description,
      req.body.state,
      req.body.priority,
      req.body.team,
      userId
    )
    res.status(201).json(task)
  })
  .get(authenticateJwt, async (req, res) => {
    const userId = req.id
    const tasks = await taskUseCases.getTasksByUserId(userId)
    res.status(200).json(tasks)
  })
  .patch(authenticateJwt, async (req, res) => {
    const userId = req.id

    const oldTask = await taskUseCases.getTaskById(req.body.id)
    if (oldTask.user !== userId) {
      res.status(401).json({
        msg: 'You are not authorized to perform this action',
      })
    }

    const task = await taskUseCases.updateTask(
      req.body.id,
      req.body.title,
      req.body.description,
      req.body.state,
      req.body.priority,
      req.body.team,
      req.body.user
    )

    res.status(200).json(task)
  })
  .delete(authenticateJwt, async (req, res) => {
    const userId = req.id

    const oldTask = await taskUseCases.getTaskById(req.body.id)
    if (oldTask.user !== userId) {
      res.status(401).json({
        msg: 'You are not authorized to perform this action',
      })
    }

    const task = await taskUseCases.deleteTask(req.body.id)

    res.status(200).json(task)
  })

router
  .route('/me/teams')
  .post(authenticateJwt, (req, res) => {
    const userId = req.id
    const team = teamUseCases.createTeam(req.body.name, [userId], [userId])
    if (!team) {
      res.status(501).json({
        msg: 'Server-side error',
      })
    }
    res.status(201).json(team)
  })
  .get(authenticateJwt, (req, res) => {
    const userId = req.id
    const teams = teamUseCases.getTeamsByUserId([userId])
    if (!teams) {
      res.status(404).json({
        msg: 'No teams found for user',
      })
    }
    res.status(200).json(teams)
  })
  .patch(authenticateJwt, (req, res) => {
    const userId = req.id
    const oldTeam = teamUseCases.getTeamById(req.body.id)

    if (!oldTeam.administrators.includes(userId)) {
      res.status(401).json({
        msg: 'You are not authorized to perform this action',
      })
    } else {
      const team = teamUseCases.updateTeam(
        req.body.id,
        req.body.name,
        req.body.administrators
      )
      res.status(200).json(team)
    }
  })
  .delete(authenticateJwt, (req, res) => {
    const userId = req.id
    const oldTeam = teamUseCases.getTeamById(req.body.id)

    if (!oldTeam.administrators.includes(userId)) {
      res.status(401).json({
        msg: 'You are not authorized to perform this action',
      })
    } else {
      const team = teamUseCases.deleteTeam(req.body.id)
      res.status(200).json(team)
    }
  })

router
  .route('/me/teams/:teamId/tasks')
  .post(authenticateJwt, (req, res) => {
    const userId = req.id

    const teams = teamUseCases.getTeamsByUserId(userId)

    if (!teams) {
      res.status(404).json({
        msg: 'No teams found for user',
      })
    }

    const isUserFromTeam = teams.some((team) => {
      return team.id === req.params.teamId
    })

    if (!isUserFromTeam) {
      return res.status(401).json({
        msg: 'Not authorized to perform this action',
      })
    }
    const task = taskUseCases.createTask(
      req.body.title,
      req.body.description,
      req.body.state,
      req.body.priority,
      req.params.teamId,
      userId
    )
    if (!task) {
      res.status(501).json({
        msg: 'Server-side error',
      })
    } else {
      res.status(201).json(task)
    }
  })
  .get(authenticateJwt, (req, res) => {
    const userId = req.id

    const teams = teamUseCases.getTeamsByUserId(userId)
    if (!teams) {
      res.status(404).json({
        msg: 'No teams found for user',
      })
    }
    const isUserFromTeam = teams.some((team) => {
      return team.id === req.params.teamId
    })

    if (!isUserFromTeam) {
      return res.status(401).json({
        msg: 'Not authorized to perform this action',
      })
    }

    const tasks = taskUseCases.getTasksByTeamId(req.params.teamId)
    if (!tasks) {
      res.status(404).json({
        msg: 'No tasks found for team',
      })
    } else {
      res.status(200).json(tasks)
    }
  })
  .patch(authenticateJwt, (req, res) => {
    const userId = req.id

    const teams = teamUseCases.getTeamsByUserId(userId)
    if (!teams) {
      res.status(404).json({
        msg: 'No teams found for user',
      })
    }
    const isUserFromTeam = teams.some((team) => {
      return team.id === req.params.teamId
    })

    if (!isUserFromTeam) {
      return res.status(401).json({
        msg: 'Not authorized to perform this action',
      })
    }

    const task = taskUseCases.updateTask(
      req.body.id,
      req.body.title,
      req.body.description,
      req.body.state,
      req.body.priority,
      req.params.teamId,
      req.body.user
    )

    if (!task) {
      res.status(501).json({
        msg: 'Server-side error',
      })
    } else {
      res.status(200).json(task)
    }
  })
  .delete(authenticateJwt, (req, res) => {
    const userId = req.id

    const teams = teamUseCases.getTeamsByUserId(userId)
    if (!teams) {
      res.status(404).json({
        msg: 'No teams found for user',
      })
    }
    const isUserFromTeam = teams.some((team) => {
      return team.id === req.params.teamId
    })

    if (!isUserFromTeam) {
      return res.status(401).json({
        msg: 'Not authorized to perform this action',
      })
    }

    const task = taskUseCases.deleteTask(req.body.id)
    if (!task) {
      res.status(501).json({
        msg: 'Server-side error',
      })
    } else {
      res.status(200).json(task)
    }
  })

module.exports = router
