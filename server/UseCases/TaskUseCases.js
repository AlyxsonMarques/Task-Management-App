const Task = require('../Entities/Task')

class TaskUseCases {
  constructor(taskRepository) {
    this.taskRepository = taskRepository
  }

  async createAllTables() {
    return this.taskRepository.createAllTables()
  }

  async getAllTasks() {
    return this.taskRepository.getAll()
  }

  async getTasksByUserId(id) {
    return this.taskRepository.getTasksByUserId(id)
  }

  async getTaskById(id) {
    return this.taskRepository.getTaskById(id)
  }

  async createTask(title, description, state, priority, team, user) {
    const task = new Task(
      undefined,
      title,
      description,
      state,
      priority,
      team,
      user
    )
    return this.taskRepository.createTask(task)
  }

  async updateTask(id, title, description, state, priority, team, user) {
    const task = await this.getTaskById(id)

    task.title = title || task.title
    task.description = description || task.description
    task.state = state || task.state
    task.creationDate = new Date() || task.creationDate
    task.priority = priority || task.priority
    task.team = team || task.team
    task.user = user || task.user

    return this.taskRepository.updateTask(task)
  }

  async deleteTask(id) {
    return this.taskRepository.deleteTask(id)
  }
}

module.exports = TaskUseCases
