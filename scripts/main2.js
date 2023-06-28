function addCard() {
    // titulo do card
    const cardTitle = document.querySelector(".card-title").value;

    if (cardTitle) {
        // criar novo elemento div
        const newCard = createCardElement(cardTitle);

        // adicionar card à coluna
        const column = document.querySelector("#task_container");
        column.appendChild(newCard);

        // limpar texto
        document.querySelector(".card-title").value = "";
    }
}

function createCardElement(title) {

    const randomId = Math.floor(Math.random() * 1000000);
    
    const template = `
    <div class="card templateCard" id="${randomId}">
                
        <!-- titulo da coluna e ícones -->
        <span class="title">
            <p class="text2">${title}</p>
            <i class="fa-solid fa-xmark"></i>
        </span>

        <!-- tarefas que serão adicionadas -->
        <ul class="box-list" id="box_list-${randomId}">
            
        </ul>


        <input class="task-title" id="task_title-${randomId}" type="text" name="addTask" placeholder="Add task...">
        <button class="add-task-btn" id="add_task_btn-${randomId}" type="submit">+</button>

    </div>  
    `;
    const fragment = document.createRange().createContextualFragment(template);

    const newCard = fragment.querySelector(".card");

    // adicionar evento de remover

    const removeBtn = newCard.querySelector(".fa-xmark");
    removeBtn.addEventListener("click", function() {
        removeCard(this);
    });

    return newCard;
}

function removeCard(card) {
    const cardToRemove = card.closest(".card");
    cardToRemove.remove();
}

const addBtns = document.querySelectorAll(".add-card-btn");

addBtns.forEach(function(addBtn2) {
    addBtn2.addEventListener("click", function(ev) {
        ev.preventDefault();
        addCard();
    });
});




// function addCard() {

//     // titulo do card

//     const cardTitle = document.querySelector("#card_title").value;

//     if(cardTitle) {

//         // clonar template

//         const template2 = document.querySelector(".templateCard");

//         const newCard = template2.cloneNode(true);

//         // adicionar titulo

//         newCard.querySelector(".text2").textContent = cardTitle;

//         // remover cards

//         newCard.classList.remove("templateCard");
//         newCard.classList.remove("hideCard");

//         // adicionar card
        
//         const column = document.querySelector("#task_container");

//         column.appendChild(newCard);

//         // adicionar evento de remover

//         const removeBtn2 = newCard.querySelector("#apagar").addEventListener("click", function() {
//             removeCard(this);
//         });

//         document.querySelector("#card_title").value = "";
//     }
// }

// // função remover tarefa

// function removeCard(card) {

//     const cardToRemove = card.closest(".card");
//     cardToRemove.remove();

// }

// // função adicionar card

// const addBtn2 = document.querySelector("#add_card_btn");

// addBtn2.addEventListener("click", function(ev) {

//     ev.preventDefault();

//     addCard();
// });