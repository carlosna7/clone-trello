function funcTest() {
    const boxList = document.querySelectorAll(".box-list");

    const taskBox = document.querySelectorAll(".task-box");

    taskBox.forEach((list) => {
        list.addEventListener("dragstart", (event) => {
            event.target.classList.add("dragging");
        });

        list.addEventListener("dragend", (event) => {
            event.target.classList.remove("dragging");
        });
    });


    boxList.forEach((item) => {
        item.addEventListener("dragover", (even) => {
            const dragging = document.querySelector(".dragging");
            const applyAfter = getNewPosition(item, even.clientY);

            if(applyAfter) {
                applyAfter.insertAdjacentElement("afterend", dragging);
            } else {
                item.prepend(dragging)
            }   
        });
    });

    function getNewPosition(column, posY) {
        const cards = column.querySelectorAll(".task-box:not(.dragging)");
        let result;

        for(let refer_card of cards) {
            const box = refer_card.getBoundingClientRect();
            const boxCenterY = box.y + box.height / 2;

            if(posY >= boxCenterY) result = refer_card;
        }

        return result;
    }
}

setInterval(funcTest, 5000)

// function dede() {
//     const boxList = document.querySelectorAll(".box-list");

//     boxList.forEach((item) => {
//         const taskList = item.querySelector(".task-list");

//         taskList.addEventListener("dragstart", (event) => {
//             event.target.classList.add("dragging");
//         });

//         taskList.addEventListener("dragend", (event) => {
//             event.target.classList.remove("dragging");
//         });

//         item.addEventListener("dragover", (event) => {
//             event.preventDefault();
//             const dragging = document.querySelector(".dragging");
//             const applyAfter = getNewPosition(taskList, event.clientY);

//             if (applyAfter) {
//                 applyAfter.insertAdjacentElement("afterend", dragging);
//             } else {
//                 taskList.prepend(dragging);
//             }
//         });
//     });

// function getNewPosition(column, posY) {
//     const cards = column.querySelectorAll(".task-box:not(.dragging)");
//     let result;

//     for (let refer_card of cards) {
//         const box = refer_card.getBoundingClientRect();
//         const boxCenterY = box.y + box.height / 2;

//         if (posY >= boxCenterY) result = refer_card;
//     }

//     return result;
// }


// } setInterval(dede, 5000)