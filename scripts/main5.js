const taskContainer = document.querySelector(".task-container")

class cardList{
    constructor(place, title = "card list") {

        this.place = place;
        this.title = title;
        this.cardArray = [];

        this.render();
    }

    addCard() {
        const text = this.input.value;
        this.cardArray.push(new Card(text, this.div, this));
    }

    render() {
        this.createCardListElement();
        this.place.append(this.cardListElement);
    }

    createCardListElement() {
         
        // criar card

        this.cardListElement = document.createElement("div")

        this.spanMain = document.createElement("span");
        this.spanMain.classList.add("title");
        this.p1 = document.createElement("p")
        this.p1.innerText = this.title;
        this.p1.classList.add("text2");
        this.i1 = document.createElement("i");
        // this.i1.classList.add("fa-solid fa-xmark")

        this.ulMain = document.createElement("ul");
        this.ulMain.classList.add("box-list");
        // this.li = document.createElement("li");
        // this.li.classList.add("task-box");
        // this.p2 = document.createElement("p");
        // this.p2.classList.add("text");
        // // this.p.innerText = "TEXTO TEXTO TEXTO"
        // this.span2 = document.createElement("span");
        // this.span2.classList.add("icons");
        // this.i2 = document.createElement("i");
        // this.i2.classList.add("fa-solid fa-pencil");
        // this.i3 = document.createElement("i");
        // this.i3.classList.add("fa-solid fa-trash-can");

        this.divMain = document.createElement('div');
        this.input = document.createElement('input');
        this.input.classList.add("task-title");
        this.button = document.createElement('button');
        this.button.classList.add("add-taks-btn");
        this.button.innerText = "+";

        // append elements

        this.cardListElement.append(this.spanMain);
        this.cardListElement.append(this.ulMain);
        this.cardListElement.append(this.divMain);

        this.spanMain.append(this.p1);
        this.spanMain.append(this.i1);

        this.ulMain.append(this.li);
        // this.li.append(this.p2);
        // this.li.append(this.span2);
        // this.span2.append(this.i2);
        // this.span2.append(this.i3);

        this.divMain.append(this.input);
        this.divMain.append(this.button);

        // click event

        this.button.addEventListener("click", () => {
            if(this.input.value != "") {
                this.addCard.call(this);
                this.input.value = "";
            }
        })
    }
}

class Card {
    constructor(text, place, taskList) {

        this.place = place;
        this.taskList = taskList;
        this.state = {
            text: text,
            description: "Click to write a description...",
            comments: []
        }
        this.render();
    }

    render() {
        this.li = document.createElement("li");
        this.li.classList.add("task-box");
        this.li.addEventListener("click", (ev) => {
            if(ev.target != this.deleteButton) {
                this.showMenu.call(this);
            }
        });
        
        this.p2 = document.createElement("p");
        this.p2.classList.add("text");
        this.p2.innerText = this.state.text;

        this.span2 = document.createElement("span");
        this.span2.classList.add("icons");

        this.i3 = document.createElement("i");
        this.i3.classList.add("fa-solid fa-trash-can");
        this.i3.addEventListener("click", () => {
            this.deleteTask.call(this);
        });

        this.li.append(this.p2);
        this.li.append(this.span2);

        this.span2.append(this.i3);

        // this.span2 = document.createElement("span");
        // this.span2.classList.add("icons");
        // this.i2 = document.createElement("i");
        // this.i2.classList.add("fa-solid fa-pencil");
        // this.i3 = document.createElement("i");
        // this.i3.classList.add("fa-solid fa-trash-can");

        // this.li.append(this.p2);
        // this.li.append(this.span2);
        // this.span2.append(this.i2);
        // this.span2.append(this.i3);
    }

    deleteTask() {
        this.li.remove();
        const i = this.taskList.cardArray.indexOf(this);
        this.taskList.cardArray.splice(i, 1);
    }

    // showMenu() {

    //     //Create elements
    //     this.menu = document.createElement("div");
    //     this.menuContainer = document.createElement("div");
    //     this.menuTitle = document.createElement("div");
    //     this.menuDescription = document.createElement("div");
    //     this.commentsInput = document.createElement("input");
    //     this.commentsButton = document.createElement('button');
    //     this.menuComments = document.createElement("div");


    //     //Add class names
    //     this.menu.className = "menu";
    //     this.menuContainer.className = "menuContainer";
    //     this.menuTitle.className = "menuTitle";
    //     this.menuDescription.className = "menuDescription";
    //     this.menuComments.className = "menuComments";
    //     this.commentsInput.className = "commentsInput comment";
    //     this.commentsButton.className = "commentsButton btn-save";

    //     //Add inner Text
    //     this.commentsButton.innerText = "Add";
    //     this.commentsInput.placeholder = "Write a comment...";

    //     //Event listeners
    //     this.menuContainer.addEventListener('click', (e)=>{
    //         console.log(e.target);
    //         if(e.target.classList.contains("menuContainer")){
    //             this.menuContainer.remove();
    //         }
    //     });
        
    //     this.commentsButton.addEventListener('click', ()=>{
    //         if(this.commentsInput.value != ""){
    //         this.state.comments.push(this.commentsInput.value);
    //         this.renderComments();
    //         this.commentsInput.value = "";
    //         }
    //     })

    //     //Append
    //     this.menu.append(this.menuTitle);
    //     this.menu.append(this.menuDescription);
    //     this.menu.append(this.commentsInput);
    //     this.menu.append(this.commentsButton);
    //     this.menu.append(this.menuComments);
    //     this.menuContainer.append(this.menu);
    //     taskContainer.append(this.menuContainer);

    //     this.editableDescription = new EditableText(this.state.description, this.menuDescription, this, "description", "textarea");
    //     this.editableTitle = new EditableText(this.state.text, this.menuTitle, this, "text", "input");
        
    //     this.renderComments();

    // }

    // renderComments(){

    //     let currentCommentsDOM = Array.from(this.menuComments.childNodes);

    //     currentCommentsDOM.forEach(commentDOM =>{
    //         commentDOM.remove();
    //     });

    //     this.state.comments.forEach(comment =>{
    //         new Comment(comment, this.menuComments, this);
    //     });
    // }
}






























// ---------------------------------------

const addTodoListInput = document.querySelector(".card-title");
const addTodoListButton = document.querySelector(".add-card-btn");

addTodoListButton.addEventListener("click", () => {
   if (addTodoListInput.value.trim() != ""){
    new cardList(taskContainer, addTodoListInput.value);
    addTodoListInput.value = "";
   }
});



let todoList1 = new cardList(taskContainer);



todoList1.input.value = "asdasds";
todoList1.addCard();