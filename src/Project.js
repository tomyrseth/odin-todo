export class Project {
  
  constructor(name, todo){
    this.id = crypto.randomUUID();
    this.name = name;
    this.todoList = []
    this.TodoClass = todo; // Dependency Injection
  }

  createTodo(title, description, dueDate, priority) {
    const temp_id = crypto.randomUUID();
    const tempTodo = new this.TodoClass(temp_id, title, description, dueDate, priority);

    this.addTodoToList(tempTodo);
    return tempTodo;
  }

  removeTodo(tempTodo) {
    const todo_index = this.todoList.findIndex((element) => element.id === tempTodo.id);
    if (todo_index > -1) {
      this.todoList.splice(todo_index, 1)
      return 1;
    }
    throw console.error('Todo not found ->', tempTodo);
  }

  getTodoList() { return(this.todoList) };

  addTodoToList(tempTodo) {
    this.todoList.push(tempTodo);
    return 1;
  }
}