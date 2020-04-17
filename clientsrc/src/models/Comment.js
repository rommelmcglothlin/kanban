export class Comment {
  constructor({
    id = "",
    boardId = "",
    taskId = "",
    note = "",
    creator = {},
    creatorEmail = "",
  } = {}) {
    this.id = id;
    this.note = note;
    this.boardId = boardId;
    this.taskId = taskId;
    this.creatorEmail = creatorEmail;
    this.creator = creator;
  }
}
