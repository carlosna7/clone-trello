function funcTeste() {
    const boxContainer = document.querySelectorAll(".box-container");

    const cardd = document.querySelectorAll(".card");

    cardd.forEach((dodo) => {
        cardd.addEventListener("dragstart", (even) => {
            even.target.classList.add("isdragging")
        });
    
        cardd.addEventListener("dragend", (even) => {
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

setInterval(funcTeste, 5000)