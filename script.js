document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function setActiveNav() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const linkParent = link.parentElement;
        
        if (currentLocation.endsWith(linkPath) || 
            (currentLocation.endsWith('/') && linkPath === 'index.html')) {
            linkParent.classList.add('active');
        } else {
            linkParent.classList.remove('active');
        }
    });
}

function animateOnScroll() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    skillCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

function typingEffect() {
    const text = document.querySelector('.hero-text p');
    if (!text) return;
    
    const originalText = text.textContent;
    text.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            text.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    animateOnScroll();
    typingEffect();
});