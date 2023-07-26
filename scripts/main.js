const taskContainer = document.querySelector(".box-container");
const addTodoListInput = document.querySelector(".card-title");
const addTodoListButton = document.querySelector(".add-card-btn");

// var da localStorage (inicia array vazio)
let dataBase = JSON.parse(localStorage.getItem("dataB")) || [];

// recarregar os cards salvos no localStorage
function renderSavedCards() {
    dataBase.forEach((cardData) => {
        if (cardData.title) {
            const cardList = new CardList(taskContainer, cardData.title, cardData.tasks);
        };
    });
};

// executa a função ao carregar a página
window.onload = function() {
    renderSavedCards();
};

// evento de mouse Click criar Card
addTodoListButton.addEventListener("click", () => {
    const textItem = addTodoListInput.value.trim();
    const vazio = "Nome não definido!";

    if (textItem !== "") {
        // Cria o card
        const cardList = new CardList(taskContainer, textItem);

        // Adiciona a tarefa ao banco de dados e salva no localStorage
        dataBase.push({title: textItem, tasks: cardList.taskArray});
        localStorage.setItem("dataB", JSON.stringify(dataBase));

        addTodoListInput.value = "";
    } else {
        // Cria o card (versão para card sem nome)
        const cardList = new CardList(taskContainer, vazio);

        // Adiciona o card ao banco de dados e salva no localStorage
        dataBase.push({title: vazio, tasks: cardList.taskArray});
        localStorage.setItem("dataB", JSON.stringify(dataBase));

        addTodoListInput.value = "";
    }
});

