const cover = document.querySelector("#cover");
const pageTurn = document.querySelector("#pageTurn");

const spreadImage = document.querySelector("#spreadImage");
const frontImage = document.querySelector("#frontImage");
const backImage = document.querySelector("#backImage");

/* ==============================
   MÚSICA ETERNA
================================ */

const music = new Audio("eterna-music.mp3");

music.loop = true;
music.volume = 0.18;

const musicButton = document.createElement("button");

musicButton.innerHTML = "🔊";

musicButton.setAttribute("aria-label", "Silenciar música");

musicButton.style.position = "fixed";
musicButton.style.right = "20px";
musicButton.style.bottom = "20px";
musicButton.style.zIndex = "9999";
musicButton.style.width = "42px";
musicButton.style.height = "42px";
musicButton.style.borderRadius = "50%";
musicButton.style.border = "1px solid rgba(255,255,255,0.35)";
musicButton.style.background = "rgba(0,0,0,0.65)";
musicButton.style.color = "#fff";
musicButton.style.fontSize = "18px";
musicButton.style.cursor = "pointer";
musicButton.style.display = "none";

document.body.appendChild(musicButton);

musicButton.addEventListener("click", (event) => {

    event.preventDefault();
    event.stopPropagation();

    if (music.paused) {
        music.play();
        musicButton.innerHTML = "🔊";
    } else {
        music.pause();
        musicButton.innerHTML = "🔇";
    }

});

/* ==============================
   IMÁGENES
================================ */

const currentScene = document.querySelector(".current-scene");
const nextScene = document.querySelector(".next-scene");

const turningPage = document.querySelector(".turning-page");
const turningFront = document.querySelector(".turning-front");
const turningBack = document.querySelector(".turning-back");

const backTurningPage = document.querySelector(".back-turning-page");
const backTurningFront = document.querySelector(".back-turning-front");
const backTurningBack = document.querySelector(".back-turning-back");


/* ==============================
   IMÁGENES
================================ */

const images = [];


for (let i = 1; i <= 27; i++) {
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

    music.play();
    musicButton.style.display = "block";

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

        /* ==============================
       REGRESAR PÁGINA
    ================================= */

    if (event.clientX < middle) {

        if (current <= 0) {
            return;
        }

        isAnimating = true;

        const previous = current - 1;

        frontImage.src = images[current];
        backImage.src = images[previous];
        spreadImage.src = images[previous];

        pageTurn.style.visibility = "visible";

        pageTurn.style.transition = "none";
        pageTurn.style.transform = "rotateY(0deg)";

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                pageTurn.style.transition =
                    "transform 1.55s cubic-bezier(0.25,0.8,0.25,1)";

                pageTurn.style.transform =
                    "rotateY(180deg)";
            });
        });

        setTimeout(() => {

            current = previous;

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