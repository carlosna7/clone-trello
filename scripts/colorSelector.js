const colorSelector = document.querySelector("#colorSelector");

colorSelector.addEventListener("change", (e) => {
    document.documentElement.style.setProperty("--main-color", e.target.value);
})