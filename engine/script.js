const cover = document.querySelector("#cover");

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

for (let i = 1; i <= 20; i++) {
    images.push(`../images/libro/pagina-${i}.png`);
}
/* ==============================
   PRECARGAR TODAS LAS IMÁGENES
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
   CAPAS DEL LIBRO
================================ */

/*
   Una capa es la escena que estamos viendo.
   La otra queda preparada debajo.

   Después de cada giro intercambiamos
   sus papeles.
*/

let activeScene = currentScene;
let hiddenScene = nextScene;


/* ==============================
   IMÁGENES DE LAS CAPAS
================================ */

const activeImage =
    activeScene.querySelector("img");

const hiddenImage =
    hiddenScene.querySelector("img");


/* ==============================
   IMÁGENES DE LAS HOJAS
================================ */

const turningFrontImage =
    turningFront.querySelector("img");

const turningBackImage =
    turningBack.querySelector("img");

const backTurningFrontImage =
    backTurningFront.querySelector("img");

const backTurningBackImage =
    backTurningBack.querySelector("img");


/* ==============================
   PREPARAR ESCENA
================================ */

function prepareScenes() {

    /*
       La capa activa muestra la página actual.
    */

    activeScene.querySelector("img").src =
        images[current];


    /*
       La capa escondida queda preparada
       para la próxima página.
    */

    if (current < images.length - 1) {

        hiddenScene.querySelector("img").src =
            images[current + 1];

    } else {

        hiddenScene.querySelector("img").src =
            images[current];
    }


    /*
       La escena activa siempre está arriba.
    */

    activeScene.style.zIndex = "1";
    hiddenScene.style.zIndex = "0";
}


/* ==============================
   REINICIAR HOJA HACIA ADELANTE
================================ */

function resetForwardPage() {

    turningPage.style.transition = "none";
    turningPage.style.transform = "rotateY(0deg)";
    turningPage.style.visibility = "hidden";
}


/* ==============================
   REINICIAR HOJA HACIA ATRÁS
================================ */

function resetBackPage() {

    backTurningPage.style.transition = "none";
    backTurningPage.style.transform = "rotateY(0deg)";
    backTurningPage.style.visibility = "hidden";
}


/* ==============================
   ESTADO INICIAL
================================ */

prepareScenes();

resetForwardPage();
resetBackPage();


/* ==============================
   ABRIR PORTADA
================================ */

cover.addEventListener("click", (event) => {

    event.preventDefault();
    event.stopPropagation();

    if (bookStarted) return;

    bookStarted = true;

    cover.style.display = "none";
});


/* ==============================
   CONTROL DEL LIBRO
================================ */

document.addEventListener("click", async (event) => {

    event.preventDefault();

    if (!bookStarted) return;
    if (isAnimating) return;


    /*
       Mitad derecha = avanzar.
       Mitad izquierda = regresar.
    */

    const screenMiddle =
        window.innerWidth / 2;

    const goingForward =
        event.clientX >= screenMiddle;


    /* ==============================
       AVANZAR
    ============================== */

    if (goingForward) {

    if (current >= images.length - 1) {
        return;
    }

    isAnimating = true;

    const next = current + 1;

    /* ==============================
       PREPARAR Y DECODIFICAR
       LA FOTO SIGUIENTE
    ============================== */

    const nextPhoto =
        hiddenScene.querySelector("img");

    nextPhoto.src =
        images[next];

    if (nextPhoto.decode) {
        await nextPhoto.decode();
    }
    /* ==============================
       PREPARAR LA HOJA
    ============================== */

    turningFrontImage.src =
        images[current];

    turningBackImage.src =
        images[next];

    backTurningPage.style.visibility =
        "hidden";

    turningPage.style.visibility =
        "visible";

    turningPage.style.transition =
        "none";

    turningPage.style.transform =
        "rotateY(0deg)";


    /* ==============================
       COMENZAR EL GIRO
    ============================== */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            turningPage.style.transition =
                "transform 1.55s cubic-bezier(0.25, 0.8, 0.25, 1)";

            turningPage.style.transform =
                "rotateY(-180deg)";
        });
    });


    /* ==============================
   CAMBIO DE ESCENA
   INMEDIATO
================================ */

current = next;

/*
   La página siguiente ya estaba
   preparada debajo de la hoja.
   Ahora pasa a ser la escena activa.
*/

const oldActive = activeScene;

activeScene = hiddenScene;
hiddenScene = oldActive;

activeScene.style.zIndex = "1";
hiddenScene.style.zIndex = "0";

/*
   Preparamos inmediatamente
   la próxima imagen.
*/

if (current < images.length - 1) {

    hiddenScene.querySelector("img").src =
        images[current + 1];

} else {

    hiddenScene.querySelector("img").src =
        images[current];
}


    /* ==============================
       TERMINAR EL GIRO
    ============================== */

    setTimeout(() => {

        turningPage.style.visibility =
            "hidden";

        resetForwardPage();

        isAnimating = false;

    }, duration);

    return;
}

    /* ==============================
       REGRESAR
    ============================== */

    if (current <= 0) {
        return;
    }

    isAnimating = true;

    const previous = current - 1;


    /*
       La hoja que regresa muestra
       la página actual por delante
       y la anterior por detrás.
    */

    backTurningFrontImage.src =
        images[current];

    backTurningBackImage.src =
        images[previous];


    /*
       La capa escondida será la página
       anterior.
    */

    hiddenScene.querySelector("img").src =
        images[previous];


    /*
       Mostramos la hoja de regreso.
    */

    backTurningPage.style.visibility =
        "visible";

    backTurningPage.style.transition =
        "none";

    backTurningPage.style.transform =
        "rotateY(180deg)";


    /*
       Dejamos que el navegador registre
       la posición inicial.
    */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            backTurningPage.style.transition =
                "transform 1.55s cubic-bezier(0.25, 0.8, 0.25, 1)";

            backTurningPage.style.transform =
                "rotateY(0deg)";
        });
    });


    /*
       Cuando termina el regreso:
       la página anterior se convierte
       en la nueva escena activa.
    */

    setTimeout(() => {

        current = previous;


        /*
           Intercambiamos las dos capas.
        */

        const oldActive =
            activeScene;

        activeScene =
            hiddenScene;

        hiddenScene =
            oldActive;


        /*
           La nueva escena activa queda arriba.
        */

        activeScene.style.zIndex =
            "1";

        hiddenScene.style.zIndex =
            "0";


        /*
           La nueva escena activa muestra
           la página correcta.
        */

        activeScene.querySelector("img").src =
            images[current];


        /*
           Preparamos la escena escondida
           para la próxima página.
        */

        if (current < images.length - 1) {

            hiddenScene.querySelector("img").src =
                images[current + 1];

        } else {

            hiddenScene.querySelector("img").src =
                images[current];
        }


        /*
           Escondemos la hoja de regreso.
        */

        backTurningPage.style.visibility =
            "hidden";


        /*
           La dejamos lista para otro regreso.
        */

        resetBackPage();


        /*
           Liberamos el control.
        */

        isAnimating = false;

    }, duration);

});