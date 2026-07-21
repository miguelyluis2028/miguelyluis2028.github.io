// ==========================
// ETERNA
// The Wedding Experience
// Motor 2.0
// ==========================

// Pantallas
const cover = document.getElementById("cover");
const prologue = document.getElementById("prologue");
const closedBook = document.getElementById("closedBook");
const book = document.getElementById("book");
const backCover = document.getElementById("backCover");

// Controles
const startButton = document.getElementById("startButton");
const closedBook3D = document.getElementById("closedBook3D");

// Libro
const frontImage = document.getElementById("frontImage");
const backImage = document.getElementById("backImage");

// Música
const bgMusic = document.getElementById("bgMusic");

// ==========================
// PÁGINAS
// ==========================

const pages = [];

for (let i = 1; i <= 20; i++) {
    pages.push(`images/libro/pagina-${i}.png`);
}

let currentPage = 0;

// ==========================
// UTILIDADES
// ==========================

function hideAll() {

    cover.classList.remove("active");
    prologue.classList.remove("active");
    closedBook.classList.remove("active");
    book.classList.remove("active");
    backCover.classList.remove("active");

}

function showScreen(screen) {

    hideAll();
    screen.classList.add("active");

}
// ==========================
// PORTADA
// ==========================

startButton.addEventListener("click", async () => {

    try{
        await bgMusic.play();
    }catch(e){}

    cover.style.opacity = "0";

    setTimeout(() => {

        showScreen(prologue);

    },2000);

    setTimeout(() => {

    console.log("Mostrando libro");
    showScreen(closedBook);

},7000);

});
// ==========================
// LIBRO CERRADO
// ==========================

closedBook3D.addEventListener("click", () => {

    closedBook3D.classList.add("opening");

    setTimeout(() => {

        showScreen(book);

        currentPage = 0;

        frontImage.src = pages[currentPage];

        backImage.src = pages[currentPage];

    },1200);

});