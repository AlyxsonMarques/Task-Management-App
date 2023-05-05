/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
const Task = require('../Entities/Task')

class taskRepository {
  constructor(database) {
    this.database = database
  }

  async createAllTables() {
    const resultUserTable = await this.database.query(
      `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY NOT NULL, 
      email VARCHAR(20) NOT NULL, 
      password VARCHAR(20) NOT NULL
    )`
    )

    const resultTeamTable = await this.database.query(
      `CREATE TABLE IF NOT EXISTS teams (
      id SERIAL PRIMARY KEY NOT NULL, 
      name VARCHAR(20) NOT NULL, 
      members INTEGER ARRAY NOT NULL, 
      administrators INTEGER ARRAY NOT NULL
    )`
    )

    const resultTaskTable = await this.database.query(
      `CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY NOT NULL, 
      title VARCHAR(20) NOT NULL, 
      description TEXT, 
      state VARCHAR(20) NOT NULL, 
      creationDate DATE DEFAULT CURRENT_DATE NOT NULL, 
      priority VARCHAR(20) NOT NULL, 
      teamId INT, 
      userId INT, 
      CONSTRAINT fk_team FOREIGN KEY(teamId) REFERENCES teams(id) ON DELETE SET NULL, 
      CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES users(id) ON DELETE SET NULL
    )`
    )
    return {
      resultUserTable,
      resultTeamTable,
      resultTaskTable,
    }
  }

  async getAll() {
    const result = await this.database.query('SELECT * FROM tasks')
    const tasks = result.rows.map(
      (task) =>
        new Task(
          task.id,
          task.title,
          task.description,
          task.state,
          task.creationDate,
          task.priority,
          task.team,
          task.user
        )
    )
    return tasks
  }

  async getById(id) {
    const result = await this.database.query(
      'SELECT * FROM tasks WHERE id = $1',
      [id]
    )
    return result.rows[0]
  }

  async create(task) {
    const result = await this.database.query(
      'INSERT INTO tasks (title, description, state, priority, teamId, userId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        task.title,
        task.description,
        task.state,
        task.priority,
        task.team,
        task.user,
      ]
    )
    return new Task(
      result.rows[0].id,
      result.rows[0].title,
      result.rows[0].description,
      result.rows[0].state,
      result.rows[0].creationDate,
      result.rows[0].priority,
      result.rows[0].team,
      result.rows[0].user
    )
  }

  async update(task) {
    const result = await this.database.query(
      'UPDATE tasks SET title = $1, description = $2, state = $3, priority = $4, team = $5, user = $6 WHERE id = $7 RETURNING *',
      [
        task.title,
        task.description,
        task.state,
        task.priority,
        task.team,
        task.user,
        task.id,
      ]
    )
    return result.rows[0]
  }

  async delete(task) {
    const result = await this.database.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [task.id]
    )
    return result.rows[0]
  }
}

module.exports = taskRepository
