
import { cartInit } from "../CART/cart.js";
import { menuInit } from "../NAVBAR/menu.js";

const signInForm = document.querySelector(".sign-in");
const inputEmailSignIn = document.getElementById("email")
const inputPasswordSignIn = document.getElementById("password")
const errorMsg = document.querySelector(".error-msg");

const registerForm = document.querySelector(".register");
const inputNameRegister = document.getElementById("name");
const inputLastNameRegister = document.getElementById("last-name");
const inputEmailRegister = document.getElementById("email2");
const inputPasswordRegister = document.getElementById("password2");
const inputPasswordConfirm = document.getElementById("password3");
const registerMsg = document.querySelector(".register-msg")



// FORM VALIDATION

function signIn(e) {

    e.preventDefault();


    console.log("Iniciando sesión");


    validationSignIn();


    signInForm.reset();

}


const validationSignIn = () => {


    if (inputEmailSignIn.value && inputPasswordSignIn.value) {
        errorMsg.innerHTML = "Iniciando sesión...";
        errorMsg.style.color = `black`;
        setTimeout(() => { errorMsg.innerHTML = "" }, 1000);
        return
    }



}





function register(e) {

    e.preventDefault();

    if (inputPasswordConfirm.value !== inputPasswordRegister.value) {
       registerMsg.innerHTML = "Las contraseñas no coinciden.";
       return setTimeout(() => { registerMsg.innerHTML = "" }, 2000)}


    if (inputEmailRegister.value && inputLastNameRegister.value && inputNameRegister.value && inputPasswordRegister.value && inputPasswordConfirm.value && inputPasswordConfirm.value === inputPasswordRegister.value) {
        registerMsg.innerHTML = "Registro exitoso";
        setTimeout(() => { registerMsg.innerHTML = "" }, 2000)
    };




}






const init = () => {
    signInForm.addEventListener("submit", signIn);
    registerForm.addEventListener("submit", register);
    cartInit();
    menuInit();
}
init();