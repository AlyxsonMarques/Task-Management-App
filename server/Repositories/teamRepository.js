const Team = require('../Entities/Team')

class teamRepository {
  constructor(database) {
    this.database = database
  }

  async createTeamTable() {
    const resultTeamTable = await this.database.query(
      `CREATE TABLE IF NOT EXISTS teams (
      id SERIAL PRIMARY KEY NOT NULL, 
      name VARCHAR(20) NOT NULL, 
      members INTEGER ARRAY NOT NULL, 
      administrators INTEGER ARRAY NOT NULL
    )`
    )

    return resultTeamTable
  }

  async createTeam(team) {
    const result = await this.database.query(
      `INSERT INTO teams (name, members, administrators) VALUES ($1, $2, $3)`,
      [team.name, team.members, team.administrators]
    )

    return new Team(
      result.rows[0]?.id,
      result.rows[0]?.name,
      result.rows[0]?.members
    )
  }

  async getAllTeams() {
    const result = await this.database.query(`SELECT * FROM teams`)

    return result.rows.map(
      (team) =>
        new Team(team?.id, team?.name, team?.members, team?.administrators)
    )
  }

  async getTeamById(id) {
    const result = await this.database.query(
      `SELECT * FROM teams WHERE id = $1`,
      [id]
    )

    return new Team(
      result.rows[0]?.id,
      result.rows[0]?.name,
      result.rows[0]?.members
    )
  }

  async getTeamsByUserId(id) {
    const result = await this.database.query(
      `SELECT * FROM teams WHERE $1 IN (members, administrators)`,
      [id]
    )

    return result.rows.map(
      (team) =>
        new Team(team?.id, team?.name, team?.members, team?.administrators)
    )
  }

  async updateTeam(team) {
    const result = await this.database.query(
      `UPDATE teams SET name = $1, members = $2, administrators = $3 WHERE id = $4`,
      [team.name, team.members, team.administrators, team.id]
    )

    return new Team(
      result.rows[0]?.id,
      result.rows[0]?.name,
      result.rows[0]?.members
    )
  }

  async deleteTeam(id) {
    const result = await this.database.query(
      `DELETE FROM teams WHERE id = $1 RETURNING *`,
      [id]
    )

    return new Team(
      result.rows[0]?.id,
      result.rows[0]?.name,
      result.rows[0]?.members
    )
  }
}
module.exports = teamRepository
