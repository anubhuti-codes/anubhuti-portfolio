// Hamburger menu toggle and responsive nav handling
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

function isMobileView() {
  return window.innerWidth <= 768;
}

function showNavMobile() {
  navLinks.style.display = 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.gap = '1rem';
  hamburger.setAttribute('aria-expanded', 'true');
}

function hideNavMobile() {
  navLinks.style.display = 'none';
  hamburger.setAttribute('aria-expanded', 'false');
}

function showNavDesktop() {
  navLinks.style.display = 'flex';
  navLinks.style.flexDirection = 'row';
  navLinks.style.gap = '1.5rem';
  hamburger.setAttribute('aria-expanded', 'false');
}

// Initial nav display setup on page load & resize
function handleResize() {
  if (isMobileView()) {
    hideNavMobile();
  } else {
    showNavDesktop();
  }
}

// Toggle nav on hamburger click
hamburger.addEventListener('click', () => {
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    hideNavMobile();
  } else {
    showNavMobile();
  }
});

// Hide mobile nav on nav-link click (only for mobile)
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (isMobileView()) {
      hideNavMobile();
    }
  });
});

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

//Themes
const toggleBtn = document.getElementById("themeToggle");
const root = document.documentElement;

toggleBtn.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  toggleBtn.textContent = isDark ? "🌙" : "☀️";
});


// Animate skill bars on scroll
const progressBars = document.querySelectorAll('.progress');

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

function animateSkills() {
  progressBars.forEach((bar) => {
    if (isElementInViewport(bar)) {
      const level = bar.getAttribute('data-level');
      bar.style.width = level + '%';
    }
  });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Contact form alert
const form = document.getElementById('contact');
form.addEventListener('submit', (e) => {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
      e.preventDefault();

    alert('Please fill out all fields');
    return;
  }

  alert(`Thanks for reaching out, ${name}! I'll get back to you soon.`);
});

// Background floating circles animation on hero
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let circles = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function initCircles() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.hero').offsetHeight;
  circles = [];
  const count = Math.floor(window.innerWidth / 30);
  for (let i = 0; i < count; i++) {
    circles.push({
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      radius: random(10, 30),
      alpha: random(0.1, 0.25),
      speed: random(0.2, 0.5),
      direction: Math.random() < 0.5 ? -1 : 1,
      offset: random(0, 1000),
    });
  }
}

function animateCircles(time = 0) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((circle) => {
    circle.y += circle.speed * circle.direction;
    if (circle.y - circle.radius > canvas.height) circle.y = -circle.radius;
    if (circle.y + circle.radius < 0) circle.y = canvas.height + circle.radius;

    const oscillation = Math.sin((time + circle.offset) / 500) * 10;
    const xPos = circle.x + oscillation;

    ctx.beginPath();
    ctx.fillStyle = `rgba(200, 158, 207, ${circle.alpha})`;
    ctx.shadowColor = `rgba(200, 158, 207, ${circle.alpha})`;
    ctx.shadowBlur = 10;
    ctx.arc(xPos, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animateCircles);
}

window.addEventListener('resize', () => {
  initCircles();
});

initCircles();
animateCircles();

//end




