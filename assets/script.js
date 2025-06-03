// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Function to toggle menu state
function toggleMenu() {
    const isOpen = navLinks.classList.contains('active');
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    body.classList.toggle('menu-open', !isOpen);
}

// Mobile menu handlers
menuToggle?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        toggleMenu();
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
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
      document.getElementById(`${tabId}-content`)?.classList.add('active');
    });
  });
}

// Clipboard functionality for package installation commands
const copyButtons = document.querySelectorAll('.copy-btn');
if (copyButtons.length > 0) {
  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const textToCopy = button.getAttribute('data-clipboard-text');
      try {
        await navigator.clipboard.writeText(textToCopy);
        // Show copied feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = 'var(--success)';
        
        // Reset after 2 seconds
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    });
  });
}

// Navbar scroll effect with performance optimization
const navbar = document.querySelector('.navbar');
const handleScroll = debounce(() => {
  requestAnimationFrame(() => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  });
}, 16);

window.addEventListener('scroll', handleScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Animation on scroll with performance optimization
const animateOnScroll = debounce(() => {
  requestAnimationFrame(() => {
    const elements = document.querySelectorAll('.fade-in, .slide-in');
    const screenPosition = window.innerHeight / 1.3;

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      if (elementPosition < screenPosition) {
        element.classList.add('animate');
      }
    });
  });
}, 16);

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);