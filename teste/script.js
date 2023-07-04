const taskContainer = document.querySelector(".task-container");

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

        this.p1 = document.createElement("p");
        this.p1.innerText = this.title;

        this.ul = document.createElement('ul');
        this.ul.classList.add("box-list");

        this.input = document.createElement('input');
        this.input.classList.add("task-title");

        this.button = document.createElement('button');
        this.button.innerText = 'Add';
        this.button.classList.add("add-task-btn");

        // append elements

        this.cardListElement.append(this.p1);
        this.cardListElement.append(this.ul);
        this.cardListElement.append(this.input);
        this.cardListElement.append(this.button);

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

        this.menuContainer = document.createElement("div");
        this.menuContainer.classList.add("menuContainer");

        this.menu = document.createElement("div");
        this.menu.classList.add("menu");

        this.menuTitle = document.createElement("div");
        this.menuTitle.classList.add("menuTitle");

        this.menuDescription = document.createElement("div");
        this.menuDescription.classList.add("menuDescription");

        this.commentsInput = document.createElement("input");
        this.commentsInput.classList.add("commentsInput");
        this.commentsInput.classList.add("comment");
        this.commentsInput.placeholder = "Write a comment...";

        this.commentsButton = document.createElement('button');
        this.commentsButton.classList.add("commentsButton");
        this.commentsButton.classList.add("btn-save");
        this.commentsButton.innerText = "Add";

        this.menuComments = document.createElement("div");
        this.menuComments.classList.add("menuComments");

        // append elements

        taskContainer.append(this.menuContainer)
        
        this.menuContainer.append(this.menu);

        this.menu.append(this.menuTitle);
        this.menu.append(this.menuDescription);
        this.menu.append(this.commentsInput);
        this.menu.append(this.commentsButton);
        this.menu.append(this.menuComments);

        // add click events

        this.menuContainer.addEventListener('click', (event) => {
            console.log(event.target);
            if(event.target.classList.contains("menuContainer")) {
                this.menuContainer.remove();
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
        this.saveButton.innerText = "Save";
        this.saveButton.className = "btn-save";
        this.input.classList.add("comment");

        this.saveButton.addEventListener("click", () => {
            this.text = this.input.value;
            this.card.state[this.property] = this.input.value;
            if(this.property == "text") {
                this.card.p.innerText = this.input.value; // tirar o p para não ter masi erro 
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