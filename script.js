// MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


// PROPERTY SEARCH

const searchButton = document.getElementById("search-button");
const propertyCards = document.querySelectorAll(".property-card");

const propertyTypes = ["House", "House", "Apartment"];

propertyCards.forEach((card, index) => {
    card.dataset.type = propertyTypes[index];
});

searchButton.addEventListener("click", () => {

    const selectedType = document.getElementById("property-type").value;
    const selectedLocation = document.getElementById("location").value.toLowerCase().trim();
    const selectedBudget = Number(document.getElementById("budget").value);

    let visibleProperties = 0;

    propertyCards.forEach(card => {

        const propertyType = card.dataset.type;
        const propertyLocation = card.querySelector(".property-location").textContent.toLowerCase();
        const propertyPrice = Number(
            card.querySelector(".property-price").textContent.replace(/[^0-9]/g, "")
        );

        const matchesType = !selectedType || propertyType === selectedType;
        const matchesLocation = !selectedLocation || propertyLocation.includes(selectedLocation);
        const matchesBudget = !selectedBudget || propertyPrice <= selectedBudget;

        if (matchesType && matchesLocation && matchesBudget) {
            card.style.display = "block";
            visibleProperties++;
        } else {
            card.style.display = "none";
        }

    });

    if (visibleProperties === 0) {
        alert("No properties match your search. Please try different filters.");
    }
    
    document.getElementById("properties").scrollIntoView({
    behavior: "smooth"
    });

});


// WHATSAPP CONTACT

const whatsappButton = document.querySelector(".whatsapp-button");

const whatsappNumber = "2340000000000";

whatsappButton.addEventListener("click", (event) => {

    event.preventDefault();

    const message = "Hello Havenstone Properties, I am interested in your properties. Please provide more information.";

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

});

// EXPLORE ALL PROPERTIES

const viewAllButton = document.querySelector(".view-all");

viewAllButton.addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById("property-type").value = "";
    document.getElementById("location").value = "";
    document.getElementById("budget").value = "";

    propertyCards.forEach(card => {
        card.style.display = "block";
    });

    document.getElementById("properties").scrollIntoView({
        behavior: "smooth"
    });
});

// PROPERTY DETAILS POP-UP

const propertyDescriptions = [
    "A beautiful modern residence featuring spacious living areas, elegant interiors and premium finishing. Ideal for families seeking comfort and luxury.",
    "A contemporary family home with generous living spaces, stylish architecture and excellent surroundings. Perfect for luxury living.",
    "An elegant executive apartment featuring modern interiors, comfortable bedrooms and convenient access to major business areas."
];

const propertyModal = document.createElement("div");

propertyModal.className = "property-modal";

propertyModal.innerHTML = `
    <div class="property-modal-content">
        <button class="modal-close">&times;</button>
        <img class="modal-image" src="" alt="Property image">

        <div class="modal-info">
            <p class="modal-location"></p>
            <h2 class="modal-title"></h2>
            <h3 class="modal-price"></h3>
            <p class="modal-description"></p>
            <div class="modal-details"></div>
            <a class="modal-whatsapp" href="#" target="_blank">
                Enquire on WhatsApp
            </a>
        </div>
    </div>
`;

document.body.appendChild(propertyModal);

const closeModal = () => {
    propertyModal.classList.remove("active");
};

document.querySelector(".modal-close").addEventListener("click", closeModal);

propertyModal.addEventListener("click", (event) => {
    if (event.target === propertyModal) {
        closeModal();
    }
});

propertyCards.forEach((card, index) => {

    const detailsButton = card.querySelector(".property-details-button");

    detailsButton.addEventListener("click", () => {

        const image = card.querySelector(".property-image img").src;
        const location = card.querySelector(".property-location").textContent;
        const title = card.querySelector("h3").textContent;
        const price = card.querySelector(".property-price").textContent;
        const details = card.querySelector(".property-details").innerHTML;

        propertyModal.querySelector(".modal-image").src = image;
        propertyModal.querySelector(".modal-location").textContent = location;
        propertyModal.querySelector(".modal-title").textContent = title;
        propertyModal.querySelector(".modal-price").textContent = price;
        propertyModal.querySelector(".modal-description").textContent = propertyDescriptions[index];
        propertyModal.querySelector(".modal-details").innerHTML = details;

        const message = `Hello Havenstone Properties, I am interested in ${title} located in ${location}. Please provide more information.`;

        propertyModal.querySelector(".modal-whatsapp").href =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        propertyModal.classList.add("active");

    });

});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

// CONTACT FORM SUBMISSION

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const enquiry = document.getElementById("enquiry-type").value;
    const message = document.getElementById("contact-message").value.trim();

    const whatsappMessage = `
New Property Enquiry

Name: ${name}
Email: ${email}
Phone: ${phone}
Enquiry: ${enquiry}

Message: ${message}
    `;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, "_blank");

    contactForm.reset();
});

// SCROLL REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(
    ".section-heading, .feature-card, .service-card, .testimonial-card, .stat-item, .about-image, .about-content, .contact-content, .contact-form-container"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    element.classList.add("reveal");

    revealObserver.observe(element);
});