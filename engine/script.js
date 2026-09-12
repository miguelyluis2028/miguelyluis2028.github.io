const page = document.querySelector(".page");
const scene = document.querySelector("#scene");

let turned = false;

scene.addEventListener("click", () => {
  turned = !turned;

  if (turned) {
    page.style.transform = "rotateY(-180deg)";
  } else {
    page.style.transform = "rotateY(0deg)";
  }
});