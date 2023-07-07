function funcTest() {
    // const boxList = document.querySelectorAll(".box-list");

    // const taskBox = document.querySelectorAll(".task-box");

    // taskBox.forEach((list) => {
    //     list.addEventListener("dragstart", (event) => {
    //         event.target.classList.add("dragging");
    //     });

    //     list.addEventListener("dragend", (event) => {
    //         event.target.classList.remove("dragging");
    //     });
    // });


    // boxList.forEach((item) => {
    //     item.addEventListener("dragover", (even) => {
    //         const dragging = document.querySelector(".dragging");
    //         const applyAfter = getNewPosition(item, even.clientY);

    //         if(applyAfter) {
    //             applyAfter.insertAdjacentElement("afterend", dragging);
    //         } else {
    //             item.prepend(dragging)
    //         }
    //         even.preventDefault();
    //     });
    // });

    // function getNewPosition(column, posY) {
    //     const cards = column.querySelectorAll(".task-box:not(.dragging)");
    //     let result;

    //     for(let refer_card of cards) {
    //         const box = refer_card.getBoundingClientRect();
    //         const boxCenterY = box.y + box.height / 2;

    //         if(posY >= boxCenterY) result = refer_card;
    //     }

    //     return result;
    // }

    const boxList = document.querySelectorAll(".box-list");
    const taskBox = document.querySelectorAll(".task-box");
    let isDragging = false;
    let draggingElement = null;
    
    taskBox.forEach((list) => {
      list.addEventListener("dragstart", (event) => {
        isDragging = true;
        draggingElement = event.target;
        draggingElement.classList.add("dragging");
      });
    
      list.addEventListener("dragend", () => {
        isDragging = false;
        draggingElement.classList.remove("dragging");
        draggingElement = null;
      });
    });
    
    boxList.forEach((item) => {
      let isProcessingDrag = false;
    
      item.addEventListener("dragenter", (event) => {
        if (!isProcessingDrag && isDragging) {
          isProcessingDrag = true;
          requestAnimationFrame(() => {
            event.preventDefault();
    
            const applyAfter = getNewPosition(item, event.clientY);
    
            if (applyAfter) {
              applyAfter.insertAdjacentElement("afterend", draggingElement);
            } else {
              item.prepend(draggingElement);
            }
    
            isProcessingDrag = false;
          });
        }
      });
    });
    
    function getNewPosition(column, posY) {
      const cards = column.querySelectorAll(".task-box:not(.dragging)");
      let result = null;
    
      for (let i = cards.length - 1; i >= 0; i--) {
        const refer_card = cards[i];
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;
    
        if (posY >= boxCenterY) {
          result = refer_card;
          break;
        }
      }
    
      return result;
    }
}

setInterval(funcTest, 1000)
