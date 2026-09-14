const cover = document.querySelector("#cover");
const pageTurn = document.querySelector("#pageTurn");

const spreadImage = document.querySelector("#spreadImage");
const frontImage = document.querySelector("#frontImage");
const backImage = document.querySelector("#backImage");

/* ==============================
   IMÁGENES
================================ */

const images = [];


for (let i = 1; i <= 20; i++) {
    images.push(`../images/libro/pagina-${i}.png`);
}
/* ==============================
   PRECARGAR TODAS LAS ESCENAS
================================ */

images.forEach((src) => {
    const img = new Image();
    img.src = src;
});
/* ==============================
   ESTADO
================================ */

let current = 0;
let bookStarted = false;
let isAnimating = false;

const duration = 1550;

/* ==============================
   ESCENA ACTUAL
================================ */

function showScene(index) {

    spreadImage.src = images[index];

    frontImage.src = images[index];

    if (index < images.length - 1) {
        backImage.src = images[index + 1];
    } else {
        backImage.src = images[index];
    }
}

/* ==============================
   INICIO
================================ */

showScene(current);

pageTurn.style.transform = "rotateY(0deg)";

/* ==============================
   ABRIR LIBRO
================================ */

cover.addEventListener("click", (event) => {

    event.preventDefault();
    event.stopPropagation();

    if (bookStarted) return;

    bookStarted = true;

    cover.style.display = "none";
});

/* ==============================
   PASAR PÁGINA
================================ */

document.addEventListener("click", (event) => {

    if (!bookStarted) return;
    if (isAnimating) return;

    const book = document.querySelector("#book");
    const rect = book.getBoundingClientRect();

    const middle = rect.left + rect.width / 2;

    /* Solo tocar el lado derecho
       para avanzar. */

    if (event.clientX < middle) {
        return;
    }

    if (current >= images.length - 1) {
        return;
    }

    isAnimating = true;

    const next = current + 1;

    /* ==============================
       PREPARAR GIRO
    ============================== */

    frontImage.src = images[current];
    backImage.src = images[next];
    spreadImage.src = images[next];
    pageTurn.style.visibility = "visible";

    pageTurn.style.transition = "none";
    pageTurn.style.transform = "rotateY(0deg)";

    /* ==============================
       COMENZAR GIRO
    ============================== */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            pageTurn.style.transition =
                "transform 1.55s cubic-bezier(0.25, 0.8, 0.25, 1)";

            pageTurn.style.transform =
                "rotateY(-180deg)";
        });
    });

    /* ==============================
       TERMINAR GIRO
    ============================== */

    setTimeout(() => {

    current = next;

    spreadImage.src = images[current];

    frontImage.src = images[current];

    if (current < images.length - 1) {
        backImage.src = images[current + 1];
    } else {
        backImage.src = images[current];
    }

    pageTurn.style.visibility = "hidden";

    pageTurn.style.transition = "none";

    pageTurn.style.transform = "rotateY(0deg)";

    isAnimating = false;

}, duration);

});