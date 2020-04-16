export class List {
  constructor({
    id = "",
    title = "",
    boardId = "",
    creator = {},
    creatorEmail = "",
  } = {}) {
    this.id = id;
    this.title = title;
    this.boardId = boardId;
    this.creatorEmail = creatorEmail;
    this.creator = creator;
  }
}
