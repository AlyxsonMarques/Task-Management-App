class Team {
  constructor(id, name, members = [], administrators = []) {
    this.id = id
    this.name = name
    this.members = members
    this.administrators = administrators
  }
}

module.exports = Team
