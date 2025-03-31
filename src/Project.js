export class Project {
  
  constructor({name, todo, id = crypto.randomUUID()}){
    this.id = id;
    this.name = name;
    this.todoList = []
    this.TodoClass = todo; // Dependency Injection
  }

  createTodo(title, description, dueDate, priority) {
    const temp_id = crypto.randomUUID();
    const tempTodo = new this.TodoClass({ title, description, dueDate, priority, parentProjectid: this.id});

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

  buildTodosFromList(list) {
    list.forEach(todo => {
      const newTodo = new this.TodoClass( { id:todo.id ,title: todo.title, description: todo.description, dueDate: todo.dueDate, priority: todo.priority, parentProjectid: todo.parentProjectid, completed: todo.completed });
      this.todoList.push(newTodo);
    });
  }

  getTodoList() { return(this.todoList) };

  addTodoToList(tempTodo) {
    this.todoList.push(tempTodo);
    return 1;
  }
}