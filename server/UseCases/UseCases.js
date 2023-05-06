const Task = require('../Entities/Task')

class UseCases {
  constructor(taskRepository) {
    this.taskRepository = taskRepository
  }

  async createAllTables() {
    return await this.taskRepository.createAllTables()
  }

  async getAllTasks() {
    return await this.taskRepository.getAll()
  }

  async getTaskById(id) {
    return await this.taskRepository.getTaskById(id)
  }

  async createTask(title, description, state, priority, team, user) {
    const task = new Task(title, description, state, priority, team, user)
    return await this.taskRepository.create(task)
  }

  async updateTask(newTask) {
    const task = await this.getTaskById(newTask.id)

    task.title = newTask.title || task.title
    task.description = newTask.description || task.description
    task.state = newTask.state || task.state
    task.creationDate = new Date() || task.creationDate
    task.priority = newTask.priority || task.priority
    task.team = newTask.team || task.team
    task.user = newTask.user || task.user

    return await this.taskRepository.updateTask(task)
  }

  async deleteTask(id) {
    return await this.taskRepository.deleteTask(id)
  }
}

module.exports = UseCases
