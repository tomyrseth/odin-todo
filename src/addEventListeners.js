export { addProjectEventListeners, addTodoEventListeners, addProjectFormEventListener, addTodoFormEventListener, addSingleTodoEventListeners }

function addProjectEventListeners() {

    const projectOpenButtons = document.querySelectorAll("#projectOpenBtn");
    projectOpenButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
  
        const projectid = e.target.dataset.projectid;
        const event = new CustomEvent('project:click', { 
          detail: { projectid, button: e.target } 
        });
        document.dispatchEvent(event);
      });
    });

    const projectDeleteButtons = document.querySelectorAll("#projectDeleteBtn");
    projectDeleteButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
  
        const projectid = e.target.dataset.projectid;
        const event = new CustomEvent('project:delete', { 
          detail: { projectid, button: e.target } 
        });
        document.dispatchEvent(event);
      });
    });
    
    const addProjectButton = document.getElementById('newProjectBtn');
    addProjectButton.addEventListener('click', (e) => {
      const event = new CustomEvent('addProject:click', { 
        detail: {  } 
      });
      document.dispatchEvent(event);
    })
}

function addTodoEventListeners() {
  const todoButtons = document.querySelectorAll("#todoBtn");
  todoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {

      const projectid = e.target.dataset.projectid;
      const todoid = e.target.dataset.todoid;

      const event = new CustomEvent('todo:click', { 
        detail: { projectid, todoid, button: e.target } 
      });
      document.dispatchEvent(event);
    });
  });
  const addTodoButton = document.getElementById('newTodoBtn');
  addTodoButton.addEventListener('click', (e) => {
    const event = new CustomEvent('addTodo:click', { 
      detail: {  } 
    });
    document.dispatchEvent(event);
  })

  const backToProjectsButton = document.getElementById('backToProjectsButton');
  backToProjectsButton.addEventListener('click', (e) => {
    const event = new CustomEvent('backToProjects:click', { 
      detail: {  } 
    });
    document.dispatchEvent(event);
  })


}

function addProjectFormEventListener() {
  const form = document.getElementById('projectForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const event = new CustomEvent('projectForm:submit', { 
      detail: { form: form }
    });
    document.dispatchEvent(event);
  })
}

function addTodoFormEventListener() {
  const form = document.getElementById('todoForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const projectid = e.target.dataset.projectid;
    const event = new CustomEvent('todoForm:submit', { 
      detail: { projectid, form: form }
    });
    document.dispatchEvent(event);
  })
}

function addSingleTodoEventListeners() {
  const backToTodosButton = document.getElementById('backToTodosButton');
  backToTodosButton.addEventListener('click', (e) => {
    const todoid = e.target.dataset.todoid;
    const event = new CustomEvent('backToTodos:click', { 
      detail: { todoid } 
    });
    document.dispatchEvent(event);
  })

  const todoDeleteButton = document.getElementById('todoDeleteButton');
  todoDeleteButton.addEventListener('click', (e) => {
    const todoid = e.target.dataset.todoid;
    const event = new CustomEvent('todo:delete', { 
      detail: { todoid } 
    });
    document.dispatchEvent(event);
  })

  
  const todoToggleButton = document.getElementById('todoToggleButton');
  todoToggleButton.addEventListener('click', (e) => {
    const todoid = e.target.dataset.todoid;
    const event = new CustomEvent('todo:toggle', { 
      detail: { todoid } 
    });
    document.dispatchEvent(event);
  })

}