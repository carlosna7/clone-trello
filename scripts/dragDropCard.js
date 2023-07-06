function funcTeste() {
    const boxContainer = document.querySelectorAll(".box-container");

    const cardd = document.querySelector(".card");

    cardd.forEach((dodo) => {
        dodo.addEventListener("dragstart", (even) => {
            even.target.classList.add("isdragging")
        });
    
        dodo.addEventListener("dragend", (even) => {
            even.target.classList.remove("isdragging")
        });
    })

    boxContainer.forEach((item2) => {
        item2.addEventListener("dragover", (even) => {
            const dragging2 = document.querySelector(".isdragging");
            const applyAfter2 = getNewPosition2(item2, even.clientX);

            if(applyAfter2) {
                applyAfter2.insertAdjacentElement("afterend", dragging2);
            } else {
                item2.prepend(dragging2)
            }
        });
    });

    function getNewPosition2(row, posX) {
        const cards = row.querySelectorAll(".card:not(.isdragging)");
        let result2;

        for(let refer_card of cards) {
            const box2 = refer_card.getBoundingClientRect();
            const boxCenterX = box2.x + box2.width / 2;

            if(posX >= boxCenterX) result2 = refer_card;
        }

        return result2;
    }
}

setInterval(funcTeste, 5000)