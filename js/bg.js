const body = document.querySelector(".background"),
    image = document.querySelector(".bgImage"),
    IMG_Number = 5;

function paintImage(){
    const randomNum = Math.floor(Math.random() * IMG_Number);
    body.style.backgroundImage = `url(images/${randomNum + 1}.jpg)`;
    setTimeout(paintImage, 10000);
}

function init(){
    paintImage();
}

init();