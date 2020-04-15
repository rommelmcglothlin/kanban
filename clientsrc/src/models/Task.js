export class Task {
  constructor({
    id = "",
    listId = "",
    boardId = "",
    name = "",
    description = "",
    creator = {},
    creatorEmail = "",
  } = {}) {
    this.id = id;
    this.listId = listId;
    this.boardId = boardId;
    this.name = name;
    this.description = description;
    this.creatorEmail = creatorEmail;
    this.creator = creator;
  }
}
