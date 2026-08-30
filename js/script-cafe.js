// ===== NAVIGATION SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = hamburger.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.className = 'fas fa-times';
  } else {
    icon.className = 'fas fa-bars';
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = hamburger.querySelector('i');
    icon.className = 'fas fa-bars';
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinksArray.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== MENU CATEGORY FILTERING =====
const menuItems = document.querySelectorAll('.menu-item');
const tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all tabs
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-category');

    // Filter menu items
    menuItems.forEach((item, index) => {
      const itemCategory = item.getAttribute('data-category');
      
      if (category === 'all' || itemCategory === category) {
        item.classList.remove('hidden');
        // Add staggered animation delay
        item.style.animationDelay = `${(index % 6) * 0.05}s`;
        item.style.animation = 'none';
        // Trigger reflow
        void item.offsetWidth;
        item.style.animation = `menuReveal 0.6s ease forwards`;
        item.style.animationDelay = `${(index % 6) * 0.05}s`;
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ===== MENU ITEMS STAGGERED ANIMATION =====
document.querySelectorAll('.menu-item').forEach((item, index) => {
  const delay = (index % 6) * 0.05;
  item.style.setProperty('--delay', delay);
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const submitBtn = contactForm.querySelector('.btn');
  const originalText = submitBtn.textContent;
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name') || 'Guest';
  
  submitBtn.textContent = '✓ Reservation confirmed!';
  submitBtn.style.background = '#4ade80';
  submitBtn.style.color = '#1a1410';
  submitBtn.style.boxShadow = '0 0 40px rgba(74, 222, 128, 0.3)';
  
  // Reset form after 4 seconds
  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.style.background = '#f4a460';
    submitBtn.style.color = '#1a1410';
    submitBtn.style.boxShadow = '0 0 30px rgba(244, 164, 96, 0.3)';
    contactForm.reset();
  }, 4000);
});

// ===== PARALLAX EFFECT ON HERO =====
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  if (hero && scrolled < window.innerHeight) {
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.03}px)`;
      heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.2;
    }
  }
});

// ===== INTERSECTION OBSERVER FOR MENU ITEMS =====
if ('IntersectionObserver' in window) {
  const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        // Only animate if not already visible
        if (item.style.opacity !== '1') {
          item.style.animationPlayState = 'running';
        }
        menuObserver.unobserve(item);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.menu-item').forEach(item => {
    if (getComputedStyle(item).opacity === '0') {
      menuObserver.observe(item);
    }
  });
}

// ===== GLOW EFFECT ON HERO IMAGE (Dynamic) =====
const heroImage = document.querySelector('.hero-image-glow');
if (heroImage) {
  // Add mouse tracking for dynamic glow
  heroImage.addEventListener('mousemove', (e) => {
    const rect = heroImage.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    heroImage.style.setProperty('--mouse-x', `${x}%`);
    heroImage.style.setProperty('--mouse-y', `${y}%`);
    
    // Update glow position
    const glow = heroImage.querySelector('::before');
    if (glow) {
      // This is handled via CSS custom properties
    }
  });
}

// Add dynamic glow style
const style = document.createElement('style');
style.textContent = `
  .hero-image-glow::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(244, 164, 96, 0.08), 
                transparent 70%);
    pointer-events: none;
    z-index: 2;
    transition: background 0.3s ease;
  }
`;
document.head.appendChild(style);

// ===== SCROLL REVEAL FOR ABOUT SECTION =====
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const features = entry.target.querySelectorAll('.about-features div');
      features.forEach((feature, index) => {
        setTimeout(() => {
          feature.style.opacity = '1';
          feature.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  });
}, { threshold: 0.2 });

if (aboutSection) {
  // Set initial state
  const features = aboutSection.querySelectorAll('.about-features div');
  features.forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(20px)';
    feature.style.transition = 'all 0.6s ease';
  });
  aboutObserver.observe(aboutSection);
}

// ===== KEYBOARD ACCESSIBILITY FOR TABS =====
tabBtns.forEach(btn => {
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });
});

console.log('☕ Lumina Cafe — Where flavors glow!');
console.log('✨ Menu items loaded:', document.querySelectorAll('.menu-item').length);
console.log('🍽️ Categories:', [...new Set([...document.querySelectorAll('.menu-item')].map(item => item.dataset.category))].join(', '));