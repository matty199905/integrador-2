import { cartInit } from "../CART/cart.js";
import { addToCart } from "./CART/cart.js";
import { productsData } from "./data.js";

const carrouselContainer = document.querySelector(
  ".carrousel__products-container"
);
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const form = document.querySelector(".form");
const infoMsg = document.querySelector(".info-msg");

// CARROUSEL


const carrouselProductsData = productsData.filter((product) => {

    return product.new===true;
  
});


const carrouselRender = () => {
  carrouselContainer.innerHTML = carrouselProductsData.map((product)=>createProductTemplate(product)).join("")
};


const createProductTemplate = (product) => {
  const { image, name, price } = product;

  return `<div class="card">

        <img class="card__img" src="${image}" alt="${name}">

        <h3 class="card__title">${name}</h3>

        <div class="price-container">
        <span class="card__price">Precio: $${price}</span>
        
        </div>

        <button class="card__add-to-cart" 
        data-name="${name}"
        data-price="${price}"
        data-image="${image}">Agregar al Carrito</button>

    </div>`;
};






let posicionActual = 0;
let posicionSiguiente = 1;


const moveRight = () => {
  if ( posicionActual >= 4) {
    return;
  } else {
    posicionActual += posicionSiguiente;
    carrouselContainer.style.transform = `translateX(${posicionActual * -66}vw)`;
  }
};

const moveLeft = () => {
  if (posicionActual <= 0) {
    return
  } else {
    posicionActual -= posicionSiguiente;
    carrouselContainer.style.transform = `translateX(${posicionActual * -69}%)`;
  }
};

// EMAIL FORM

function submitEmail(e) {
  e.preventDefault();

  console.log("Enviando info al Email...");

  infoMsg.innerHTML =
    "Enviando info al Email. Recuerde revisar su bandeja de SPAM";
  setTimeout(() => {
    infoMsg.innerHTML = "";
  }, 2000);

  form.reset();
}

const init = () => {
  carrouselContainer.addEventListener("DOMContentLoaded", carrouselRender());
  carrouselContainer.addEventListener("click", addToCart);
  next.addEventListener("click", moveRight);
  prev.addEventListener("click", moveLeft);
  form.addEventListener("submit", submitEmail);
  cartInit();
};
init();
