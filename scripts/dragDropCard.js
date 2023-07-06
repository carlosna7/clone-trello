function funcTeste() {
    const boxContainer = document.querySelectorAll(".box-container");

    document.addEventListener("dragstart", (even) => {
        even.target.classList.add("dragging")
    });

    document.addEventListener("dragend", (even) => {
        even.target.classList.remove("dragging")
    });

    boxContainer.forEach((item) => {
        item.addEventListener("dragover", (even) => {
            const dragging = document.querySelector(".dragging");
            const applyAfter = getNewPosition(item, even.clientX);

            if(applyAfter) {
                applyAfter.insertAdjacentElement("afterend", dragging);
            } else {
                item.prepend(dragging)
            }
        });
    });

    function getNewPosition(column, posX) {
        const cards = column.querySelectorAll(".task-box:not(.dragging)");
        let result;

        for(let refer_card of cards) {
            const box = refer_card.getBoundingClientRect();
            const boxCenterX = box.x + box.width / 2;

            if(posX >= boxCenterX) result = refer_card;
        }

        return result;
    }
}

setInterval(funcTeste, 5000)