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

const tema1 = document.querySelector('.tema1');
const tema2 = document.querySelector('.tema2');
const tema3 = document.querySelector('.tema3');
const tema4 = document.querySelector('.tema4');
const tema5 = document.querySelector('.tema5');
const logoLight = document.querySelector("#logoLightHide");
const logoDark = document.querySelector("#logoDark");

tema1.addEventListener('click', () => changeTheme('claro'));
tema2.addEventListener('click', () => changeTheme('escuro'));
tema3.addEventListener('click', () => changeTheme('amarelo'));
tema4.addEventListener('click', () => changeTheme('vermelho'));
tema5.addEventListener('click', () => changeTheme('verde'));

function changeTheme(theme) {
    const root = document.documentElement;

    switch (theme) {
        case 'claro':
            root.style.setProperty('--bg-theme-color', '#fff');
            root.style.setProperty('--main-theme-color', '#afe0ff');
            root.style.setProperty('--black', '#000');
            root.style.setProperty('--white', '#ededed');
            root.style.setProperty('--grey', '#d8d8d8');
            root.style.setProperty('--white-card', '#f7f7f7');
            root.style.setProperty('--font', '#000');
            logoDark.id = "logoDark";
            logoLight.id = "logoLightHide";
            break;
        case 'escuro':
            root.style.setProperty('--bg-theme-color', '#bfbfbf');
            root.style.setProperty('--main-theme-color', '#000');
            root.style.setProperty('--grey', '#777');
            root.style.setProperty('--white-card', '#232323');
            root.style.setProperty('--font', '#efefef');
            logoDark.id = "logoDarkHide";
            logoLight.id = "logoLight";
            break;
        case 'amarelo':
            root.style.setProperty('--bg-theme-color', '#fffed3');
            root.style.setProperty('--main-theme-color', '#f9f33c');
            root.style.setProperty('--black', '#000');
            root.style.setProperty('--white', '#ededed');
            root.style.setProperty('--grey', '#d8d8d8');
            root.style.setProperty('--white-card', '#f7f7f7');
            root.style.setProperty('--font', '#000');
            logoDark.id = "logoDark";
            logoLight.id = "logoLightHide";
            break;
        case 'vermelho':
            root.style.setProperty('--bg-theme-color', '#ffe6e6');
            root.style.setProperty('--main-theme-color', '#ff2d2d');
            root.style.setProperty('--black', '#000');
            root.style.setProperty('--white', '#ededed');
            root.style.setProperty('--grey', '#d8d8d8');
            root.style.setProperty('--white-card', '#fff');
            root.style.setProperty('--font', '#000');
            logoDark.id = "logoDark";
            logoLight.id = "logoLightHide";
            break;
        case 'verde':
            root.style.setProperty('--bg-theme-color', '#ddffe3');
            root.style.setProperty('--main-theme-color', '#00f127');
            root.style.setProperty('--black', '#000');
            root.style.setProperty('--white', '#ededed');
            root.style.setProperty('--grey', '#d8d8d8');
            root.style.setProperty('--white-card', '#fff');
            root.style.setProperty('--font', '#000');
            logoDark.id = "logoDark";
            logoLight.id = "logoLightHide";
            break;
        default:
            break;
    }
}