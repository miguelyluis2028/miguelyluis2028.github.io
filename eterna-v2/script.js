const screens = {
    cover: document.getElementById("cover"),
    prologue: document.getElementById("prologue"),
    closedBook: document.getElementById("closedBook"),
    book: document.getElementById("book"),
    backCover: document.getElementById("backCover")
};

const music = document.getElementById("bgMusic");
const startButton = document.getElementById("startButton");

const frontImage = document.getElementById("frontImage");
const backImage = document.getElementById("backImage");

const page = document.getElementById("page");
const closedBook = document.getElementById("closedBook3D");

const pages = [];

for (let i = 1; i <= 20; i++) {

    pages.push(
        `images/libro/pagina-${String(i).padStart(2,"0")}.png`
    );

}

let current = 0;

function show(screen){

    Object.values(screens).forEach(s=>s.classList.remove("active"));

    screen.classList.add("active");

}

function loadSpread(){

    frontImage.src = pages[current] || "";

    backImage.src = pages[current+1] || "";

    page.style.transform="rotateY(0deg)";

}
startButton.addEventListener("click", async ()=>{

    try{

        await music.play();

    }catch(e){}

    show(screens.prologue);

    setTimeout(()=>{

        show(screens.closedBook);

    },6000);

});

closedBook.addEventListener("click",()=>{

    current=0;

    loadSpread();

    show(screens.book);

});

page.addEventListener("click",()=>{

    page.style.transform="rotateY(-180deg)";

    setTimeout(()=>{

        current+=2;

        if(current>=pages.length){

            show(screens.backCover);

            return;

        }

        loadSpread();

    },900);

});
function restartExperience(){

    current = 0;

    page.style.transform = "rotateY(0deg)";

    show(screens.cover);

}

backImage.addEventListener("load",()=>{

    page.style.transform="rotateY(0deg)";

});

document.addEventListener("keydown",(e)=>{

    if(!screens.book.classList.contains("active")) return;

    if(e.key==="ArrowRight"){

        page.click();

    }

});

screens.backCover.addEventListener("click",()=>{

    restartExperience();

});

music.addEventListener("ended",()=>{

    music.currentTime = 0;

    music.play();

});