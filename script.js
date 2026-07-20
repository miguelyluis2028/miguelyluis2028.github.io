document.addEventListener("DOMContentLoaded", () => {

    const startButton = document.getElementById("startButton");
    const cover = document.getElementById("cover");
    const prologue = document.getElementById("prologue");
    const book = document.getElementById("book");
    const pageImage = document.getElementById("pageImage");
    const music = document.getElementById("bgMusic");

    let currentPage = 1;
    const totalPages = 20;

    function showPage(page){

        pageImage.classList.remove("pageFade");

        void pageImage.offsetWidth;

        pageImage.src = `images/libro/pagina-${page}.png`;

        pageImage.classList.add("pageFade");

    }

    if(startButton){

        startButton.addEventListener("click", () => {

            if(music){

                music.volume = 0.35;

                music.play().catch(()=>{});

            }

            cover.style.opacity = "0";

            setTimeout(()=>{

                cover.classList.remove("active");

                prologue.classList.add("active");

                setTimeout(()=>{

                    prologue.style.opacity = "0";

                    setTimeout(()=>{

                        prologue.classList.remove("active");

                        book.classList.add("active");

                        showPage(currentPage);

                    },2000);

                },6000);

            },2000);

        });

    }

    document.addEventListener("click",(e)=>{

        if(!book.classList.contains("active")) return;

        const half = window.innerWidth / 2;

        if(e.clientX > half){

            if(currentPage < totalPages){

                currentPage++;

                showPage(currentPage);

            }

        }else{

            if(currentPage > 1){

                currentPage--;

                showPage(currentPage);

            }

        }

    });

});