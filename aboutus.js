// Animation on scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-up');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Optional: Smooth scroll for CTA button
    document.querySelector('.cta-button').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
});