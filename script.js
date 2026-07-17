document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("startButton");
    const cover = document.getElementById("cover");
    const prologue = document.getElementById("prologue");

    if (!button) return;

    button.addEventListener("click", () => {

        cover.style.opacity = "0";
        cover.style.transition = "opacity 2s ease";

        setTimeout(() => {
            cover.remove();

prologue.innerHTML = `
<div class="center">
    <p class="quote">
        Toda gran historia de amor merece ser contada...
    </p>
</div>
`;

prologue.style.display = "flex";
prologue.style.opacity = "1";
prologue.classList.add("active");
        }, 2000);

    });

});