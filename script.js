const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 4 + 'px';
  cursor.style.top = my - 4 + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .skill-tag, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    ring.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    ring.classList.remove('hover');
  });
});

setTimeout(() => {
  document.getElementById('loader').classList.add('hidden');
}, 1600);

window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
});

const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

if (burger) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .timeline-item').forEach(el => observer.observe(el));

const repos = [
  'VOTING-MANAGEMENT-SYSTEM-2025',
  'HealTapSystem',
  'RECENT-SYSTEM-2026',
  'kanin',
  'CRUD-PROJECT',
  'ayessa_project',
  'ayessa_valentines'
];

repos.forEach((repo, i) => {
  fetch(`https://api.github.com/repos/fortuitomark28/${repo}`)
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById(`lang-${i}`);
      if (el) el.textContent = data.language || 'Code';
    })
    .catch(() => {
      const el = document.getElementById(`lang-${i}`);
      if (el) el.textContent = 'Code';
    });
});

fetch('https://api.github.com/users/fortuitomark28')
  .then(r => r.json())
  .then(data => {
    if (data.public_repos) {
      document.getElementById('repoCount').textContent = data.public_repos;
    }
  })
  .catch(() => {});