const page = document.querySelector(".page");

let opened = false;

page.addEventListener("click", () => {

    if (opened){

        page.style.transform = "rotateY(0deg)";

    }else{

        page.style.transform = "rotateZ(20deg)";

    }

    opened = !opened;

});