//
// Some sort of state / event-logic handler
//

import "./styles.css";
import { Project } from "./Project.js";
import { Todo } from "./Todo.js";
import { buildProjectsPage, buildAllTodosInProject, buildSingleTodo, clearContentDiv } from "./DOMBuilder.js";
import { addProjectEventListeners, addTodoEventListeners, addProjectFormEventListener, addTodoFormEventListener } from "./addEventListeners.js";
export { AppHandler }
export const projectList = [];

class AppHandler {
  constructor() {
    document.addEventListener('project:click', (event) => this.handleProjectClick(event));
    document.addEventListener('todo:click', (event) => this.handleTodoClick(event));

    document.addEventListener('addProject:click', (event) => this.handleProjectPlusButtonClick(event));
    document.addEventListener('projectForm:submit', (event) => this.handleSubmitNewProject(event));

    document.addEventListener('addTodo:click', (event) => this.handeTodoPlusButtonClick(event));
    document.addEventListener('todoForm:submit', (event) => this.handleSubmitNewTodo(event));

  }
  handleProjectClick(event) {
    const projectTodoBelongsTo = projectList[event.detail.projectIndex];
    this.refreshTodoPage(projectTodoBelongsTo);
  }
  handleTodoClick(event) {
    const projectTodoBelongsTo = projectList[projectList.findIndex((element) => element.id === event.detail.projectid)];
    clearContentDiv();
    this.buildSingleTodo(event);
  }
  handleProjectPlusButtonClick(event) { //init form
    const modal = document.getElementById('projectDia');
    modal.showModal();
    addProjectFormEventListener();
  }
  handleSubmitNewProject(event){
    const form = event.detail.form;
    const formData = new FormData(form);
    const name = formData.get('name');
    const newProject = new Project(name);
    projectList.push(newProject);
    this.refreshProjectPage();
  }
  handeTodoPlusButtonClick(event) { //init form
    const modal = document.getElementById('todoDia');
    modal.showModal();
    addTodoFormEventListener();
  }
  handleSubmitNewTodo(event) {
    const projectTodoBelongsTo = projectList[projectList.findIndex((element) => element.id === event.detail.projectid)];
    const todoList = projectTodoBelongsTo.getTodoList();
    
    const form = event.detail.form;
    const formData = new FormData(form);
    
    const title = formData.get('title');
    const description = formData.get('description');
    const dueDate = formData.get('dueDate');
    const priority = formData.get('priority');
    const completed = formData.get('completed');
    const newTodo = new Todo(title, description, dueDate, priority);
    todoList.push(newTodo);
    this.refreshTodoPage(projectTodoBelongsTo);
  }
  buildAllTodosInProject(event) {
    const project = projectList[event.detail.projectIndex];
    buildAllTodosInProject(project);
  }
  buildSingleTodo(event) {
    const projectTodoBelongsTo = projectList[projectList.findIndex((element) => element.id === event.detail.projectid)];
    const todoList = projectTodoBelongsTo.getTodoList();
    const todo = todoList[todoList.findIndex((element) => element.id === event.detail.todoid)];
    buildSingleTodo(todo);
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
    const defaultProject = new Project('Default Project', Todo);
    projectList.push(defaultProject);
    buildProjectsPage();
    addProjectEventListeners();
    
    /*
    const defaultProject = new Project('Default Project', Todo);
    const defaultProject2 = new Project('Other', Todo);
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
    */
  }
}
