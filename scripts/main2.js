function addCard(evento2) {

    const parentCard = evento2.target.parentNode
  
    // titulo do card
  
    const cardTitle = parentCard.querySelector(".card-title").value;
  
    if (cardTitle) {
  
        // criar novo elemento div
  
        const newCard = createCardElement(cardTitle);
  
        // adicionar card à coluna
  
        const column = document.querySelector(".task-container");
        column.appendChild(newCard);
  
        // limpar texto
  
        parentCard.querySelector(".card-title").value = "";
    }
  }
  
  function createCardElement(title) {
    
    const randomId2 = Math.floor(Math.random() * 1000000);
  
    const template = `
    <div class="card">
                
        <!-- titulo da coluna e ícones -->
        <span class="title">
            <p class="text2">${title}</p>
            <i class="fa-solid fa-xmark"></i>
        </span>
  
        <!-- tarefas que serão adicionadas -->
        <ul class="box-list" id="id${randomId2}">
            
        </ul>
  
          <div>
            <input class="task-title" type="text" name="addTask" placeholder="Add task...">
            <button class="add-task-btn" id="${randomId2}" type="submit">+</button>
          </div>
  
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
  
  const elPai = document.querySelector(".task-container");
  
  elPai.addEventListener("click", (ev2) => {
    
    if(ev2.target.classList.contains("add-card-btn")) {
        ev2.preventDefault();
        addCard(ev2);
    }
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