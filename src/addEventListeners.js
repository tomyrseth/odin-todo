export { addProjectEventListeners, addTodoEventListeners, addProjectFormEventListener, addTodoFormEventListener }

function addProjectEventListeners() {

    const projectButtons = document.querySelectorAll("#projectBtn");
    projectButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
  
        const projectIndex = e.target.dataset.index;
        const event = new CustomEvent('project:click', { 
          detail: { projectIndex, button: e.target } 
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
