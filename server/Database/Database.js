/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const { Pool } = require('pg')

class Database {
  constructor(host, port, user, password, database) {
    this.pool = new Pool({
      host,
      port,
      user,
      password,
      database,
    })
  }

  async query(query, values) {
    try {
      const result = await this.pool.query(query, values)
      return result
    } catch (error) {
      console.log('Database.js Level Error')
    }
  }
}
module.exports = Database
