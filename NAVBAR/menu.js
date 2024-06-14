import { cartContainer,  cartToggle, overlay } from "../CART/cart.js";




export const menuContainer = document.querySelector(".menu-container")
const toggleMenu = document.querySelector(".toggle-menu")


function showToggleMenu () {
menuContainer.classList.toggle("show-menu");


if(!cartContainer.classList.contains("show-cart")){cartContainer.classList.add("show-cart");
   
}
}


function closeMenu (e) {

    if (!menuContainer.classList.contains("show-menu")){
        menuContainer.classList.add("show-menu")
    }

}



export const menuInit = () => {
toggleMenu.addEventListener("click", showToggleMenu);
cartToggle.addEventListener("click", closeMenu);

}
menuInit();