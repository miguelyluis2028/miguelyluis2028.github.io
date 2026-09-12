const page = document.querySelector(".page");

const images = [];

for (let i = 1; i <= 20; i++) {
  images.push(`../images/libro/pagina-${i}.png`);
}

let current = 0;
let turned = false;

const frontImage = document.querySelector(".front img");
const backImage = document.querySelector(".back img");
const leftImage = document.querySelector(".left-page img");

function showSpread(index) {
  const image = images[index];

  leftImage.src = image;
  frontImage.src = image;

  if (index < images.length - 1) {
    backImage.src = images[index + 1];
  }
}

showSpread(current);

page.style.transform = "rotateY(0deg)";

document.addEventListener("pointerdown", (event) => {
  event.preventDefault();

  if (!turned) {
    if (current < images.length - 1) {
      current++;
      showSpread(current);

      page.style.transform = "rotateY(-180deg)";
      turned = true;
    }
  } else {
    page.style.transform = "rotateY(0deg)";
    turned = false;
  }
});