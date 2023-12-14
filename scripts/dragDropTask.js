function dragAndDrop() {

    const boxList = document.querySelectorAll(".box-list");
    const taskBox = document.querySelectorAll(".task-box");

    let isDragging = false;
    let draggingElement = null;

    taskBox.forEach((task) => {
		task.addEventListener("dragstart", (event) => {
			isDragging = true;
			draggingElement = event.target;
			draggingElement.classList.add("dragging");
		})

		task.addEventListener("dragend", (event) => {
			event.preventDefault()

			isDragging = false;

			if(draggingElement) {
				draggingElement.classList.remove("dragging");
			};
			draggingElement = null;
		});
    })

    boxList.forEach((item) => {
		let isProcessingDrag = false;

		item.addEventListener("dragenter", (even) => {
			if (!isProcessingDrag && isDragging) {
				isProcessingDrag = true

				requestAnimationFrame(() => {
					even.preventDefault()

					const applyAfter = getNewPosition(item, even.clientY);

					if (applyAfter) {
						applyAfter.insertAdjacentElement("afterend", draggingElement);
					} else {
						item.prepend(draggingElement);
					}
						isProcessingDrag = false;
						updatePosition();
				});
			}
		});
    })

    function getNewPosition(tasks, posY) {
		const cards = tasks.querySelectorAll(".task-box:not(.dragging)");
		let result = null;

		for(let i = cards.length - 1; i >= 0; i--) {

			const refer_card = cards[i];
			const box = refer_card.getBoundingClientRect();
			const boxCenterY = box.y + box.height / 2;

			if(posY >= boxCenterY) {
				result = refer_card;
				break;
			}
		}

		return result;
    }

	function updatePosition() {
        const cardListElements = document.querySelectorAll(".card");

        cardListElements.forEach((cardElement) => {
            const cardTitle = cardElement.querySelector(".title").textContent;
			
            const cardTasks = Array.from(cardElement.querySelectorAll(".task-box")).map((taskElement) => {
                return { text: taskElement.querySelector("p").textContent };
            });

            const cardIndex = dataBase.findIndex((item) => item.title === cardTitle);
            if (cardIndex > -1) {
                dataBase[cardIndex].tasks = cardTasks;
                localStorage.setItem("dataB", JSON.stringify(dataBase));
            }
        });
    }
}

setInterval(dragAndDrop, 1000)