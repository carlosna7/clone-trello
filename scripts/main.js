// Função adicionar task

function addTask(evento1) {

    const parentTask = evento1.target.parentNode;

    // titulo da task

    const taskTitle = parentTask.querySelector(".task-title").value;

    if (taskTitle) {

        // criar novo elemento div

        const newTask = createTaskElement(taskTitle);

        // adicionar tarefa na lista

        const list = document.querySelector(".testes");
        list.appendChild(newTask);

        // limpar texto

        parentTask.querySelector(".task-title").value = "";
    }
}

function createTaskElement(title) {

    const randomId = Math.floor(Math.random() * 1000000);

    const template = `
        <li class="task-box" id="${randomId}">
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

// const elemPai = document.querySelector(".task-container");

// elemPai.addEventListener("click", (ev1) => {
    
//     if(ev1.target.classList.contains("add-task-btn")) {
//         ev1.preventDefault();
//         addTask(ev1);
//     }
// })

const elemPai = document.querySelectorAll(".card");

elemPai.forEach((pai) => {

    pai.addEventListener("click", (ev1) => {
        if(ev1.target.getAttribute("id") === String(id12345) ) {
            ev1.preventDefault();
            addTask(ev1);
        }
    })

});


// funcção adicionar task

// function addTask() {

//     // titulo da task

//     const taskTitle = document.querySelector("#task_title").value;

//     if(taskTitle) {

//         // clonar template

//         const template = document.querySelector(".templateLi");

//         const newTask = template.cloneNode(true);

//         // adiconar titulo

//         newTask.querySelector(".text").textContent = taskTitle;

//         // remover templates desnecessárias

//         newTask.classList.remove("templateLi");
//         newTask.classList.remove("hideTask");

//         // adicionar tarefa na lista

//         const list = document.querySelector("#box_list");

//         list.appendChild(newTask);

//         // adicionar o evento de remover

//         const removeBtn = newTask.querySelector("#remove_btn").addEventListener("click", function() {
//             removeTask(this);
//         });

//         // adicionar evento completar tarefa

//         const doneBtn = newTask.querySelector("#done_btn").addEventListener("click", function() {
//             completeTask(this);
//         });

//         // limpar texto

//         document.querySelector("#task_title").value = "";

//     }
// }

// // função remover tarefa

// function removeTask(task) {
//     const taskToRemove = task.closest('.task-box');
//     taskToRemove.remove();
// }  

// // função completar tarefa

// function completeTask(task) {

//     const taskToComplete = task.closest(".task-box");

//     taskToComplete.classList.toggle("done");

// }

// // evento adicionar tarefa

// const addBtn = document.querySelector("#add_task_btn");

// addBtn.addEventListener("click", function(e) {

//     console.log("teste")

//     e.preventDefault();

//     addTask();

// });