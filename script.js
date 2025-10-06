const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');
const prevnextButtons = document.querySelectorAll('.prevnext-button');

let currentIndex = 0; // track which "page" we are on

// --- DOTS ---
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    // remove active from all
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');

    currentIndex = parseInt(dot.dataset.index, 10);
    const offset = -100 * currentIndex;  // shift by 100% per page
    track.style.transform = `translateX(${offset}%)`;
  });
});

// --- PREV/NEXT ---
prevnextButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.innerHTML === "PREV") {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        return; // already at first slide
      }
    } else if (button.innerHTML === "NEXT") {
      if (currentIndex < dots.length - 1) {
        currentIndex++;
      } else {
        return; // already at last slide
      }
    }

    // move carousel
    const offset = -100 * currentIndex;
    track.style.transform = `translateX(${offset}%)`;

    // update dots
    dots.forEach(d => d.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  });
});