//evento de press Enter criar Card
addTodoListInput.addEventListener("keypress", (eve) => {
    const textItem = addTodoListInput.value.trim();

    if(eve.key === 'Enter' && textItem !== "") {
        eve.preventDefault();
        
        // Cria o card
        const cardList = new CardList(taskContainer, textItem);

        // Adiciona o card ao banco de dados e salva no localStorage
        dataBase.push({title: textItem, tasks: cardList.taskArray});
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
        // cria a task
        const task = new Task(text, this.ul, this);
        // objeto com propriedade da task que vai para o array do Card no localStorage
        this.taskArray.push({
            text: task.state.text,
        });
        // objeto com dados do Card
        const data = {
            title: this.title,
            tasks: this.taskArray
        };
        // verifica se o item armazenado no localStorage tem o mesmo nome do Card
        // item faz referencia ao title no localStorage
        const i = dataBase.findIndex((item) => item.title === this.title);
        if (i > -1) {
            // se o card for encontrado, substituir o i pelo data com os dados da task 
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

        // elementos hmtl

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

        // elementos ligados

        this.spanTitle.append(this.p1);
        this.spanTitle.append(this.iconDelete);

        this.div0.append(this.input);
        this.div0.append(this.button);
  
        this.cardListElement.append(this.spanTitle);
        this.cardListElement.append(this.ul);
        this.cardListElement.append(this.div0);

        // click events

        // criar task
        this.button.addEventListener("click", () => {
            if(this.input.value != ""){
                this.addTask(this.input.value);
                this.input.value = "";
            }
        });

        this.input.addEventListener("keypress", (evv) => {
            if(evv.key === 'Enter') {
                evv.preventDefault();
                if(this.input.value != ""){
                    this.addTask(this.input.value);
                    this.input.value = "";
                }
            }
        });

        // excluir Card
        this.iconDelete.addEventListener("click", () => {
            this.deleteCard(this.title)
        });
    }

    // verifica se existe task dentor do array do Card, se sim exibe eles na tela
    createTasksElement() {
        if(this.taskArray.length === 0) {
            return;
        }

        this.taskArray.forEach((taskData) => {
            const task = new Task(taskData.text, this.ul, this);
        });
    }

    // excluir os dados do Card da localStorage e da tela 
    deleteCard() {
        this.cardListElement.remove();
        const i = dataBase.findIndex((task) => task.title === this.title);
        if(i > -1) {
            dataBase.splice(i, 1);
            localStorage.setItem("dataB", JSON.stringify(dataBase))
        }
    }

    // localiza a task especifica no array e exclui os dados 
    deleteTask(taskText) {
        const taskIndex = this.taskArray.findIndex((task) => task.text === taskText);
        if (taskIndex > -1) {
            this.taskArray.splice(taskIndex, 1);
            this.updateDatabase(); // método para atualizar os dados
        }
    }

    // mesmo trecho do método addTask()
    updateDatabase() {
        const data = {
            title: this.title,
            tasks: this.taskArray
        };
        const i = dataBase.findIndex((item) => item.title === this.title);
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

        // elementos html

        this.task = document.createElement('li');
        this.task.classList.add("task-box");
        this.task.draggable = true;

        this.p2 = document.createElement('p');
        this.p2.innerText = this.state.text;

        this.deleteButton = document.createElement('button');
        this.deleteButton.className = "fa-solid fa-xmark"

        // elementos ligados

        this.task.append(this.p2);
        this.task.append(this.deleteButton);
        
        // click events

        // dentro do if para não abrir o modal ao excluir
        this.task.addEventListener('click', (ev) => {
            if(ev.target != this.deleteButton){
                this.viewMenu.call(this);
            }
        });

        this.deleteButton.addEventListener('click', () => {
            this.deleteTask.call(this);
        });
    }

    // exluir task da tela (ja foi removida do array no metodo dentor do CardList)
    deleteTask() {
        this.task.remove();
        this.todoList.deleteTask(this.state.text);
    }

    // modal
    viewMenu() {

        // elementos html

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

        // eleemntos ligados

        taskContainer.append(this.modalContainer)
        
        this.modalContainer.append(this.modal);

        this.modalBtns.append(this.commentsInput);
        this.modalBtns.append(this.commentsButton);

        this.modal.append(this.modalTitle);
        this.modal.append(this.modalDescription);
        this.modal.append(this.modalBtns)
        this.modal.append(this.menuComments);

        // eventos click

        // fechar modal
        this.modalContainer.addEventListener('click', (event) => {
            if(event.target.classList.contains("modalContainer")) {
                this.modalContainer.remove();
            }
        });
        
        // adicionar comentário mouseClick
        this.commentsButton.addEventListener('click', () => {
            if(this.commentsInput.value != "") {
                this.state.comments.push(this.commentsInput.value);
                this.renderComments();
                this.commentsInput.value = "";
            }
        });

        // adicionar comentário pressEnter
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

        // exibe o titulo do modal
        this.editTitle = new EditableText(this.state.text, this.modalTitle, this, "text", "input");

        // exibe a textarea no modal
        this.editDescription = new EditableText(this.state.description, this.modalDescription, this, "description", "textarea");

        // exibe os comentários no modal
        this.renderComments();
    }

    // metodo de exibição dos comentários ao abrir o modal e ao criar um novo
    renderComments() {

        // seleciona os comentarios do Array comments
        const currentCommentsDOM = Array.from(this.menuComments.childNodes);

        // Sempre que adicionar um novo comentário remove os atuais do array para não duplicalos na exibição
        // Os mesmos serão adicionados novamente enquanto o loop abaixo roda
        currentCommentsDOM.forEach(commentDOM => {
            commentDOM.remove();
        });

        // exibe sempre que abrir o modal
        // quando criado um novo comentário é incluido apenas o ultimo do array (o digitado), pois os anteriores são excluidos pelo loop acima
        this.state.comments.forEach(comment => {
            new Comment(comment, this.menuComments, this);
        });

        // // Verifica se há algum comentário na lista
        // if (this.state.comments.length > 0) {
        //     // Obtém o último comentário da lista
        //     const lastComment = this.state.comments[this.state.comments.length - 1];
            
        //     // Cria uma nova instância da classe "Comment" apenas para o último comentário
        //     new Comment(lastComment, this.menuComments, this);
        // }
        
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

        // elementos criados

        this.div = document.createElement("div");

        this.p = document.createElement("p");
        this.p.innerText = this.text;

        // elementos liagdos

        this.div.append(this.p);

        this.place.append(this.div);

        // eventos click
        
        // evento funciona para o titulo e para a descrição, ao clickar cada um tem um retorno diferente
        this.p.addEventListener('click', () => {
            this.showEditableTextArea.call(this);
        });
    }

    showEditableTextArea() {
        const oldText = this.text; //recebem texto do P

        this.input = document.createElement(this.typeOfInput);
        this.saveButton = document.createElement("button");

        this.p.remove(); // remove o titulo da tela enquanto estamos editando
        this.input.value = oldText; // texto do P igual valor do input

        this.saveButton.innerText = "Salvar";
        this.saveButton.className = "btn-save";

        // evento de click botão "Salvar" (para typeOfInput "textarea")
        this.saveButton.addEventListener("click", () => {
            this.text = this.input.value;
            this.card.state[this.property] = this.input.value;

            // atualiza o nome da Task
            if(this.property == "text") {
                this.card.p2.innerText = this.input.value; 
            }

            this.div.remove();
            this.render();
        });

        // evento salvar título (para typeOfInput "input")
        function clickSaveButton(evento, objeto){
            if(evento.key === 'Enter') {
                // 13 keyCode do Enter
                evento.preventDefault();
                // Muda o titulo pelo evento de click acima
                objeto.saveButton.click();
            }
              
        }

        // salvar input
        this.input.addEventListener("keyup", (e) => {
            if(this.typeOfInput == "input") {
                clickSaveButton(e, this);
            }
        });

        this.div.append(this.input);

        // abrir textarea
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

        // cria elementos

        this.div = document.createElement('div');
        this.div.className = "comment";

        this.p3 = document.createElement("p");
        this.p3.innerText = this.text;

        this.commentDelete = document.createElement("i");
        this.commentDelete.className = "fa-solid fa-xmark";
        
        // elementos ligados

        this.div.append(this.p3);
        this.div.append(this.commentDelete);

        this.place.append(this.div);

        // evento click delete

        this.commentDelete.addEventListener("click", () => {
            this.deleteComment.call(this);
        });
    }

    // remove o comentário do modal e do array onde estava armazenado
    deleteComment() {

        // remove a div do comentário
        this.div.remove();

        // remove o array específico do array
        const i = this.card.state.comments.indexOf(this.text);
        if(i > -1) {
            this.card.state.comments.splice(i, 1)
        }
    }
}