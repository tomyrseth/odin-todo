//
// Builds DOM elements
//

import { projectList } from "./AppHandler.js";
export { buildProjectsPage, buildAllTodosInProject, buildSingleTodo, clearContentDiv }

const contentDiv = document.getElementById('content');

function clearContentDiv() { contentDiv.replaceChildren(''); }

function buildProjectsPage(){ //Display all projects and + button
  clearContentDiv();

  //Project Buttons
  projectList.forEach(project => {
    const btn = document.createElement('button');
    btn.dataset.index = projectList.indexOf(project); // give project buttons index data
    btn.id = 'projectBtn'
    btn.innerText = project.name;
    contentDiv.appendChild(btn);
  });

  // Project dialog && form
  const projectDia = document.createElement('dialog');
  projectDia.id = 'projectDia';
  const projectForm = buildProjectForm();
  projectForm.id = 'projectForm';

  //+ Button for projects
  const newProjBtn = document.createElement('button');
  newProjBtn.id = 'newProjectBtn';
  newProjBtn.innerText = '+';

  contentDiv.appendChild(newProjBtn);
  contentDiv.appendChild(projectDia);
  contentDiv.appendChild(projectForm);

  contentDiv.appendChild(projectDia);
  projectDia.appendChild(projectForm);
}

function buildAllTodosInProject(proj) { //Builds all todos in a project

  //Back button
  const backBtn = document.createElement('button');
  backBtn.innerText = '<-';
  backBtn.id = 'backButton';
  contentDiv.appendChild(backBtn);

  //Todo buttons
  const todoList = proj.getTodoList();
  todoList.forEach(todo => {
    const btn = document.createElement('button');
    btn.dataset.projectid = proj.id;
    btn.dataset.todoid = todo.id; // give todo buttons id data
    btn.id = 'todoBtn';
    btn.innerText = todo.title;
    contentDiv.appendChild(btn);
  });

  // Todo dialog && form
  const todoDia = document.createElement('dialog');
  todoDia.id = 'todoDia';
  const todoForm = buildTodoForm();
  todoForm.id = 'todoForm';
  todoForm.dataset.projectid = proj.id;

  //+ Todo button
  const newTodoBtn = document.createElement('button');
  newTodoBtn.id = 'newTodoBtn';
  newTodoBtn.innerText = '+';
  contentDiv.appendChild(newTodoBtn)

  contentDiv.appendChild(todoDia);
  todoDia.appendChild(todoForm);
}

function buildSingleTodo(todo) { 

  //Todo properties hardcode
  const todoProperties = [todo.title, todo.description, todo.dueDate, todo.priority, todo.completed];
  const todoPropNames = ['Title: ', 'Description: ', 'Due Date: ', 'Priority: ', 'Completed: '];

  //Todo Inner div
  const todoPropLength = todoProperties.length;
  const innerDiv = document.createElement('div');
  contentDiv.appendChild(innerDiv);
  innerDiv.id = 'innerDiv';
  
  //Todo Top title
  const mainTitle = document.createElement('h2');
  mainTitle.innerText = 'Todo:';
  innerDiv.appendChild(mainTitle);

  //Todo data
  for (let i = 0; i < todoPropLength; i++) {
    const p1 = document.createElement('p');
    p1.innerText = todoPropNames[i]+todoProperties[i];
    innerDiv.appendChild(p1);
  }

  //Todo Back button
  const backBtn = document.createElement('button');
  backBtn.innerText = '<-';
  backBtn.className = 'backButton';
  //backBtn.addEventListener('click', () => displayTodos(lastClickedProject));
  innerDiv.appendChild(backBtn);
}

function buildProjectForm() {
  const form = document.createElement('form');
  form.id = 'projectForm'

  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'name');
  nameLabel.textContent = 'Name';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameInput.placeholder = 'Project name';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';


  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(submitButton);

  return form;
}

function buildTodoForm() {
  const form = document.createElement('form');
  form.id = 'todoForm';

  // Title Input
  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'title');
  titleLabel.textContent = 'Title';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.placeholder = 'Todo title';

  // Description Input
  const descriptionLabel = document.createElement('label');
  descriptionLabel.setAttribute('for', 'description');
  descriptionLabel.textContent = 'Description';
  const descriptionInput = document.createElement('textarea');
  descriptionInput.name = 'description';
  descriptionInput.placeholder = 'Todo description';

  // Due Date Input
  const dueDateLabel = document.createElement('label');
  dueDateLabel.setAttribute('for', 'dueDate');
  dueDateLabel.textContent = 'Due Date';
  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';
  dueDateInput.name = 'dueDate';

  // Priority Input
  const priorityLabel = document.createElement('label');
  priorityLabel.setAttribute('for', 'priority');
  priorityLabel.textContent = 'Priority';
  const priorityInput = document.createElement('select');
  priorityInput.name = 'priority';
  const priorityOptions = [
    { value: 'low', text: 'Low' },
    { value: 'medium', text: 'Medium' },
    { value: 'high', text: 'High' }
  ];
  priorityOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    priorityInput.appendChild(optionElement);
  });

  // Submit Button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';

  // Append elements to form
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(descriptionLabel);
  form.appendChild(descriptionInput);
  form.appendChild(dueDateLabel);
  form.appendChild(dueDateInput);
  form.appendChild(priorityLabel);
  form.appendChild(priorityInput);
  form.appendChild(submitButton);

  return form;
}
