const page = document.querySelector(".page");
const cover = document.querySelector("#cover");

const images = [];

for (let i = 1; i <= 20; i++) {
  images.push(`../images/libro/pagina-${i}.png`);
}

let current = 0;
let bookStarted = false;
let isAnimating = false;

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

cover.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (bookStarted) return;

  bookStarted = true;
  cover.style.display = "none";
});

document.addEventListener("pointerdown", (event) => {
  event.preventDefault();

  if (!bookStarted) return;
  if (isAnimating) return;
  if (current >= images.length - 1) return;

  isAnimating = true;

  page.style.transform = "rotateY(-180deg)";

  setTimeout(() => {
    current++;

    showSpread(current);

    page.style.transition = "none";
    page.style.transform = "rotateY(0deg)";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        page.style.transition = "transform .8s ease";
        isAnimating = false;
      });
    });
  }, 1300);
});