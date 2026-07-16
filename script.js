document.addEventListener("DOMContentLoaded", function () {

    const boton = document.getElementById("startButton");

    if (boton) {

        boton.onclick = function () {

            alert("¡Funciona!");

        };

    }

});