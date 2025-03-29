export class Todo {
  constructor(id, title, description, dueDate, priority) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }
  setComplete() {
    this.completed = !this.completed;
    return 1;
  }
}