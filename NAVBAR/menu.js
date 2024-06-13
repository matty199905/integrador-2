
const menuContainer = document.querySelector(".menu-container")
const toggleMenu = document.querySelector(".toggle-menu")


function showToggleMenu () {
menuContainer.classList.toggle("show-menu")

}


export const menuInit = () => {
toggleMenu.addEventListener("click", showToggleMenu)
}
menuInit();