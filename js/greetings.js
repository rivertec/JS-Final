const firstForm = document.querySelector(".firstForm"),
    nameForm = document.querySelector(".js-nameForm"),
    nameInput = nameForm.querySelector(".js-nameInput"),
    toDo = document.querySelector(".toDo"),
    greeting = document.querySelector(".js-greetings"),
    userReset = document.querySelector(".userReset");

const USER_LS = "currentUser",
    HIDDEN_CN = "hidden"
    CENTERED_CN = "centered";

function handleReset(event){
    event.preventDefault();
    localStorage.removeItem(USER_LS);
    loadName();
}

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
    nameForm.addEventListener("submit", handleSubmit);
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
        firstForm.classList.add(CENTERED_CN);
        toDo.classList.add(HIDDEN_CN);
        userReset.classList.add(HIDDEN_CN);
        greeting.classList.add(HIDDEN_CN);
    } else {
        paintGreeting(currentUser);
        firstForm.classList.remove(CENTERED_CN);
        toDo.classList.remove(HIDDEN_CN);
        userReset.classList.remove(HIDDEN_CN);
        nameInput.value = '';
        userReset.innerText = `not ${currentUser}?`;
        userReset.addEventListener("click", handleReset);
    }
}

function init(){
    loadName()
}

init();