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
    const result = await this.taskRepository.getTaskById(id)

    const task = new Task(
      result.id,
      result.title,
      result.description,
      result.state,
      result.creationDate,
      result.priority,
      result.team,
      result.user
    )

    return task
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

    await this.taskRepository.updateTask(task)
  }

  async deleteTask(taskToDelete) {
    await this.taskRepository.deleteTask(taskToDelete.id)
  }
}

module.exports = UseCases
