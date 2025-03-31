//
// Some sort of state / event-logic handler
//
import "../styles.css";

export class AppHandler {
  constructor(Project, Todo, EventAttacher, DOMBuilder, LSBuilder) {
    this.ProjectClass = Project; //Dependency Injections
    this.TodoClass = Todo;
    this.LocalStorageBuilder = LSBuilder;

    this.projectList = [];
    this.getFromLocalStorage();

    this.EventAttacher = new EventAttacher();
    this.DOMBuilder = new DOMBuilder(this.projectList);

    //Init app
    this.DOMBuilder.buildProjectsPage();
    this.EventAttacher.addProjectEventListeners();

    //Listen for custom events, do logic
    document.addEventListener('project:click', (event) => this.projectClick(this.getProjectFromEvent(event)));
    document.addEventListener('todo:click', (event) => this.todoClick(this.getProjectFromEvent(event), event));

    document.addEventListener('addProject:click', (event) => this.projectAddButtonClick(event));
    document.addEventListener('projectForm:submit', (event) => this.submitNewProject(event));

    document.addEventListener('addTodo:click', (event) => this.todoPlusButtonClick(event));
    document.addEventListener('todoForm:submit', (event) => this.submitNewTodo(this.getProjectFromEvent(event), event));

    document.addEventListener('project:delete', (event) => this.projectDelete(this.getProjectFromEvent(event)));
    document.addEventListener('todo:delete', (event) => this.todoDelete(this.getProjectFromEvent(event) ,event));

    document.addEventListener('backToProjects:click', () => this.backToProjects());
    document.addEventListener('backToTodos:click', (event) => this.backToTodos(this.getProjectFromEvent(event)));

    document.addEventListener('todo:toggle', (event) => this.todoToggle(this.getProjectFromEvent(event), event));

  }
  getProjectFromEvent(event) {
    const project = this.projectList[this.projectList.findIndex((element) => element.id === event.detail.projectid)];
    if (project) return project;
    throw Error('Could not find project from event!');
  }

  todoToggle(project, event) {
    const todoid = event.detail.todoid;
    const todo = project.todoList.find((element) => element.id === todoid);
    
    todo.toggleComplete();
    this.DOMBuilder.clearContentDiv()
    this.buildSingleTodo(project, event);
    this.setLocalStorage();
  }

  projectClick(project) {
    this.refreshTodoPage(project);
  }
  todoClick(project, event) {
    this.DOMBuilder.clearContentDiv();
    this.buildSingleTodo(project, event);
  }
  projectAddButtonClick(event) { //init form
    const modal = document.getElementById('projectDia');
    modal.showModal();
    this.EventAttacher.addProjectFormEventListeners();
  }
  submitNewProject(event){
    const form = event.detail.form;
    const formData = new FormData(form);
    const name = formData.get('name');
    const newProject = new this.ProjectClass( { name:name, todo:this.TodoClass } );
    this.projectList.push(newProject);
    this.setLocalStorage();
    this.refreshProjectPage();
  }
  todoPlusButtonClick(event) { //init form
    const modal = document.getElementById('todoDia');
    modal.showModal();
    this.EventAttacher.addTodoFormEventListeners();
  }
  submitNewTodo(project, event) {
    const todoList = project.getTodoList();
    
    const form = event.detail.form;
    const formData = new FormData(form);
    
    const title = formData.get('title');
    const description = formData.get('description');
    const dueDate = formData.get('dueDate');
    const priority = formData.get('priority');
    const newTodo = project.createTodo(title, description, dueDate, priority);

    this.setLocalStorage();
    this.refreshTodoPage(project);
  }
  projectDelete(project) {
    const index = this.projectList.findIndex((element) => element.id === project.id);
    if (index > -1) { // only splice array when item is found
      this.projectList.splice(index, 1);
    }
    this.setLocalStorage();
    this.refreshProjectPage();
  }
  todoDelete(project, event) {
    const todoid = event.detail.todoid;
    const todo = project.todoList.find((element) => element.id === todoid);
    project.removeTodo(todo);
    this.setLocalStorage();
    this.refreshTodoPage(project);
  }

  backToProjects() {
    this.refreshProjectPage();
  }
  backToTodos(project) {
    this.refreshTodoPage(project);
  }

  buildAllTodosInProject(event) {
    const project = this.projectList[event.detail.projectIndex];
    this.DOMBuilder.buildAllTodosInProject(project);
  }
  buildSingleTodo(project, event) {
    const todoList = project.getTodoList();
    const todo = todoList[todoList.findIndex((element) => element.id === event.detail.todoid)];
    this.DOMBuilder.buildSingleTodo(todo);
    this.EventAttacher.addSingleTodoEventListeners();
  }
  refreshProjectPage() {
    this.DOMBuilder.clearContentDiv();
    this.DOMBuilder.buildProjectsPage();
    this.EventAttacher.addProjectEventListeners();
  }
  refreshTodoPage(proj) {
    this.DOMBuilder.clearContentDiv();
    this.DOMBuilder.buildAllTodosInProject(proj);
    this.EventAttacher.addTodoEventListeners();
  }

  setLocalStorage() {
    if (this.projectList.length === 0){
      localStorage.clear;
    }
    else if (this.projectList.length > 0) {
      localStorage.setItem('projectList', JSON.stringify(this.projectList));
    }
  }

  getFromLocalStorage() {
    if (localStorage.length != 0) {
      const projectListInStorage = JSON.parse(localStorage.getItem('projectList'));
      
      const objBuilder = new this.LocalStorageBuilder(this.ProjectClass, this.TodoClass, projectListInStorage);
      const updatedProjectList = objBuilder.build();
      updatedProjectList.forEach(project => {
        this.projectList.push(project);
      });
    }
    else if (localStorage.length === 0) {
      //Make default project
      const defaultProject = new this.ProjectClass({name: 'Default Project', todo: this.TodoClass});
      this.projectList.push(defaultProject);
    }
  }
}
