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
  .route('/tasks')
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

module.exports = router
