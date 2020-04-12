export class Board {
  constructor({
    id = "",
    name = "",
    description = "",
    creator = {},
    creatorEmail = "",
  } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.creatorEmail = creatorEmail;
    this.creator = creator;
  }
}
