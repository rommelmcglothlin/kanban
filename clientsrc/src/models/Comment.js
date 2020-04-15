export class Comment {
  constructor({
    id = "",
    boardId = "",
    listId = "",
    taskId = "",
    note = "",
    creator = {},
    creatorEmail = "",
  } = {}) {
    this.id = id;
    this.note = note;
    this.boardId = boardId;
    this.listId = listId;
    this.taskId = taskId;
    this.creatorEmail = creatorEmail;
    this.creator = creator;
  }
}
