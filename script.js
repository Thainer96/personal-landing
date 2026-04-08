// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

// ===== Scroll animations =====
const fadeElements = document.querySelectorAll(
  '.skill-category, .timeline-item, .edu-card, .cert-item, .contact-card, .stat-card, .hero-card'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => observer.observe(el));

// ===== Counter animation =====
const counters = document.querySelectorAll('.stat-number');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };
        update();
      });
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===== Smooth scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// ===== Bug cursor =====
const bugCursor = document.getElementById('bugCursor');
if (bugCursor) {
  let mouseX = 0, mouseY = 0;
  let bugX = 0, bugY = 0;
  let angle = 0;
  let isVisible = false;

  function showBug(x, y) {
    mouseX = x;
    mouseY = y;
    if (!isVisible) {
      isVisible = true;
      bugCursor.classList.add('visible');
    }
  }

  document.addEventListener('mousemove', (e) => {
    showBug(e.clientX, e.clientY);
  });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    bugCursor.classList.remove('visible');
  });

  document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    showBug(touch.clientX, touch.clientY);
    bugX = touch.clientX;
    bugY = touch.clientY;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    showBug(touch.clientX, touch.clientY);
  }, { passive: true });

  document.addEventListener('touchend', () => {
    setTimeout(() => {
      isVisible = false;
      bugCursor.classList.remove('visible');
    }, 800);
  });

  function animateBug() {
    const dx = mouseX - bugX;
    const dy = mouseY - bugY;
    bugX += dx * 0.12;
    bugY += dy * 0.12;

    const speed = Math.sqrt(dx * dx + dy * dy);
    if (speed > 1) {
      const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      const angleDiff = targetAngle - angle;
      angle += angleDiff * 0.1;
    }

    bugCursor.style.left = bugX + 'px';
    bugCursor.style.top = bugY + 'px';
    bugCursor.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

    requestAnimationFrame(animateBug);
  }
  animateBug();
}


// ===== Experience view toggle =====
const toggleBtns = document.querySelectorAll('.exp-toggle__btn');
const expViews = document.querySelectorAll('.exp-view');

toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.getAttribute('data-view');
    toggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    expViews.forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + view).classList.add('active');
  });
});

// ===== Accordion =====
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.accordion-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
    });

    // Open clicked if it wasn't active
    if (!isActive) {
      item.classList.add('active');
      header.setAttribute('aria-expanded', 'true');
    }
  });
});


// ===== Back to top button =====
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 1400);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
