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

// Simple horizontal scroll behavior for showcase track with mouse wheel
const showcaseContainer = document.querySelector('.showcase-container');
if(showcaseContainer) {
    showcaseContainer.addEventListener('wheel', (evt) => {
        // Prevent default vertical scrolling if the user is scrolling over the showcase but don't prevent completely tracking
        // Just make scrolling sideways works nicely. Often nice to have Shift+Wheel scroll horizontally native,
        // but let's add simple click and drag to scroll.
    });

    let isDown = false;
    let startX;
    let scrollLeft;

    showcaseContainer.addEventListener('mousedown', (e) => {
        isDown = true;
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
        const x = e.pageX - showcaseContainer.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        showcaseContainer.scrollLeft = scrollLeft - walk;
    });
    
    showcaseContainer.style.cursor = 'grab';
}
