document.addEventListener('DOMContentLoaded', () => {
  // Page load animation
  const loader = document.getElementById('loader');
  const pageContainer = document.querySelector('.page-container');

  setTimeout(() => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 1000);
    }
    if (pageContainer) {
      pageContainer.classList.add('visible');
    }
  }, 500);

  // Active Nav Link Setup
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Intersection Observer for reveals
  const revealElements = document.querySelectorAll('.text-reveal, .image-card, .video-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px 100px 0px" });

  revealElements.forEach(el => observer.observe(el));

  // Click Heart Burst Effect
  document.addEventListener('click', (e) => {
    // Don't burst if clicking on nav to avoid UI clutter
    if (e.target.closest('.floating-nav')) return;

    createHeartBurst(e.clientX, e.clientY);
  });

  // Create subtle stars background
  createStars();
});

function createHeartBurst(x, y) {
  const heart = document.createElement('div');
  heart.innerHTML = '❤️';
  heart.className = 'heart-burst';
  heart.style.left = `${x - 12}px`;
  heart.style.top = `${y - 12}px`;
  
  // Randomize color slightly
  const colors = ['#d188a8', '#ff7eb3', '#ff65a3'];
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 1500);
}

function createStars() {
  const container = document.createElement('div');
  container.id = 'particles-js';
  document.body.prepend(container);

  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2 + 1;
    star.style.position = 'absolute';
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.backgroundColor = '#fff';
    star.style.borderRadius = '50%';
    star.style.opacity = Math.random() * 0.5 + 0.1;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.boxShadow = `0 0 ${size * 2}px #fff`;
    
    // Twinkle animation inline
    star.animate([
      { opacity: star.style.opacity },
      { opacity: Math.random() * 0.8 + 0.5 },
      { opacity: star.style.opacity }
    ], {
      duration: Math.random() * 3000 + 2000,
      iterations: Infinity,
      direction: 'alternate'
    });

    container.appendChild(star);
  }
}
