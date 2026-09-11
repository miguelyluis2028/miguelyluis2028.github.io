const page = document.querySelector(".page");

let turned = false;

page.addEventListener("click", () => {
    turned = !turned;

    if (turned) {
        page.style.transform = "rotateY(-180deg)";
    } else {
        page.style.transform = "rotateY(0deg)";
    }
});