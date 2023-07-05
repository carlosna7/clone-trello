const taskContainer = document.querySelector(".box-container");

class CardList {
    constructor(place, title = "") {

        this.place = place;
        this.title = title;
        this.cardArray = [];

        this.render();
    }

    addCard() {
        const text = this.input.value;
        this.cardArray.push(new Card(text, this.ul, this))
    }

    render() {
        this.createCardListElement();
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

        this.ul = document.createElement('ul');
        this.ul.classList.add("box-list");

        this.input = document.createElement('input');
        this.input.placeholder = "Add task..."
        this.input.classList.add("task-title");

        this.button = document.createElement('button');
        this.button.innerText = '+';
        this.button.classList.add("add-task-btn");

        // append elements

        this.spanTitle.append(this.p1);

        this.div0.append(this.input);
        this.div0.append(this.button);
  
        this.cardListElement.append(this.spanTitle);
        this.cardListElement.append(this.ul);
        this.cardListElement.append(this.div0);

        // add click events

        this.button.addEventListener("click", () => {
            if(this.input.value != ""){
                this.addCard.call(this);
                this.input.value = "";
            }
        });
    }
}

class Card {
    constructor(text, place, todoList){

        this.place = place;
        this.todoList = todoList;
        this.state = {
            text: text,
            description: "Click to write a description...",
            comments: []
        }

        this.render();
    }

    render() {

        // create elements

        this.task = document.createElement('li');
        this.task.classList.add("task-box");
        this.task.draggable = true;

        this.p2 = document.createElement('p');
        this.p2.innerText = this.state.text;

        this.deleteButton = document.createElement('button');
        this.deleteButton.innerText = "X";

        // append elements

        this.place.append(this.task);

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
        const i = this.todoList.cardArray.indexOf(this);
        this.todoList.cardArray.splice(i, 1);
    }

    viewMenu() {

        // create elements

        this.modalContainer = document.createElement("div");
        this.modalContainer.classList.add("modalContainer");

        this.menu = document.createElement("div");
        this.menu.classList.add("menu");

        this.menuTitle = document.createElement("div");
        this.menuTitle.classList.add("menuTitle");

        this.menuDescription = document.createElement("div");
        this.menuDescription.classList.add("menuDescription");

        this.modalBtns = document.createElement("div")
        this.modalBtns.classList.add("modal-btns")

        this.commentsInput = document.createElement("input");
        this.commentsInput.classList.add("commentsInput");
        this.commentsInput.classList.add("comment");
        this.commentsInput.placeholder = "Write a comment...";

        this.commentsButton = document.createElement('button');
        this.commentsButton.classList.add("commentsButton");
        this.commentsButton.classList.add("btn-save");
        this.commentsButton.innerText = "+";

        this.menuComments = document.createElement("div");
        this.menuComments.classList.add("menuComments");

        // append elements

        taskContainer.append(this.modalContainer)
        
        this.modalContainer.append(this.menu);

        this.modalBtns.append(this.commentsInput);
        this.modalBtns.append(this.commentsButton);

        this.menu.append(this.menuTitle);
        this.menu.append(this.menuDescription);
        this.menu.append(this.modalBtns)
        this.menu.append(this.menuComments);

        // add click events

        this.modalContainer.addEventListener('click', (event) => {
            console.log(event.target);
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

        this.editDescription = new EditableText(this.state.description, this.menuDescription, this, "description", "textarea");
        this.editTitle = new EditableText(this.state.text, this.menuTitle, this, "text", "input");
        
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

        // append elements

        this.div.append(this.p);

        this.place.append(this.div);

        // add click events
        
        this.p.addEventListener('click', () => {
            this.showEditableTextArea.call(this);
        });
    }

    showEditableTextArea() {
        const oldText = this.text;

        this.input = document.createElement(this.typeOfInput);
        this.saveButton = document.createElement("button");

        this.p.remove();
        this.input.value = oldText;
        this.saveButton.innerText = "Salvar";
        this.saveButton.className = "btn-save";
        this.input.classList.add("comment");

        this.saveButton.addEventListener("click", () => {
            this.text = this.input.value;
            this.card.state[this.property] = this.input.value;
            if(this.property == "text") {
                this.card.p2.innerText = this.input.value; // usar o p2 e não o p no escopo
            }

            this.div.remove();
            this.render();
        });

        function clickSaveButton(evento, objeto){
            if(evento.keyCode === 13 ) {
                // Cancel the default action, if needed
                evento.preventDefault();
                // Trigger the button element with a click
                objeto.saveButton.click();
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
        this.div = document.createElement('div');
        this.div.className = "comment";
        this.div.innerText = this.text;
        
        this.place.append(this.div);
    }
}

// ---------------------------------------------------------------------------

const addTodoListInput = document.querySelector(".card-title");
const addTodoListButton = document.querySelector(".add-card-btn");

addTodoListButton.addEventListener("click", () => {
   if(addTodoListInput.value.trim() != ""){
    new CardList(taskContainer, addTodoListInput.value);
    addTodoListInput.value = "";
   }
});

