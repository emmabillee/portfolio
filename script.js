document.addEventListener('DOMContentLoaded', () => {
  /* ---------- carousel (kun hvis .slides findes) ---------- */
  const slides = document.querySelector('.slides');
  const cardWidth = 330;

  if (slides) {
    const slideCount = Math.floor(slides.children.length / 2);

    function skiftSlide(retning) {
      slides.classList.add('smooth-scroll');
      slides.scrollBy({
        left: retning * cardWidth,
        behavior: 'smooth'
      });
    }

    function disableSmoothScroll() {
      slides.classList.remove('smooth-scroll');
    }

    function enableSmoothScroll() {
      setTimeout(() => {
        slides.classList.add('smooth-scroll');
      }, 50);
    }

    slides.addEventListener('scroll', () => {
      const totalWidth = cardWidth * slideCount;

      if (slides.scrollLeft >= totalWidth) {
        disableSmoothScroll();
        slides.scrollLeft = slides.scrollLeft - totalWidth;
        enableSmoothScroll();
      } else if (slides.scrollLeft <= 0) {
        disableSmoothScroll();
        slides.scrollLeft = slides.scrollLeft + totalWidth;
        enableSmoothScroll();
      }
    });

    // Start i midten når vinduet er loadet
    window.addEventListener('load', () => {
      slides.scrollLeft = (cardWidth * slideCount) / 2;
    });
  }

  /* ---------- burger / nav toggle ---------- */
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    // toggler menuen
    burger.addEventListener('click', (e) => {
      const isOpen = navLinks.classList.toggle('open'); // viser/skjuler menu
      burger.classList.toggle('open');                  // gør burger til kryds
      burger.setAttribute('aria-expanded', isOpen);     // a11y
      document.body.classList.toggle('no-scroll', isOpen); // forhindrer body-scroll når åben
      e.stopPropagation();
    });

    // luk menu når et link klikkes
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });

    // luk på Escape
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      }
    });

    // klik udenfor lukker menu
    document.addEventListener('click', (ev) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(ev.target) && !burger.contains(ev.target)) {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // Hvis burger eller nav ikke findes, ingen fejl — scriptet fortsætter roligt.
});
