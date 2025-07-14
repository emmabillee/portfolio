const carousel = document.getElementById("carousel");
let isDown = false;
let startX;
let scrollStart;

// Drag-to-scroll
carousel.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX;
  scrollStart = carousel.scrollLeft;
  carousel.style.cursor = "grabbing";
});

carousel.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  const dx = e.pageX - startX;
  carousel.scrollLeft = scrollStart - dx;
});

carousel.addEventListener("mouseup", () => {
  isDown = false;
  carousel.style.cursor = "grab";
});

carousel.addEventListener("mouseleave", () => {
  isDown = false;
  carousel.style.cursor = "grab";
});

// Infinity-effekt
carousel.addEventListener("scroll", () => {
  const scrollWidth = carousel.scrollWidth / 2;
  if (carousel.scrollLeft >= scrollWidth) {
    // Rul sømløst tilbage til start
    carousel.scrollLeft = carousel.scrollLeft - scrollWidth;
  } else if (carousel.scrollLeft <= 0) {
    carousel.scrollLeft = carousel.scrollLeft + scrollWidth;
  }
});

// Start midt i listen, så man kan scrolle begge veje fra start
window.addEventListener("load", () => {
  carousel.scrollLeft = carousel.scrollWidth / 4;
});
