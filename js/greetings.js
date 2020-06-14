const firstForm = document.querySelector(".firstForm"),
    nameForm = document.querySelector(".js-nameForm"),
    nameInput = nameForm.querySelector(".js-nameInput"),
    toDo = document.querySelector(".toDo"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    HIDDEN_CN = "hidden"
    CENTERED_CN = "centered";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = nameInput.value;
    saveName(currentValue);
    loadName();
}

function askForName(){
    nameForm.classList.remove(HIDDEN_CN);
    nameForm.addEventListener("submit", handleSubmit)
}

function paintGreeting(text){
    greeting.innerText = `Hello ${text}`;
    nameForm.classList.add(HIDDEN_CN);
    greeting.classList.remove(HIDDEN_CN);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);

    if(currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
        firstForm.classList.remove(CENTERED_CN);
        toDo.classList.remove(HIDDEN_CN);
    }
}

function init(){
    loadName()
}

init();