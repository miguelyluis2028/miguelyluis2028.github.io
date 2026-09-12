const page = document.querySelector(".page");

let turned = false;

page.style.transform = "rotateY(0deg)";

document.addEventListener("pointerdown", (event) => {
  event.preventDefault();

  turned = !turned;

  if (turned) {
    page.style.transform = "rotateY(-180deg)";
  } else {
    page.style.transform = "rotateY(0deg)";
  }
});