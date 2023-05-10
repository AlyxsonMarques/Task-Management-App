const jwt = require('jsonwebtoken')

const authenticateJwt = (req, res, next) => {
  try {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.id = decoded.id
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = {
  authenticateJwt,
}
