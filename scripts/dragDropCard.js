function intervalo() {
    const boxContainer = document.querySelectorAll(".box-container");

    const card = document.querySelectorAll(".card");

    card.forEach(() => {
        card.addEventListener("dragstart", (even) => {
            even.target.classList.add("isdragging")
        });
    
        card.addEventListener("dragend", (even) => {
            even.target.classList.remove("isdragging")
        });
    })

    boxContainer.forEach((item2) => {
        item2.addEventListener("dragover", (even) => {
            const dragging2 = document.querySelector(".isdragging");
            const applyAfter2 = getNewPosition(item2, even.clientX);

            if(applyAfter2) {
                applyAfter2.insertAdjacentElement("afterend", dragging2);
            } else {
                item2.prepend(dragging2)
            }
        });
    });

    function getNewPosition(row, posX) {
        const cards = row.querySelectorAll(".card:not(.isdragging)");
        let result;

        for(let refer_card of cards) {
            const box = refer_card.getBoundingClientRect();
            const boxCenterX = box.x + box.width / 2;

            if(posX >= boxCenterX) result = refer_card;
        }

        return result;
    }
}

setInterval(intervalo, 5000)