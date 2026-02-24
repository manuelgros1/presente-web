/* =========================================
   PRESENTE — Script
   Nav scroll · Intersection observer · Form
   ========================================= */

// ---- NAV: add .scrolled class on scroll ----
const nav = document.getElementById('nav');

const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---- MOBILE BURGER MENU ----
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ---- INTERSECTION OBSERVER: animate elements on scroll ----
const animateObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animateObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-animate], .stat-card, .competencia-card, .equipo-card').forEach(el => {
  animateObserver.observe(el);
});

// ---- WAITLIST FORM ----
const form = document.getElementById('waitlist-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailInput = form.querySelector('input[type="email"]');
  const email = emailInput.value.trim();

  if (!email || !isValidEmail(email)) {
    emailInput.focus();
    emailInput.style.borderColor = '#dc6b6b';
    setTimeout(() => { emailInput.style.borderColor = ''; }, 2000);
    return;
  }

  // Simulate submission (replace with real API call)
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  setTimeout(() => {
    form.querySelector('.waitlist-form__group').style.display = 'none';
    successMsg.hidden = false;
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 800);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---- SMOOTH NAV HIGHLIGHT on scroll ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
