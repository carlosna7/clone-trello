function funcTest() {
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
}

setInterval(funcTest, 15000)