function funcTest() {
    const boxList = document.querySelectorAll(".box-list");
    const taskBox = document.querySelectorAll(".task-box");
    let isDragging = false;
    let draggingElement = null;

    taskBox.forEach((task) => {
		task.addEventListener("dragstart", (event) => {
			isDragging = true;
			draggingElement = event.target;
			draggingElement.classList.add("dragging");
		});

		task.addEventListener("dragend", (event) => {
			event.preventDefault();
			isDragging = false;
			if(draggingElement) {
				draggingElement.classList.remove("dragging");
			};
			draggingElement = null;
		});
    });

    boxList.forEach((item) => {
		let isProcessingDrag = false;

		item.addEventListener("dragenter", (even) => {
			if (!isProcessingDrag && isDragging) {
				isProcessingDrag = true;
				requestAnimationFrame(() => {
				even.preventDefault();

				const applyAfter = getNewPosition(item, even.clientY);

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
}

setInterval(funcTest, 1000)

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