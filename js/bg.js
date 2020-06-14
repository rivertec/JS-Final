const body = document.querySelector("body"),
    image = document.querySelector(".bgImage"),
    IMG_Number = 5;

function paintImage(){
    const randomNum = Math.floor(Math.random() * IMG_Number);
    image.src = `images/${randomNum + 1}.jpg`;
}

function init(){
    paintImage();
    setInterval(paintImage, 10000);
}

init();