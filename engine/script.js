const sheet = document.querySelector(".sheet");

let open = false;

sheet.addEventListener("click", () => {

    if (!open){

        sheet.style.transform = "rotateY(-180deg)";

        open = true;

    }else{

        sheet.style.transform = "rotateY(0deg)";

        open = false;

    }

});