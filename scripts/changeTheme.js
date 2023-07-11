
const hideTheme = document.querySelector("#theme-hide");
const btnThemeSelector = document.querySelector(".fa-circle-half-stroke");
const btnCloseNav = document.querySelector(".fa-xmark");

btnThemeSelector.addEventListener("click", () => {
    if(hideTheme.id === "theme-hide") {
        hideTheme.id = "theme-appear"
    } else {
        hideTheme.id = "theme-hide"
    }
});

btnCloseNav.addEventListener("click", () => {
    hideTheme.id = "theme-hide"
})

function changeTheme(theme) {
    const root = document.documentElement;

    switch (theme) {
        case 'claro':
            root.style.setProperty('--main-theme-color', '#fff');
            root.style.setProperty('--second-theme-color', '#d8d8d8');
            root.style.setProperty('--black', '#000');
            root.style.setProperty('--white', '#ededed');
            root.style.setProperty('--grey', '#d8d8d8');
            break;
        case 'escuro':
            root.style.setProperty('--main-theme-color', '#c6c6c6');
            root.style.setProperty('--second-theme-color', '#383838');
            break;
        case 'amarelo':
            root.style.setProperty('--main-theme-color', '#fffed3');
            root.style.setProperty('--second-theme-color', '#f9f33c');
            break;
        case 'vermelho':
            root.style.setProperty('--main-theme-color', '#ffe6e6');
            root.style.setProperty('--second-theme-color', '#ff5151');
            break;
        case 'azul':
            root.style.setProperty('--main-theme-color', '#cde8ff');
            root.style.setProperty('--second-theme-color', '#29adff');
            break;
        default:
            break;
    }
}

const tema1 = document.querySelector('.tema1');
const tema2 = document.querySelector('.tema2');
const tema3 = document.querySelector('.tema3');
const tema4 = document.querySelector('.tema4');
const tema5 = document.querySelector('.tema5');

tema1.addEventListener('click', () => changeTheme('claro'));
tema2.addEventListener('click', () => changeTheme('escuro'));
tema3.addEventListener('click', () => changeTheme('amarelo'));
tema4.addEventListener('click', () => changeTheme('vermelho'));
tema5.addEventListener('click', () => changeTheme('azul'));