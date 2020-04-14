export class Task {
  constructor({
    id = "",
    listId = "",
    name = "",
    description = "",
    creator = {},
    creatorEmail = "",
  } = {}) {
    this.id = id;
    this.listId = listId;
    this.name = name;
    this.description = description;
    this.creatorEmail = creatorEmail;
    this.creator = creator;
  }
}
