const boxList = document.querySelectorAll(".box-list");

document.addEventListener("dragstart", (even) => {
    even.target.classList.add("dragging")
});

document.addEventListener("dragend", (even) => {
    even.target.classList.remove("dragging")
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

// const draggables = document.querySelectorAll(".task");
// const droppables = document.querySelectorAll(".swim-lane");

// draggables.forEach((task) => {
//   task.addEventListener("dragstart", () => {
//     task.classList.add("is-dragging");
//   });
//   task.addEventListener("dragend", () => {
//     task.classList.remove("is-dragging");
//   });
// });

// droppables.forEach((zone) => {
//   zone.addEventListener("dragover", (e) => {
//     e.preventDefault();

//     const bottomTask = insertAboveTask(zone, e.clientY);
//     const curTask = document.querySelector(".is-dragging");

//     if (!bottomTask) {
//       zone.appendChild(curTask);
//     } else {
//       zone.insertBefore(curTask, bottomTask);
//     }
//   });
// });

// const insertAboveTask = (zone, mouseY) => {
//   const els = zone.querySelectorAll(".task:not(.is-dragging)");

//   let closestTask = null;
//   let closestOffset = Number.NEGATIVE_INFINITY;

//   els.forEach((task) => {
//     const { top } = task.getBoundingClientRect();

//     const offset = mouseY - top;

//     if (offset < 0 && offset > closestOffset) {
//       closestOffset = offset;
//       closestTask = task;
//     }
//   });

//   return closestTask;
// };