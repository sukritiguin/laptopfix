async function renderServices(filter = 'all') {
    const container = document.getElementById('services-container');
    container.innerHTML = '';
    
    try {
        // Adjust the path according to your folder structure
        const response = await fetch('services.json'); // or './data/services.json' depending on your structure
        const data = await response.json();
        
        data.services.forEach(service => {
            if (filter === 'all' || service.category === filter) {
                const serviceHTML = `
                    <div class="col-md-6 col-lg-4 col-xl-3 mt-3 mb-3 fade-in">
                        <div class="card service-card h-100">
                            <div class="card-body text-center">
                                <div class="service-icon">
                                    <img src="${service.icon}" alt="${service.title}">
                                </div>
                                <h4 class="service-title">${service.title}</h4>
                                <p class="service-description">${service.description}</p>
                                <button class="btn btn-service" data-bs-toggle="collapse" data-bs-target="#details-${service.id}">Learn More</button>
                            </div>
                            <div class="collapse" id="details-${service.id}">
                                <div class="service-details">
                                    <p>${service.details}</p>
                                    <button class="btn btn-outline-primary btn-sm mt-2 w-100" data-bs-toggle="modal" data-bs-target="#contactModal" data-service="${service.title}">
                                        Get a Quote
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', serviceHTML);
            }
        });
        
        // Trigger animations after content is loaded
        animateOnScroll();
    } catch (error) {
        console.error('Error loading services:', error);
        container.innerHTML = '<div class="col-12 text-center text-danger">Failed to load services. Please try again later.</div>';
    }
}

// Initial render when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderServices();

    // Filter buttons functionality
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderServices(this.dataset.filter);
        });
    });

    // Service quote buttons in modal
    document.addEventListener('click', function(e) {
        if (e.target.closest('[data-service]')) {
            const serviceName = e.target.closest('[data-service]').getAttribute('data-service');
            document.getElementById('service').value = serviceName.toLowerCase().includes('screen') ? 'screen-repair' : 
                                                   serviceName.toLowerCase().includes('battery') ? 'battery-replacement' : 
                                                   serviceName.toLowerCase().includes('data') ? 'data-recovery' : 'other';
        }
    });
});

// Animation on scroll functionality
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

// Run on scroll
window.addEventListener('scroll', animateOnScroll);