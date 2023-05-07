const Team = require('../Entities/Team')

class TeamUseCases {
  constructor(teamRepository) {
    this.teamRepository = teamRepository
  }

  async createTeam(name, members, administrators) {
    const team = new Team(name, members, administrators)
    return this.teamRepository.create(team)
  }

  async getAllTeams() {
    return this.teamRepository.getAllTeams()
  }

  async getTeamById(id) {
    return this.teamRepository.getTeamById(id)
  }

  async updateTeam(id, name, members, administrators) {
    const oldTeam = this.getTeamById(id)

    oldTeam.name = name || oldTeam.name
    oldTeam.members = members || oldTeam.members
    oldTeam.administrators = administrators || oldTeam.administrators

    return this.teamRepository.update(oldTeam)
  }

  async deleteTeam(id) {
    return this.teamRepository.delete(id)
  }
}

module.exports = TeamUseCases
