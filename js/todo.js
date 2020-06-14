const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector(".js-toDoInput"),
      pendingList = document.querySelector(".js-pendingList"),
      finishedList = document.querySelector(".js-finishedList");

const Pending_LS = 'Pending';

const Finished_LS = 'Finished';

let Pendings = [];

let Finished = [];

function deleteToDo(event){    
    const btn = event.target;
    const li = btn.parentNode;
    const Pending_CN = "pending";
    if(li.classList.contains(Pending_CN) === true) {
        pendingList.removeChild(li);
        const cleanPendings = Pendings.filter(function (toDo){
            return toDo.id !== parseInt(li.id);
        });
        Pendings = cleanPendings;
        savePendings();
    } else {
        finishedList.removeChild(li);
        const cleanFinished = Finished.filter(function (toDo){
            return toDo.id !== parseInt(li.id);
        });
        Finished = cleanFinished;
        saveFinished();
    }
}

function pushToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    const Pending_CN = "pending";
    const span = li.querySelector("span");
    const text = span.textContent;

    if(li.classList.contains(Pending_CN) === true) {
        pendingList.removeChild(li);
        const cleanPendings = Pendings.filter(function (toDo){
            return toDo.id !== parseInt(li.id);
        });
        Pendings = cleanPendings;
        savePendings();
        paintFinished(text);
    } else {
        finishedList.removeChild(li);
        const cleanFinished = Finished.filter(function (toDo){
            return toDo.id !== parseInt(li.id);
        });
        Finished = cleanFinished;
        saveFinished();
        paintPending(text);
    }
}

function savePendings(){
    localStorage.setItem(Pending_LS, JSON.stringify(Pendings));
}

function saveFinished(){
    localStorage.setItem(Finished_LS, JSON.stringify(Finished));
}

function paintPending(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const pushBtn = document.createElement("button");
    const span = document.createElement("span");
    const newPId = Pendings.length + 1;
    const Pending_CN = "pending";
    delBtn.classList.add("del");
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);
    pushBtn.classList.add("push");
    pushBtn.innerText = ">";
    pushBtn.addEventListener("click", pushToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(pushBtn);
    li.appendChild(span);
    li.id = newPId;
    li.classList.add(Pending_CN);
    pendingList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newPId
    };
    Pendings.push(toDoObj);
    savePendings();
}

function paintFinished(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const backBtn = document.createElement("button");
    const span = document.createElement("span");
    const newFId = Finished.length + 1;
    const Finished_CN = "finished";
    delBtn.classList.add("del");
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);
    backBtn.classList.add("back");
    backBtn.innerText = "<";
    backBtn.addEventListener("click", pushToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    li.appendChild(span);
    li.id = newFId;
    li.classList.add(Finished_CN);
    finishedList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newFId
    };
    Finished.push(toDoObj);
    saveFinished();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    if (currentValue === ''){
    } else{
        paintPending(currentValue);
        toDoInput.value = "";
    };
}

function printPendings(toDo) {
    paintPending(toDo.text);
}

function printFinished(toDo) {
    paintFinished(toDo.text);
}

function loadToDos() {
    const loadedPendings = localStorage.getItem(Pending_LS);
    const loadedFinished = localStorage.getItem(Finished_LS);
    if(loadedPendings !== null){
        const parsedPendings = JSON.parse(loadedPendings);
        parsedPendings.forEach(printPendings);
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(printFinished);
    } else {


    }
}


function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();