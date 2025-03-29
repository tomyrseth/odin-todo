//
// Some sort of state / event-logic handler
//

import "./styles.css";
import { buildProjectsPage, buildAllTodosInProject, buildSingleTodo, clearContentDiv } from "./DOMBuilder.js";
import { addProjectEventListeners, addTodoEventListeners, addProjectFormEventListener, addTodoFormEventListener, addSingleTodoEventListeners } from "./addEventListeners.js";
export { AppHandler }
export const projectList = [];

class AppHandler {
  constructor(Project, Todo) {
    this.ProjectClass = Project; //Dependency Injections
    this.TodoClass = Todo;

    document.addEventListener('project:click', (event) => this.projectClick(this.getProjectFromEvent(event)));
    document.addEventListener('todo:click', (event) => this.todoClick(this.getProjectFromEvent(event), event));

    document.addEventListener('addProject:click', (event) => this.projectAddButtonClick(event));
    document.addEventListener('projectForm:submit', (event) => this.submitNewProject(event));

    document.addEventListener('addTodo:click', (event) => this.todoPlusButtonClick(event));
    document.addEventListener('todoForm:submit', (event) => this.submitNewTodo(this.getProjectFromEvent(event), event));

    document.addEventListener('project:delete', (event) => this.projectDelete(this.getProjectFromEvent(event)));
    document.addEventListener('todo:delete', (event) => this.todoDelete(event));

    document.addEventListener('backToProjects:click', (event) => this.backToProjects());
    document.addEventListener('backToTodos:click', (event) => this.backToTodos(event));

    document.addEventListener('todo:toggle', (event) => this.toggleTodo(event));
  }
  getProjectFromEvent(event) {
    const project = projectList[projectList.findIndex((element) => element.id === event.detail.projectid)];
    if (project) return project;
    throw Error('Could not find project from event!');
  }

  toggleTodo(event) {
    const project = this.getProjectTodoBelongsTo(event);
    const todoid = event.detail.todoid;
    const todo = project.todoList.find((element) => element.id === todoid);
    todo.toggleComplete();
    clearContentDiv()
    this.buildSingleTodo(project, event);
  }

  projectClick(project) {
    this.refreshTodoPage(project);
  }
  todoClick(project, event) {
    clearContentDiv();
    this.buildSingleTodo(project, event);
  }
  projectAddButtonClick(event) { //init form
    const modal = document.getElementById('projectDia');
    modal.showModal();
    addProjectFormEventListener();
  }
  submitNewProject(event){
    const form = event.detail.form;
    const formData = new FormData(form);
    const name = formData.get('name');
    const newProject = new this.ProjectClass(name, this.TodoClass);
    projectList.push(newProject);
    this.refreshProjectPage();
  }
  todoPlusButtonClick(event) { //init form
    const modal = document.getElementById('todoDia');
    modal.showModal();
    addTodoFormEventListener();
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

    this.refreshTodoPage(project);
  }
  projectDelete(project) {
    const index = projectList.findIndex((element) => element.id === project.id);
    if (index > -1) { // only splice array when item is found
      projectList.splice(index, 1);
    }
    this.refreshProjectPage();
  }
  todoDelete(event) {
    const project = this.getProjectTodoBelongsTo(event);
    const todoid = event.detail.todoid;
    const todo = project.todoList.find((element) => element.id === todoid);
    project.removeTodo(todo);
    this.refreshTodoPage(project);
  }

  backToProjects() {
    this.refreshProjectPage();
  }
  backToTodos(event) {
    const project = this.getProjectTodoBelongsTo(event);
    this.refreshTodoPage(project);
  }

  getProjectTodoBelongsTo(event){
    for (const project of projectList) {
      const todo = project.todoList.find((todo) => todo.id === event.detail.todoid);
      if (todo) return project;
    }
    throw Error('Could not find project todo belongs to!');
  }

  buildAllTodosInProject(event) {
    const project = projectList[event.detail.projectIndex];
    buildAllTodosInProject(project);
  }
  buildSingleTodo(project, event) {
    const todoList = project.getTodoList();
    const todo = todoList[todoList.findIndex((element) => element.id === event.detail.todoid)];
    buildSingleTodo(todo);
    addSingleTodoEventListeners();
  }
  refreshProjectPage() {
    clearContentDiv();
    buildProjectsPage();
    addProjectEventListeners();
  }
  refreshTodoPage(proj) {
    clearContentDiv();
    buildAllTodosInProject(proj);
    addTodoEventListeners();
  }

  initialize() {
    //const defaultProject = new Project('Default Project', Todo);
    const defaultProject = new this.ProjectClass('Default Project', this.TodoClass);
    const defaultProject2 = new this.ProjectClass('Other', this.TodoClass);
    projectList.push(defaultProject);
    projectList.push(defaultProject2);
  
    const defaultProjectTodos = [
      defaultProject.createTodo('Shopping', 'Buy weekly groceries', 'Thursday', 6),
      defaultProject.createTodo('Laundry', 'Wash and fold clothes', 'Friday', 4),
      defaultProject.createTodo('Home Maintenance', 'Fix kitchen sink leak', 'Saturday', 7),
      defaultProject.createTodo('Fitness', 'Gym workout session', 'Monday', 5),
      defaultProject.createTodo('Work Prep', 'Prepare presentation slides', 'Tuesday', 8),
      defaultProject.createTodo('Car Service', 'Schedule annual maintenance', 'Wednesday', 3),
      defaultProject.createTodo('Garden', 'Prune roses and water plants', 'Thursday', 2),
      defaultProject.createTodo('Meal Prep', 'Cook meals for the week', 'Friday', 6),
      defaultProject.createTodo('Bills', 'Pay monthly utilities', 'Saturday', 7),
      defaultProject.createTodo('Learning', 'Complete online coding course module', 'Sunday', 5)
    ];
    const defaultProject2Todos = [
      defaultProject2.createTodo('Clean Apartment', 'Vacuum and mop floors', 'Friday', 8),
      defaultProject2.createTodo('Organize Closet', 'Sort and donate old clothes', 'Saturday', 6),
      defaultProject2.createTodo('Car Wash', 'Clean interior and exterior', 'Sunday', 4),
      defaultProject2.createTodo('Dentist Appointment', 'Annual check-up', 'Monday', 7),
      defaultProject2.createTodo('Book Club', 'Finish monthly reading', 'Tuesday', 3),
      defaultProject2.createTodo('Electronics Repair', 'Fix laptop screen', 'Wednesday', 5),
      defaultProject2.createTodo('Financial Planning', 'Review monthly budget', 'Thursday', 6),
      defaultProject2.createTodo('Plant Care', 'Repot indoor plants', 'Friday', 2),
      defaultProject2.createTodo('Online Course', 'Complete photography module', 'Saturday', 7),
      defaultProject2.createTodo('Bike Maintenance', 'Service and clean bicycle', 'Sunday', 4)
    ];


    //projectList.push(defaultProject);
    buildProjectsPage();
    addProjectEventListeners();
  }
}
