export class Task {
  constructor({ id = "", name = "", creator = {}, creatorEmail = "" } = {}) {
    this.id = id;
    this.name = name;
    this.creatorEmail = creatorEmail;
    this.creator = creator;
  }
}
