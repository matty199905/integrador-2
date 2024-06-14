





export const cartToggle = document.querySelector(".cart-icon");
export const cartContainer = document.querySelector(".cart__container");
export const overlay = document.querySelector(".cart__overlay");



const cartProductsContainer = document.querySelector(".cart__products-container");
const cartTotal = document.querySelector(".cart__total");
const btnBuy = document.querySelector(".btn__buy");
const btnDelete = document.querySelector(".btn__delete-all");
const succesMsgContainer = document.querySelector(".add-msg__container")
const succesMsg = document.querySelector(".add-msg");
const totalBubble = document.querySelector(".bubble")





function openCart(e) {
    e.preventDefault();

    cartContainer.classList.toggle("show-cart");
    overlay.classList.toggle("show-overlay");

}

function closeAll() {
    cartContainer.classList.add("show-cart");
    overlay.classList.add("show-overlay");
   

    
}










let cart = JSON.parse(localStorage.getItem("productos")) || []

const saveCart = () => { localStorage.setItem("productos", JSON.stringify(cart)) }








export function addToCart({ target }) {

    if (!target.classList.contains("card__add-to-cart")) { return }

    const product = createCartProductData(target.dataset);


    if (existingProduct(product)) {
        updateQuantity(product);
        showMsg("Se ha Añadido +1 con Éxito al Carrito")
    }

    else {
        createProduct(product);
        showMsg("Se ha Agregado con Éxito al Carrito")
    }

    cartState(product);

}








const createCartProductData = (product) => {
    const { name, price, image } = product
    return { name, price, image };
}


const createCartProduct = (product) => {

    const { name, quantity, image, price } = product
    


    return `<div class="cart__product">

     <div class="cart__product-info">
         <h3 class="cart__product-title">${name}</h3>
         <span class="cart__product-price">$${price}</span>
     </div>

     <span class="cart__product-quantity">
     Cantidad:${quantity} </span>

     <img class="cart__img-product" src="${image}" alt="${name}">

 </div> `
}


const renderCartProduct = () => {
    if (!cart.length) {
        cartProductsContainer.innerHTML =
            `<div class="cart__empty-msg"> 
    <span class="cart__span">El carrito está vacío.</span> 
    </div> 
   <div class="separate__container">
    <div class="cart__separate"></div> 
</div>  `}

    else { cartProductsContainer.innerHTML = cart.map((product) => createCartProduct(product)).join("") }
}








const createProduct = (product) => {
    return cart = [...cart, { ...product, quantity: 1 }]
}


const existingProduct = (product) => {

    return cart.find((item) => item.name == product.name)
}

const updateQuantity = (product) => {
    cart = cart.map((item) => item.name === product.name ? { ...product, quantity: item.quantity + 1 } : item)
}


const showMsg = (msg) => {
    succesMsg.textContent = msg;
    succesMsgContainer.classList.add("show")
    setTimeout(() => succesMsgContainer.classList.remove("show"), 1500)
}




const cartState = (product) => {

    saveCart();
    renderCartProduct(product);
    disableBtn(btnBuy);
    disableBtn(btnDelete);
    total();
    showTotalBubble()
}




const disableBtn = (btn) => {

    if (!cart.length) {
        btn.classList.add("disable-btn");
        return
    }
    else { btn.classList.remove("disable-btn") }
}


const total = () => {
    cartTotal.textContent = `Total: $${totalResult()}`
}

const totalResult = () => {
    return cart.reduce((acc, cur) => acc + cur.quantity * Number(cur.price), 0)
}


const showTotalBubble = () => {
    totalBubble.textContent = `${bubbleResult()}`
}
const bubbleResult = () => {
    return cart.reduce((acc, cur) => acc + cur.quantity, 0)
}




const deleteAll = () => {
    if (cart.length && window.confirm("¿Desea eliminar todos los Productos del Carrito?")) {
        cart = []
    }

    cartState();

}

const buyAll = () => {
    if (cart.length && window.confirm("¿Desea Comprar todos los Productos del Carrito?")) {
        cart = []
    }

    cartState();

}




export const cartInit = () => {

    cartToggle.addEventListener("click", openCart);
    overlay.addEventListener("click", closeAll);
    document.addEventListener("DOMContentLoaded", renderCartProduct());
    btnDelete.addEventListener("click", deleteAll);
    btnBuy.addEventListener("click", buyAll)
    disableBtn(btnBuy);
    disableBtn(btnDelete);
    document.addEventListener("DOMContentLoaded", total);
    document.addEventListener("DOMContentLoaded", showTotalBubble);


}
cartInit();