const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');
const prevnextButtons = document.querySelectorAll('.prevnext-button');

const menuButton = document.getElementById('menuButton');
const hamburgerMenu = document.getElementById('mobileMenu');

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

const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
}

// Toggle and save theme
themeToggle.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});


// Hamburger menu functionality
function openMenu() {
  hamburgerMenu.hidden = false;
  hamburgerMenu.classList.add('open');
  menuButton.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  hamburgerMenu.classList.remove('open');
  // let the transition end before hiding so screen readers don't miss it
  setTimeout(() => { hamburgerMenu.hidden = true; }, 200); // matches var(--tr-med)
  menuButton.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  expanded ? closeMenu() : openMenu();
}

menuButton.addEventListener('click', toggleMenu);

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburgerMenu.contains(e.target) && !menuButton.contains(e.target) &&
      menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
  }
});

// Optional: Close when a link is clicked (good for single-page sections)
hamburgerMenu.addEventListener('click', (e) => {
  if (e.target.matches('a')) closeMenu();
});
