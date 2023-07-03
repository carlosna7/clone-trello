
// Função adicionar task

function addTask(evento1) {

    const parentTask = evento1.target.parentNode;
  
    // titulo da task
  
    const taskTitle = parentTask.querySelector(".task-title").value;
  
    if (taskTitle) {
  
        // criar novo elemento div
  
        const newTask = createTaskElement(taskTitle);
  
        // adicionar tarefa na lista
  
        const randomId1 = Math.floor(Math.random() * 100);
  
        const selectorTask = `#id${randomId1}`
  
        const list = document.querySelector("#id12345");
        list.appendChild(newTask);
  
        // limpar texto
  
        parentTask.querySelector(".task-title").value = "";
    }
  }
  
  function createTaskElement(title) {
  
    const template = `
        <li class="task-box">
            <span class="text">${title}</span>
            <span class="icons">
                <i class="fa-solid fa-pencil"></i>
                <i class="fa-solid fa-trash-can"></i>
            </span>
        </li>
    `;
    const fragment = document.createRange().createContextualFragment(template);
  
    const newTask = fragment.querySelector(".task-box");
  
    // adicionar evento de remover
  
    const removeBtn = newTask.querySelector(".fa-trash-can");
    removeBtn.addEventListener("click", function() {
        removeTask(this);
    });
  
    // adicionar evento completar tarefa
  
    const doneBtn = newTask.querySelector(".fa-pencil");
    doneBtn.addEventListener("click", function() {
        completeTask(this);
    });
  
    return newTask;
  }
  
  // função remover tarefa
  
  function removeTask(task) {
    const taskToRemove = task.closest('.task-box');
    taskToRemove.remove();
  }
  
  // função completar tarefa
  
  function completeTask(task) {
    const taskToComplete = task.closest(".task-box");
    taskToComplete.classList.toggle("done");
  }
  
  // evento adicionar tarefa
  
  const elemPai = document.querySelectorAll(".card");
  
  elemPai.forEach((pai) => {
  
    pai.addEventListener("click", (ev1) => {
        if(ev1.target.getAttribute("id") !== null) {
            ev1.preventDefault();
            addTask(ev1);
        }
    })
  
  });