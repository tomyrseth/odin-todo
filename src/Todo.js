export class Todo {
  constructor({id = crypto.randomUUID(), title, description, dueDate, priority, parentProjectid, completed = false}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.parentProjectid = parentProjectid;
  }
  toggleComplete() {
    this.completed = !this.completed;
    return 1;
  }
}