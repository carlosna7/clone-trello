const taskContainer = document.querySelector(".box-container");
const addTodoListInput = document.querySelector(".card-title");
const addTodoListButton = document.querySelector(".add-card-btn");

let dataBase = JSON.parse(localStorage.getItem("dataB")) || [];

function renderSavedCards() {
    if (!Array.isArray(dataBase)) {
        console.error("Invalid dataBase format. Clearing localStorage data.");
        localStorage.removeItem("dataB");
        return;
    }

    dataBase.forEach((taskData) => {
        if (taskData.title && Array.isArray(taskData.tasks)) {
            const cardList = new CardList(taskContainer, taskData.title, taskData.tasks);
        }
    });
}

addTodoListButton.addEventListener("click", () => {
    const title = addTodoListInput.value.trim();
    const vazio = "Nome não definido!";

    if (title !== "") {
        // Cria e adiciona o card na tela
        const cardList = new CardList(taskContainer, title);

        // Adiciona a tarefa ao banco de dados e salva no localStorage
        dataBase.push({title: title, tasks: cardList.taskArray});
        localStorage.setItem("dataB", JSON.stringify(dataBase));

        addTodoListInput.value = "";
    } else {
        // Cria e adiciona o card na tela (versão para card sem nome)
        const cardList = new CardList(taskContainer, vazio);

        // Adiciona a tarefa ao banco de dados e salva no localStorage
        dataBase.push({title: vazio, tasks: cardList.taskArray});
        localStorage.setItem("dataB", JSON.stringify(dataBase));

        addTodoListInput.value = "";
    }
});

window.onload = function() {
    renderSavedCards();
};

addTodoListInput.addEventListener("keypress", (eve) => {
    const textItem = addTodoListInput.value.trim();

    if(eve.key === 'Enter') {
        eve.preventDefault();
        // Cria e adiciona a tarefa na lista
        const cardList = new CardList(taskContainer, textItem);

        // Adiciona a tarefa ao banco de dados e salva no localStorage
        dataBase.push({title: vazio, tasks: cardList.taskArray});
        localStorage.setItem("dataB", JSON.stringify(dataBase));

        addTodoListInput.value = "";        
    } 
});

// ---------------------------------------------------------------------------

class CardList {
    constructor(place, title = "", tasks = []) {

        this.place = place;
        this.title = title;
        this.taskArray = tasks;

        this.render();
    }

    addTask(text) {
        const task = new Task(text, this.ul, this);
        console.log("criei/dupliquei")
        this.taskArray.push({
            text: task.state.text,
            description: task.state.description,
            comments: task.state.comments
        });

        const data = {
            title: this.title,
            tasks: this.taskArray
        };
        const i = dataBase.findIndex(item => item.title === this.title);
        if (i > -1) {
            dataBase[i] = data;
            localStorage.setItem("dataB", JSON.stringify(dataBase));
        }
    }

    render() {
        this.createCardListElement();
        this.createTasksElement();
        this.place.append(this.cardListElement);
    }

    createCardListElement() {

        // create elements

        this.cardListElement = document.createElement('div');
        this.cardListElement.classList.add("card");

        this.spanTitle = document.createElement("span");
        this.spanTitle.classList.add("title");  

        this.div0 = document.createElement("div");

        this.p1 = document.createElement("p");
        this.p1.innerText = this.title;

        this.iconDelete = document.createElement("i");
        this.iconDelete.className = "fa-solid fa-xmark";

        this.ul = document.createElement('ul');
        this.ul.classList.add("box-list");

        this.input = document.createElement('input');
        this.input.placeholder = "Adicionar task..."
        this.input.classList.add("task-title");

        this.button = document.createElement('button');
        this.button.innerText = '+';
        this.button.classList.add("add-task-btn");

        // append elements

        this.spanTitle.append(this.p1);
        this.spanTitle.append(this.iconDelete);

        this.div0.append(this.input);
        this.div0.append(this.button);
  
        this.cardListElement.append(this.spanTitle);
        this.cardListElement.append(this.ul);
        this.cardListElement.append(this.div0);

        // add click events

        this.button.addEventListener("click", () => {
            if(this.input.value != ""){
                this.addTask(this.input.value);
                console.log("Updated dataBase:", dataBase);
                console.log(typeof "Updated dataBase:", dataBase);
                this.input.value = "";
            }
        });

        this.input.addEventListener("keypress", (evv) => {
            if(evv.key === 'Enter') {
                evv.preventDefault();
                if(this.input.value != ""){
                    this.addTask(this.input.value);
                    console.log("Updated dataBase:", dataBase);
                    this.input.value = "";
                }
            }
        });

        this.iconDelete.addEventListener("click", () => {
            this.deleteCard(this.title)
        });
    }

