// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3D Tilt Effect for Mockup and Cards
const tiltElements = document.querySelectorAll('.tilt-element');

tiltElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element

        // Update css variables for radial gradient hover effect on cards
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);

        // Only apply tilt to the hero mockup
        if (element.classList.contains('mockup-frame')) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }
    });

    element.addEventListener('mouseleave', () => {
        if (element.classList.contains('mockup-frame')) {
            element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }
    });
});

// Simple horizontal scroll behavior for all showcase tracks
const showcaseContainers = document.querySelectorAll('.showcase-container');
let isDragging = false;

showcaseContainers.forEach(showcaseContainer => {
    let isDown = false;
    let startX;
    let scrollLeft;

    showcaseContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        showcaseContainer.style.cursor = 'grabbing';
        startX = e.pageX - showcaseContainer.offsetLeft;
        scrollLeft = showcaseContainer.scrollLeft;
    });
    
    showcaseContainer.addEventListener('mouseleave', () => {
        isDown = false;
        showcaseContainer.style.cursor = 'grab';
    });
    
    showcaseContainer.addEventListener('mouseup', () => {
        isDown = false;
        showcaseContainer.style.cursor = 'grab';
    });
    
    showcaseContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        isDragging = true;
        const x = e.pageX - showcaseContainer.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        showcaseContainer.scrollLeft = scrollLeft - walk;
    });
    
    showcaseContainer.style.cursor = 'grab';
});

// Theme Switch Logic
let currentMockupImage = ""; // To track user custom selection

function switchTheme(mode) {
    const darkShowcase = document.getElementById('dark-showcase');
    const lightShowcase = document.getElementById('light-showcase');
    const heroImg = document.getElementById('user-mockup-img');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // Only reset to Dashboard if the user hasn't clicked a custom image, OR if we want to reset it naturally
    // For simplicity, we just reset it to Dashboard as before, 
    // unless they clicked something, in which case we swap to the light/dark version of what they clicked!
    // But since it's hard to track the exact pair without complex logic, we'll just stick to default reset behavior for now.

    if (mode === 'light') {
        darkShowcase.style.display = 'none';
        lightShowcase.style.display = 'block';
        heroImg.src = 'mockup_png/The%20Hub%20-%20Light.png';
        tabBtns[0].classList.remove('active');
        tabBtns[1].classList.add('active');
    } else {
        darkShowcase.style.display = 'block';
        lightShowcase.style.display = 'none';
        heroImg.src = 'mockup_png/The%20Hub.png';
        tabBtns[0].classList.add('active');
        tabBtns[1].classList.remove('active');
    }
}

// Click to view mockup in hero section
const showcaseItems = document.querySelectorAll('.showcase-item');
showcaseItems.forEach(item => {
    item.addEventListener('click', () => {
        if (isDragging) return; // Prevent click if user is dragging to scroll
        const imgSrc = item.querySelector('img').src;
        const heroImg = document.getElementById('user-mockup-img');
        heroImg.src = imgSrc;
        
        // Highlight active card
        showcaseItems.forEach(card => card.style.borderColor = 'var(--border-color)');
        item.style.borderColor = 'var(--primary)';
        
        // Smooth scroll to view it
        document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
    });
});
