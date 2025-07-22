const slides = document.querySelector(".slides");
const slideCount = slides.children.length / 2;
const cardWidth = 330;

// Scroll med smooth ved klik
function skiftSlide(retning) {
  slides.classList.add("smooth-scroll");
  slides.scrollBy({
    left: retning * cardWidth,
    behavior: "smooth"
  });
}

// Håndter jump ved scroll
slides.addEventListener("scroll", () => {
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

// Start i midten
window.addEventListener("load", () => {
  slides.scrollLeft = cardWidth * slideCount / 2;
});

// Midlertidigt fjern smooth scroll
function disableSmoothScroll() {
  slides.classList.remove("smooth-scroll");
}

function enableSmoothScroll() {
  // Tilføj efter en kort pause
  setTimeout(() => {
    slides.classList.add("smooth-scroll");
  }, 50);
}