    createTasksElement() {
        if (this.taskArray.length === 0) {
            return;
        }

        this.taskArray.forEach((taskData) => {
            const task = new Task(taskData.text, this.ul, this);
            console.log("atualizei/dupliquei")
            // task.render(); não precisa dar render, se declarar a cosnt a task já é criada;
        });
    }

    deleteCard() {
        this.cardListElement.remove();
        const i = dataBase.findIndex((task) => task.title === this.title);
        if(i > -1) {
            dataBase.splice(i, 1);
            localStorage.setItem("dataB", JSON.stringify(dataBase))
        }
    }

    deleteTask(taskText) {
        const taskIndex = this.taskArray.findIndex((task) => task.text === taskText);
        if (taskIndex > -1) {
            this.taskArray.splice(taskIndex, 1);
            this.updateDatabase();
        }
    }

    updateDatabase() {
        const data = {
            title: this.title,
            tasks: this.taskArray
        };
        const i = dataBase.findIndex(item => item.title === this.title);
        if (i > -1) {
            dataBase[i] = data;
            localStorage.setItem("dataB", JSON.stringify(dataBase));
        }
    }
}

class Task {
    constructor(text, place, todoList){

        this.place = place;
        this.todoList = todoList;
        this.state = {
            text: text,
            description: "Clique aqui para adicionar uma descrição...",
            comments: []
        }

        this.render();
    }

    render() {
        this.createTaskElement();
        this.place.append(this.task)
    }

    createTaskElement() {

        // create elements

        this.task = document.createElement('li');
        this.task.classList.add("task-box");
        this.task.draggable = true;

        this.p2 = document.createElement('p');
        this.p2.innerText = this.state.text;

        this.deleteButton = document.createElement('button');
        this.deleteButton.className = "fa-solid fa-xmark"

        // append elements

        this.task.append(this.p2);
        this.task.append(this.deleteButton);
        
        // add click events

        this.task.addEventListener('click', (ev) => {
            if(ev.target != this.deleteButton){
                this.viewMenu.call(this);
            }
        });

        this.deleteButton.addEventListener('click', () => {
            this.deleteTask.call(this);
        });
    }

    deleteTask() {
        this.task.remove();
        this.todoList.deleteTask(this.state.text);
    }

    viewMenu() {

        // create elements

        this.modalContainer = document.createElement("div");
        this.modalContainer.classList.add("modalContainer");

        this.modal = document.createElement("div");
        this.modal.classList.add("modal");

        this.modalTitle = document.createElement("div");
        this.modalTitle.classList.add("modalTitle");

        this.modalDescription = document.createElement("div");
        this.modalDescription.classList.add("modalDescription");

        this.modalBtns = document.createElement("div")
        this.modalBtns.classList.add("modal-btns")

        this.commentsInput = document.createElement("input");
        this.commentsInput.classList.add("commentsInput");
        this.commentsInput.placeholder = "Escreva um comentário...";

        this.commentsButton = document.createElement('button');
        this.commentsButton.classList.add("commentsButton");
        this.commentsButton.innerText = "+";

        this.menuComments = document.createElement("div");
        this.menuComments.classList.add("menuComments");

        // append elements

        taskContainer.append(this.modalContainer)
        
        this.modalContainer.append(this.modal);

        this.modalBtns.append(this.commentsInput);
        this.modalBtns.append(this.commentsButton);

        this.modal.append(this.modalTitle);
        this.modal.append(this.modalDescription);
        this.modal.append(this.modalBtns)
        this.modal.append(this.menuComments);

        // aad cilck events

        this.modalContainer.addEventListener('click', (event) => {
            if(event.target.classList.contains("modalContainer")) {
                this.modalContainer.remove();
            }
        });
        
        this.commentsButton.addEventListener('click', () => {
            if(this.commentsInput.value != "") {
                this.state.comments.push(this.commentsInput.value);
                this.renderComments();
                this.commentsInput.value = "";
            }
        });

        this.commentsInput.addEventListener("keypress", (e) => {
            if(e.key === 'Enter') {
                e.preventDefault();

                if(this.commentsInput.value != "") {
                    this.state.comments.push(this.commentsInput.value);
                    this.renderComments();
                    this.commentsInput.value = "";
                }
            } 
        })

        this.editDescription = new EditableText(this.state.description, this.modalDescription, this, "description", "textarea");
        this.editTitle = new EditableText(this.state.text, this.modalTitle, this, "text", "input");
        
        this.renderComments();
    }

