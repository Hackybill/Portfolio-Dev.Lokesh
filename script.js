// ====== MATRIX RAIN EFFECT ======
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const characters = matrix.split("");

const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * -100;
}

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#00f0ff";
    ctx.font = fontSize + "px monospace";
    
    for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ====== CUSTOM CURSOR ======
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor hover effects
document.querySelectorAll('a, button, .skill-tag, .project-card').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    elem.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ====== NAVIGATION ======
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ====== STATS COUNTER ANIMATION ======
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        }
    });
}, observerOptions);

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    observer.observe(statsContainer);
}

// ====== 3D CARD TILT EFFECT ======
const card = document.querySelector('.profile-card');

if (card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) scale(1)';
    });
}

// ====== SMOOTH SCROLL ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====== BUTTON RIPPLE EFFECT ======
document.querySelectorAll('.btn-primary, .btn-secondary, .project-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ====== SCROLL REVEAL ANIMATIONS ======
const revealElements = document.querySelectorAll('.service-card, .project-card, .timeline-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease-out';
    revealObserver.observe(el);
});

// ====== FORM VALIDATION ======
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff0080';
                setTimeout(() => {
                    input.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                }, 2000);
            }
        });
        
        if (isValid) {
            // Show success message (you can integrate with actual form submission)
            const successMsg = document.createElement('div');
            successMsg.textContent = '✓ Message sent successfully!';
            successMsg.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 20px 30px;
                background: rgba(0, 255, 136, 0.2);
                border: 1px solid #00ff88;
                border-radius: 10px;
                color: #00ff88;
                font-weight: 600;
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
            `;
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.remove();
                contactForm.reset();
            }, 3000);
        }
    });
}

// ====== SKILL TAG HOVER EFFECT ======
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        const level = this.getAttribute('data-level');
        if (level) {
            const indicator = document.createElement('div');
            indicator.className = 'skill-level-indicator';
            indicator.textContent = `${level}%`;
            indicator.style.cssText = `
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 240, 255, 0.9);
                color: #000;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 0.8rem;
                font-weight: 700;
                white-space: nowrap;
                z-index: 100;
            `;
            this.style.position = 'relative';
            this.appendChild(indicator);
        }
    });
    
    tag.addEventListener('mouseleave', function() {
        const indicator = this.querySelector('.skill-level-indicator');
        if (indicator) {
            indicator.remove();
        }
    });
});

// ====== PARALLAX EFFECT ======
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.spline-container, .particles');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ====== TYPING EFFECT FOR TERMINAL ======
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ====== LOADING ANIMATION ======
window.addEventListener('load', () => {
    document.body.style.overflow = 'hidden';
    
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <h2 style="font-family: 'Orbitron', sans-serif; color: #00f0ff; font-size: 2rem; text-shadow: 0 0 20px rgba(0, 240, 255, 0.5);">
                Loading...
            </h2>
            <div style="width: 200px; height: 3px; background: rgba(0, 240, 255, 0.2); margin-top: 20px; border-radius: 2px; overflow: hidden;">
                <div style="width: 0%; height: 100%; background: #00f0ff; animation: loadBar 2s ease-out forwards;"></div>
            </div>
        </div>
    `;
    
    const loadBarStyle = document.createElement('style');
    loadBarStyle.textContent = `
        @keyframes loadBar {
            to { width: 100%; }
        }
    `;
    document.head.appendChild(loadBarStyle);
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        document.body.style.overflow = 'auto';
        setTimeout(() => loader.remove(), 500);
    }, 2000);
});
document.addEventListener('contextmenu', e => {
  if (e.target.closest('.profile-img-container')) { e.preventDefault(); return false; }
});
document.querySelectorAll('.profile-img').forEach(img => {
  img.addEventListener('dragstart', e => e.preventDefault());
  img.addEventListener('selectstart', e => e.preventDefault());
});
function protectImage(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  ctx.fillStyle = 'rgba(0,240,255,0.02)'; ctx.fillRect(0,0,canvas.width,canvas.height);
  img.src = canvas.toDataURL();
}
document.addEventListener('load', () => {
  const img = document.querySelector('.profile-img');
  if (img) protectImage(img);
}, true);


// ====== CONSOLE MESSAGE ======
console.log('%c🚀 Portfolio loaded successfully!', 'color: #00f0ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);');
console.log('%c💻 Built with passion by Dev.Lokesh', 'color: #ff0080; font-size: 14px;');
console.log('%c🔐 Secured with code | Protected by design', 'color: #7000ff; font-size: 14px;');
