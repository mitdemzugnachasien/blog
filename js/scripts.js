/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
/*! "Passwortschutz" */

  const correctPassword = "Passwort";

  // Prüfen ob bereits eingeloggt
  if (sessionStorage.getItem("authenticated") === "true") {
    showContent();
  }

  function checkPassword() {
    const input = document.getElementById("password").value;

    if (input === correctPassword) {
      sessionStorage.setItem("authenticated", "true");
      showContent();
    } else {
      document.getElementById("error").innerText =
        "Faaaaaalsch";
    }
  }

  function showContent() {
    document.getElementById("login").style.display = "none";
    document.getElementById("content").style.display = "block";
  }

/*! Navigationsleiste */
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

/*! Slideshow */

document.addEventListener("DOMContentLoaded", () => {


    /*
        Bilder hier erweitern:
        Einfach weitere Pfade ergänzen.
    */

    const images = [
        "assets/img/almatyzug.jpg",
        "assets/img/budapesthbf.jpg",
        "assets/img/hanoizug.jpg"
    ];


    const intervalTime = 10000;


    const masthead = document.getElementById("masthead");

    const bg1 = document.getElementById("bg1");
    const bg2 = document.getElementById("bg2");


    let currentImage = 0;

    let activeLayer = bg1;

    let inactiveLayer = bg2;

    let timer = null;

    let isAnimating = false;

    let paused = false;



    /*
        Bilder vorladen
    */

    images.forEach(src => {

        const img = new Image();

        img.src = src;

    });



    /*
        Erstes Bild setzen
    */

    bg1.style.backgroundImage =
        `url('${images[0]}')`;

    bg1.style.opacity = 1;

    bg2.style.opacity = 0;



    /*
        Bildwechsel
    */

    function changeImage(direction = 1) {


        if (isAnimating) return;


        isAnimating = true;


        currentImage += direction;


        if (currentImage >= images.length) {

            currentImage = 0;

        }


        if (currentImage < 0) {

            currentImage = images.length - 1;

        }



        inactiveLayer.style.backgroundImage =
            `url('${images[currentImage]}')`;



        inactiveLayer.style.opacity = 1;

        activeLayer.style.opacity = 0;



        setTimeout(() => {


            const oldActive = activeLayer;


            activeLayer = inactiveLayer;

            inactiveLayer = oldActive;


            isAnimating = false;


        },1200);

    }



    /*
        Automatische Slideshow
    */

function startTimer(){

    if(timer !== null){
        clearInterval(timer);
    }

    timer = setInterval(() => {

        if(!paused){

            changeImage(1);

        }

    }, intervalTime);

}


    /*
        Klicknavigation
    */

    document
    .querySelector(".slide-left")
    .addEventListener("click", () => {

        changeImage(-1);

        startTimer();

    });



    document
    .querySelector(".slide-right")
    .addEventListener("click", () => {

        changeImage(1);

        startTimer();

    });


    /*
    Touchsteuerung Smartphone
    Linke Hälfte = vorheriges Bild
    Rechte Hälfte = nächstes Bild
*/

masthead.addEventListener("touchend", (e) => {

    // Position des Fingers relativ zum Slider
    const rect = masthead.getBoundingClientRect();
    const touchX = e.changedTouches[0].clientX - rect.left;

    // Linke Hälfte
    if (touchX < rect.width / 2) {

        changeImage(-1);

    }
    // Rechte Hälfte
    else {

        changeImage(1);

    }

});


    /*
        Start
    */

    startTimer();


});

