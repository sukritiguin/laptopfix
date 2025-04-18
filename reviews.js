
const testimonialContainer = document.getElementById("testimonial-container");

fetch("reviews.json")
.then(res => res.json())
.then(data => {
    createTestimonialCarousel(data);
});

function getStars(rating) {
const full = Math.floor(rating);
const half = rating % 1 >= 0.5;
return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - (half ? 1 : 0));
}

function createTestimonialCarousel(reviews) {
const wrapper = document.createElement("div");
wrapper.className = "testimonial-slide";
wrapper.innerHTML = `<div class="testimonial-inner" id="testimonialInner"></div>`;
testimonialContainer.appendChild(wrapper);

const inner = document.getElementById("testimonialInner");

reviews.forEach(review => {
    const item = document.createElement("div");
    item.className = "testimonial-item";
    item.innerHTML = `
    <div class="testimonial-card">
        <div class="d-flex align-items-center mb-3">
        <img src="${review.profile_photo || 'https://via.placeholder.com/60'}" class="profile-img" alt="${review.name}">
        <div>
            <h6 class="mb-0">${review.name}</h6>
            <small class="text-muted">${new Date(review.date).toDateString()}</small>
        </div>
        </div>
        <div class="testimonial-text">"${review.review}"</div>
        <div class="testimonial-stars">${getStars(review.rating)}</div>
    </div>
    `;
    inner.appendChild(item);
});

startAutoSlide(inner, reviews.length);
}

function startAutoSlide(container, totalItems) {
let index = 0;
const showCount = window.innerWidth < 768 ? 1 : 3;

setInterval(() => {
    index++;
    if (index > totalItems - showCount) index = 0;
    container.style.transform = `translateX(-${index * (100 / showCount)}%)`;
}, 4000);
}
