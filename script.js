document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("startButton");
    const cover = document.getElementById("cover");
    const prologue = document.getElementById("prologue");

    if (!button) return;

    button.addEventListener("click", () => {

        cover.style.opacity = "0";
        cover.style.transition = "opacity 2s ease";

        setTimeout(() => {
            cover.style.display = "none";

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
setTimeout(() => {

    prologue.style.opacity = "0";

    setTimeout(() => {

        prologue.style.display = "none";

        const act1 = document.getElementById("act1");

if (act1) {
    act1.classList.add("active");
}

    }, 2000);

}, 7000);
        }, 2000);

    });

});  