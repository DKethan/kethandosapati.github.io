// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Project tabs functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0) {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Show corresponding content
      const tabId = button.getAttribute('data-tab');
      document.getElementById(`${tabId}-content`).classList.add('active');
    });
  });
}

// Clipboard functionality for package installation commands
const copyButtons = document.querySelectorAll('.copy-btn');
if (copyButtons.length > 0) {
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const textToCopy = button.getAttribute('data-clipboard-text');
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Show copied feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = 'var(--success)';

        // Reset after 2 seconds
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.style.color = '';
        }, 2000);
      });
    });
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.fade-in, .slide-in');

  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.classList.add('animate');
    }
  });
};

// Scroll to top button functionality
const scrollToTopButton = document.getElementById('scroll-to-top');
if (scrollToTopButton) {
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopButton.classList.add('visible');
    } else {
      scrollToTopButton.classList.remove('visible');
    }
  });

  // Scroll to top when button is clicked
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Update copyright year in footer
const copyrightYearElement = document.getElementById('copyright-year');
if (copyrightYearElement) {
  copyrightYearElement.textContent = new Date().getFullYear();
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
function setTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
      themeToggle.classList.remove('sun');
      themeToggle.classList.add('moon');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      themeToggle.classList.remove('moon');
      themeToggle.classList.add('sun');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });
}
// On load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme(prefersDark ? 'dark' : 'light');
}
// Fade-in on scroll
function revealOnScroll() {
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.style.animationPlayState = 'running';
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Button ripple effect
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = e.offsetX + 'px';
    ripple.style.top = e.offsetY + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Accent color picker
const accentColors = ['#4d8aff','#f472b6','#facc15','#34d399','#38bdf8','#a78bfa'];
function setAccent(color) {
  document.documentElement.style.setProperty('--accent', color);
  localStorage.setItem('accent', color);
  document.querySelectorAll('.accent-swatch').forEach(s => s.classList.toggle('selected', s.dataset.color === color));
}
function createAccentPicker() {
  const nav = document.querySelector('.navbar .container');
  if (!nav) return;
  let picker = document.createElement('div');
  picker.className = 'accent-picker';
  accentColors.forEach(color => {
    let swatch = document.createElement('div');
    swatch.className = 'accent-swatch';
    swatch.style.background = color;
    swatch.dataset.color = color;
    swatch.onclick = () => setAccent(color);
    picker.appendChild(swatch);
  });
  nav.appendChild(picker);
}
createAccentPicker();
const savedAccent = localStorage.getItem('accent');
if (savedAccent) setAccent(savedAccent);
else setAccent(accentColors[0]);

// Parallax hero
window.addEventListener('mousemove', e => {
  const hero = document.querySelector('.hero .geometric-shapes');
  if (!hero) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  hero.style.transform = `translate(${x}px,${y}px)`;
});

// Improved mobile nav
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  document.addEventListener('click', e => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });
}
