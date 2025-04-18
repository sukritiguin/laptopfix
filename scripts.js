// Smooth scrolling for Learn More and CTA buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
  

//   document.addEventListener("DOMContentLoaded", function () {
//     const container = document.getElementById("services-container");
  
//     fetch("services.json")
//       .then(response => response.json())
//       .then(services => {
//         services.forEach(service => {
//           const card = document.createElement("div");
//           card.className = "col-md-6 col-lg-4";
  
//           card.innerHTML = `
//             <div class="card h-100 service-card shadow-sm border-0">
//               <div class="card-body text-center">
//                 <img src="${service.icon}" alt="${service.title}" class="mb-3 img-fluid" style="max-height:64px;">
//                 <h5 class="fw-bold">${service.title}</h5>
//                 <p>${service.description}</p>
//                 <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#${service.id}">Learn More</button>
//               </div>
//               <div class="collapse px-3 pb-3" id="${service.id}">
//                 <p class="mb-1">${service.details}</p>
//               </div>
//             </div>
//           `;
  
//           container.appendChild(card);
//         });
//       })
//       .catch(err => {
//         container.innerHTML = `<p class="text-danger">Failed to load services. Please try again later.</p>`;
//         console.error("Error loading services:", err);
//       });
//   });



document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS (replace with your actual User ID)
    emailjs.init('wQY-RPnW1YfQR4F-C');
    
    const contactForm = document.getElementById('repair-form');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const submitText = submitBtn.querySelector('.submit-text');
    const spinner = submitBtn.querySelector('.spinner-border');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      submitText.textContent = 'Sending...';
      spinner.classList.remove('d-none');
      submitBtn.disabled = true;
      
      // Send email
      emailjs.sendForm('service_b5733vc', 'template_sx1x6rf', this)
        .then(() => {
          // Success
          submitText.textContent = 'Message Sent!';
          contactForm.reset();
          
          // Show confirmation
          const alert = document.createElement('div');
          alert.className = 'alert alert-success mt-3';
          alert.textContent = 'Thank you! We\'ll contact you shortly.';
          contactForm.appendChild(alert);
          
          // Remove after 5s
          setTimeout(() => alert.remove(), 5000);
        })
        .catch((error) => {
          // Error
          submitText.textContent = 'Send Request';
          console.error('Failed:', error);
          
          const alert = document.createElement('div');
          alert.className = 'alert alert-danger mt-3';
          alert.textContent = 'Failed to send. Please call us directly.';
          contactForm.appendChild(alert);
        })
        .finally(() => {
          spinner.classList.add('d-none');
          submitBtn.disabled = false;
          setTimeout(() => submitText.textContent = 'Send Request', 3000);
        });
    });
  });