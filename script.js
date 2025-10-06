const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');

const prevnext = document.querySelector('.prevnex-button')

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    // remove active from all
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');

    const index = parseInt(dot.dataset.index, 10);
    const offset = -100 * index;  // shift by 100% per page
    track.style.transform = `translateX(${offset}%)`;
  });
});

