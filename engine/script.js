const page = document.querySelector(".page");

let opened = false;

page.addEventListener("click", () => {

    if (opened){

        page.style.transform = "rotateY(0deg)";

    }else{

        page.style.transform = "rotateY(-90deg)";

    }

    opened = !opened;

});