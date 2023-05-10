const User = require('../Entities/User')

class userRepository {
  constructor(database) {
    this.database = database
  }

  async createUserTable() {
    const resultUserTable = await this.database.query(
      `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY NOT NULL, 
      email VARCHAR(20) NOT NULL, 
      password VARCHAR(20) NOT NULL
     )`
    )

    return resultUserTable
  }

  async createUser(user) {
    const result = await this.database.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [user.email, user.password]
    )

    return new User(
      result.rows[0]?.id,
      result.rows[0]?.email,
      result.rows[0]?.password
    )
  }

  async getAllUsers() {
    const result = await this.database.query('SELECT * FROM users')

    return result.rows.map(
      (user) => new User(user?.id, user?.email, user?.password)
    )
  }

  async getUserById(id) {
    const result = await this.database.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    )

    return new User(
      result.rows[0]?.id,
      result.rows[0]?.email,
      result.rows[0]?.password
    )
  }

  async getUserByEmail(email) {
    const result = await this.database.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    return new User(
      result.rows[0]?.id,
      result.rows[0]?.email,
      result.rows[0]?.password
    )
  }

  async updateUser(user) {
    const result = await this.database.query(
      'UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *',
      [user.email, user.password, user.id]
    )

    return new User(
      result.rows[0]?.id,
      result.rows[0]?.email,
      result.rows[0]?.password
    )
  }

  async deleteUser(id) {
    const result = await this.database.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    )

    return new User(
      result.rows[0]?.id,
      result.rows[0]?.email,
      result.rows[0]?.password
    )
  }
}

module.exports = userRepository