    renderComments() {

        const currentCommentsDOM = Array.from(this.menuComments.childNodes);

        currentCommentsDOM.forEach(commentDOM => {
            commentDOM.remove();
        });

        this.state.comments.forEach(comment => {
            new Comment(comment, this.menuComments, this);
        });
    }
}

class EditableText {
    constructor(text, place, card, property, typeOfInput) {

        this.text = text;
        this.place = place;
        this.card = card;
        this.property = property;
        this.typeOfInput = typeOfInput;

        this.render();
    }

    render() {

        // create elements

        this.div = document.createElement("div");

        this.p = document.createElement("p");
        this.p.innerText = this.text;
        this.p.classList.add("testeteste")

        // append elements

        this.div.append(this.p);

        this.place.append(this.div);

        // add click events
        
        this.p.addEventListener('click', () => {
            this.showEditableTextArea.call(this);
            console.log("Abriu o titulo")
        });
    }

    showEditableTextArea() {
        const oldText = this.text; //recebem texto do P

        this.input = document.createElement(this.typeOfInput);
        this.saveButton = document.createElement("button");

        this.p.remove();
        this.input.value = oldText; // texto do P igual valor do input

        this.saveButton.innerText = "Salvar";
        this.saveButton.className = "btn-save";

        this.saveButton.addEventListener("click", () => {
            this.text = this.input.value;
            this.card.state[this.property] = this.input.value;
            if(this.property == "text") {
                this.card.p2.innerText = this.input.value; // usar o p2 e não o p no escopo
            }

            this.div.remove();
            this.render();

            this.updateCard()
        });

        function clickSaveButton(evento, objeto){
            if(evento.key === 'Enter') {
                // 13 keyCode do Enter
                evento.preventDefault();
                // Salva o titulo alterado ao clickar no Enter
                objeto.saveButton.click();
                console.log("Salvou o titulo")
            }
              
        }

        this.input.addEventListener("keyup", (e) => {
            if(this.typeOfInput == "input") {
                clickSaveButton(e, this);
            }
        });

        this.div.append(this.input);

        if(this.typeOfInput == "textarea") {
            this.div.append(this.saveButton)
            console.log("Abriu descrição")
        };

        this.input.select();
    }
}

class Comment{
    constructor(text, place, card){
        this.text = text;
        this.place = place;
        this.card = card;

        this.render();
    }

    render(){

        // cria elementos

        this.div = document.createElement('div');
        this.div.className = "comment";

        this.p3 = document.createElement("p");
        this.p3.innerText = this.text;

        this.commentDelete = document.createElement("i");
        this.commentDelete.className = "fa-solid fa-xmark";
        
        this.div.append(this.p3);
        this.div.append(this.commentDelete);

        this.place.append(this.div);

        this.commentDelete.addEventListener("click", () => {
            this.deleteComment.call(this);
        });
    }

    deleteComment() {
        this.div.remove();
        const i = this.card.state.comments.indexOf(this.text);
        if(i > -1) {
            this.card.state.comments.splice(i, 1)
        }
    }
}