const User = require('../Entities/User')

class UserUseCases {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async createUser(name, password) {
    const userEntity = new User(name, password)
    return this.userRepository.createUser(userEntity)
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
