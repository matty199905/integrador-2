
import { addToCart, cartContainer, cartInit, overlay } from "../CART/cart.js";
import { menuContainer, menuInit } from "../NAVBAR/menu.js";
import { productsData } from "../data.js";



const productsContainer = document.querySelector(".products-container");

const genderBtns = document.querySelector(".gender-categories");
const typeBtns = document.querySelector(".container__filter-type");
const colorBtns = document.querySelector(".container__filter-color");
const sizeBtns = document.querySelector(".container__filter-size");
const all = document.querySelector(".todos");

const filtersBtn = document.querySelector(".filters");
export const aside = document.getElementById("aside");
const asideContainer = document.querySelector(".shop__aside");




const appState = {
    filter: null
}



function showfilters () {
aside.classList.toggle("show-aside");

if(aside.classList.contains("show-aside")){
    cartContainer.classList.add("show-cart");
    menuContainer.classList.add("show-menu");
    overlay.classList.add("show-overlay")
    
}
}


function closeAside ({target}) {
    if(!target.classList.contains("category") && !target.classList.contains("todos") ){
        return
    }

    else {return aside.classList.toggle("show-aside")}
}





const createProductData = (product) => {
    return {
        name: product.name,
        image: product.image,
        price: product.price,
       
       
    }
}

const createProductTemplate = (product) => {

    const { image, name,price } = createProductData(product)
   

    return `<div class="card">

        <img class="card__img" src="${image}" alt="${name}">

        <h3 class="card__title">${name}</h3>

        <span class="card__price">Precio: $${price}</span>

        <button class="card__add-to-cart" 
        data-name="${name}"
        data-price="${price}"
        data-image="${image}">Agregar al Carrito</button>

    </div>`
}

const renderProducts = () => {
    productsContainer.innerHTML = productsData.map((product) => createProductTemplate(product)).join("")
}









export function applyFilter({ target }) {
    if (!target.classList.contains("category")) {
        return
    }

    changeFilterState(target)

    productsContainer.innerHTML = ""

    renderFiltered()


}




const changeFilterState = (target) => {
    appState.filter = target.dataset.category
}







const renderFiltered = () => {

    const filteredProducts = productsData.map((product) => { if (product.for == appState.filter || product.type == appState.filter || product.color == appState.filter || product.size.some((size) => size == appState.filter)) { return createRenderFilteredFor(product) } }).join("")

    productsContainer.innerHTML = filteredProducts

}

const createRenderFilteredFor = (product) => {

    const { image, name, price } = createProductData(product)

    return `<div class="card">

        <img class="card__img" src="${image}" alt="${name}">

        <h3 class="card__title">${name}</h3>

        <span class="card__price">Precio: $${price}</span>

        <button class="card__add-to-cart" 
        data-name="${name}"
        data-price="${price}"
        data-image="${image}">Agregar al Carrito</button>

    </div>`

}



function showAll() {
   return renderProducts()
}




export const shopInit = () => {
    renderProducts();
    productsContainer.addEventListener("click", addToCart);
    genderBtns.addEventListener("click", applyFilter);
    typeBtns.addEventListener("click", applyFilter);
    colorBtns.addEventListener("click", applyFilter);
    sizeBtns.addEventListener("click", applyFilter);
    all.addEventListener("click", showAll);
    filtersBtn.addEventListener("click", showfilters);
    asideContainer.addEventListener("click", closeAside)
    cartInit();
    menuInit();
}

shopInit();

