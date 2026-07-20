 document.addEventListener("DOMContentLoaded", () => {

    const startButton = document.getElementById("startButton");
    const cover = document.getElementById("cover");
    const prologue = document.getElementById("prologue");
    const book = document.getElementById("book");
    const frontImage = document.getElementById("frontImage");
    const backImage = document.getElementById("backImage");
    const music = document.getElementById("bgMusic");

    let currentPage = 1;
    const totalPages = 20;

    let touchStartX = 0;
    let touchEndX = 0;

    function showPage(page) {

    frontImage.parentElement.style.transform = "rotateY(-90deg)";

    setTimeout(() => {

        frontImage.src = `images/libro/pagina-${page}.png`;

        if (page < totalPages) {
            backImage.src = `images/libro/pagina-${page + 1}.png`;
        } else {
            backImage.src = `images/libro/pagina-${page}.png`;
        }

        frontImage.onload = () => {

            frontImage.parentElement.style.transform = "rotateY(0deg)";

        };

    },250);

}

    if (startButton) {

        startButton.addEventListener("click", () => {

            if (music) {
                music.volume = 0.35;
                music.play().catch(() => {});
            }

            cover.style.opacity = "0";

            setTimeout(() => {

                cover.classList.remove("active");
                prologue.classList.add("active");

                setTimeout(() => {

                    prologue.style.opacity = "0";

                    setTimeout(() => {

                        prologue.classList.remove("active");
                        book.classList.add("active");

                        showPage(currentPage);

                    }, 2000);

                }, 6000);

            }, 2000);

        });

    }

    function nextPage() {

        if (currentPage < totalPages) {

            currentPage++;
            showPage(currentPage);

        }

    }

    function previousPage() {

        if (currentPage > 1) {

            currentPage--;
            showPage(currentPage);

        }

    }

    document.addEventListener("click", (e) => {

        if (!book.classList.contains("active")) return;

        const half = window.innerWidth / 2;

        if (e.clientX > half) {

            nextPage();

        } else {

            previousPage();

        }

    });

    book.addEventListener("touchstart", (e) => {

        touchStartX = e.changedTouches[0].screenX;

    });

    book.addEventListener("touchend", (e) => {

        touchEndX = e.changedTouches[0].screenX;

        const distance = touchStartX - touchEndX;

        if (Math.abs(distance) < 50) return;

        if (distance > 0) {

            nextPage();

        } else {

            previousPage();

        }

    });

});