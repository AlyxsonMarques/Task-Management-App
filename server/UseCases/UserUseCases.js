const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const User = require('../Entities/User')

class UserUseCases {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async createUser(email, password) {
    const userEntity = new User(undefined, email, password)
    return this.userRepository.createUser(userEntity)
  }

  async signIn(email, password) {
    const user = await this.userRepository.getUserByEmail(email)
    if (!user || user.password !== password) {
      return { msg: 'Try a different email and password' }
    } else {
      const payload = { id: user.id }
      const options = { expiresIn: '1h' }

      const token = jwt.sign(payload, JWT_SECRET, options)
      return token
    }
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers()
  }

  async getUserById(id) {
    return this.userRepository.getUserById(id)
  }

  async updateUser(id, name, password) {
    const oldUser = new User(id, name, password)

    oldUser.email = name || oldUser.email
    oldUser.password = password || oldUser.password

    return this.userRepository.updateUser(oldUser)
  }

  async deleteUser(id) {
    return this.userRepository.deleteUser(id)
  }
}

module.exports = UserUseCases
