class Task {
  constructor(
    id,
    title,
    description,
    state,
    creationDate,
    priority,
    team,
    user
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.state = state
    this.creationDate = creationDate
    this.priority = priority
    this.team = team
    this.user = user
  }
}

module.exports = Task
