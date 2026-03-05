// ─── LOADER ───────────────────────────────────────────
let p = 0;
const pct = document.getElementById('lPct');
const iv = setInterval(() => {
  p += Math.random() * 15 + 5;
  if (p >= 100) {
    p = 100;
    pct.textContent = '100%';
    clearInterval(iv);
    setTimeout(() => {
      const loader = document.getElementById('loader');
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }, 500);
  }
  pct.textContent = Math.floor(p) + '%';
}, 100);

// ─── CURSOR ───────────────────────────────────────────
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top = e.clientY + 'px';
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  }, 60);
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.transform = 'translate(-50%,-50%) scale(2)';
    ring.style.transform = 'translate(-50%,-50%) scale(1.4)';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// ─── NAV SCROLL ───────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
});

// ─── ACTIVE NAV LINK ──────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ─── FADE IN ON SCROLL ────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

// ─── SKILL BARS ───────────────────────────────────────
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-cat').forEach(el => skillObs.observe(el));

document.getElementById('menu-btn').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// ─── CONTACT FORM ─────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✓ Mensagem enviada!';
  btn.style.background = 'linear-gradient(135deg,#00e5ff,#00b050)';
  setTimeout(() => {
    btn.innerHTML = 'Enviar Mensagem <i class="fas fa-paper-plane"></i>';
    btn.style.background = '';
  }, 3000);
});