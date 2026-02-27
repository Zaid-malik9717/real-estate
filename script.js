/* ============================================
   VIP REAL ESTATE — MAIN JAVASCRIPT
   ============================================ */

// ── Preloader ──
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 1800);
});

// ── DOM Elements ──
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const backToTop = document.getElementById('back-to-top');
const propertyModal = document.getElementById('property-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

// ── Property Data ──
const properties = [
    {
        title: 'Sunset Luxury Villa',
        location: 'Miami Beach, FL',
        price: '$4,500,000',
        image: 'images/luxury_villa.png',
        description: 'Stunning waterfront villa with panoramic ocean views, infinity pool, and private dock. This exquisite property features open-plan living spaces, a chef\'s kitchen with top-of-the-line appliances, and a master suite with a private balcony overlooking the bay. The expansive outdoor area includes a heated infinity pool, spa, outdoor kitchen, and beautifully landscaped tropical gardens.',
        beds: 5,
        baths: 4,
        sqft: '6,200',
        garage: 3
    },
    {
        title: 'Skyline Penthouse Suite',
        location: 'Manhattan, NY',
        price: '$8,200,000',
        image: 'images/modern_penthouse.png',
        description: 'Ultra-luxury penthouse with 360° city views, private terrace, and concierge services. This crown jewel features floor-to-ceiling windows, custom Italian marble flooring, Bulthaup kitchen, private elevator, and a wraparound terrace overlooking Central Park and the iconic Manhattan skyline. Full-service building amenities include 24/7 concierge, fitness center, and private screening room.',
        beds: 4,
        baths: 5,
        sqft: '5,800',
        garage: 2
    },
    {
        title: 'Beachfront Paradise Villa',
        location: 'Malibu, CA',
        price: '$6,750,000',
        image: 'images/beachfront_house.png',
        description: 'Contemporary beachfront living with floor-to-ceiling glass walls and direct ocean access. This architectural masterpiece seamlessly blends indoor and outdoor living with retractable glass walls, a private beach, and an infinity-edge pool that appears to merge with the Pacific Ocean. Features include a wine cellar, home theater, and a private meditation garden.',
        beds: 6,
        baths: 6,
        sqft: '7,500',
        garage: 4
    },
    {
        title: 'Downtown Luxury Apartment',
        location: 'Beverly Hills, CA',
        price: '$2,350,000',
        image: 'images/city_apartment.png',
        description: 'Sophistication meets comfort in this designer downtown residence with premium amenities. Featuring imported European fixtures, smart home technology throughout, a gourmet kitchen with Sub-Zero and Wolf appliances, and spa-inspired bathrooms with heated floors. The building offers a rooftop pool, residents\' lounge, and 24/7 valet service.',
        beds: 3,
        baths: 3,
        sqft: '3,200',
        garage: 2
    },
    {
        title: 'Grand Countryside Estate',
        location: 'Greenwich, CT',
        price: '$12,900,000',
        image: 'images/countryside_estate.png',
        description: 'Magnificent estate spanning 10 acres with manor house, guest house, and equestrian facilities. This timeless property features hand-carved stone detailing, a grand ballroom, library, professional-grade kitchen, and a wine cellar housing 2,000 bottles. The grounds include formal gardens, a pool pavilion, tennis court, and a 6-stall barn with riding arena.',
        beds: 8,
        baths: 10,
        sqft: '15,000',
        garage: 6
    },
    {
        title: 'Harbor View Penthouse',
        location: 'Dubai, UAE',
        price: '$5,600,000',
        image: 'images/modern_penthouse.png',
        description: 'Premium penthouse offering breathtaking harbor views with world-class amenities and services. This spectacular residence features a double-height living room, private pool on the terrace, smart home automation, and custom furnishings by a renowned Italian design house. Exclusive building amenities include a private marina, helipad access, and personal butler service.',
        beds: 4,
        baths: 4,
        sqft: '4,500',
        garage: 3
    }
];

// ── Navigation ──
// Scroll effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar
    if (scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 600) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link
    updateActiveNavLink();

    // AOS animations
    animateOnScroll();
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Back to top
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Hero Particles ──
function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = (60 + Math.random() * 40) + '%';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (6 + Math.random() * 10) + 's';
        particle.style.animationDelay = Math.random() * 8 + 's';
        container.appendChild(particle);
    }
}
createParticles();

// ── Counter Animation ──
function animateCounters() {
    const counters = document.querySelectorAll('.hero-stat-number');
    counters.forEach(counter => {
        if (counter.dataset.animated) return;

        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
                counter.dataset.animated = 'true';
            }
        };

        updateCounter();
    });
}

// Trigger counters when hero is visible
const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.getElementById('home');
if (heroSection) heroObserver.observe(heroSection);

// ── AOS (Animate on Scroll) ──
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.88) {
            const delay = el.getAttribute('data-aos-delay') || 0;
            setTimeout(() => {
                el.classList.add('aos-animate');
            }, parseInt(delay));
        }
    });
}

// Initial check
setTimeout(animateOnScroll, 100);

// ── Property Tabs (Filter) ──
const tabBtns = document.querySelectorAll('.tab-btn');
const propertyCards = document.querySelectorAll('.property-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active tab
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        propertyCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = '';
                card.style.animation = `fadeInUp 0.5s ease ${index * 0.08}s both`;
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add fadeInUp animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet);

// ── Favorite Toggle ──
document.querySelectorAll('.property-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        if (btn.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
});

// ── Property Modal ──
function openPropertyModal(index) {
    const property = properties[index];
    if (!property) return;

    modalBody.innerHTML = `
        <img class="modal-image" src="${property.image}" alt="${property.title}">
        <div class="modal-details">
            <h2>${property.title}</h2>
            <div class="modal-location">
                <i class="fas fa-map-marker-alt"></i> ${property.location}
            </div>
            <div class="modal-price">${property.price}</div>
            <p class="modal-description">${property.description}</p>
            <div class="modal-features">
                <div class="modal-feature">
                    <i class="fas fa-bed"></i>
                    <span>${property.beds} Bedrooms</span>
                </div>
                <div class="modal-feature">
                    <i class="fas fa-bath"></i>
                    <span>${property.baths} Bathrooms</span>
                </div>
                <div class="modal-feature">
                    <i class="fas fa-ruler-combined"></i>
                    <span>${property.sqft} sqft</span>
                </div>
                <div class="modal-feature">
                    <i class="fas fa-car"></i>
                    <span>${property.garage} Garage</span>
                </div>
            </div>
            <div class="modal-actions">
                <a href="#contact" class="btn btn-gold btn-lg" onclick="closePropertyModal()">
                    <i class="fas fa-calendar-check"></i>
                    <span>Schedule Viewing</span>
                </a>
                <a href="tel:+18001234567" class="btn btn-outline btn-lg">
                    <i class="fas fa-phone-alt"></i>
                    <span>Call Agent</span>
                </a>
            </div>
        </div>
    `;

    propertyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePropertyModal() {
    propertyModal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closePropertyModal);
propertyModal.addEventListener('click', (e) => {
    if (e.target === propertyModal) closePropertyModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePropertyModal();
});

// ── Testimonials Slider ──
const testimonialsTrack = document.getElementById('testimonials-track');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const dotsContainer = document.getElementById('testimonial-dots');

let currentSlide = 0;
const totalSlides = document.querySelectorAll('.testimonial-card').length;

// Create dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

function goToSlide(index) {
    currentSlide = index;
    testimonialsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
});

// Auto-slide
let autoSlideInterval = setInterval(() => {
    goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
}, 5000);

// Pause on hover
const slider = document.getElementById('testimonials-slider');
slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
slider.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
    }, 5000);
});

// ── Search Functionality ──
document.getElementById('search-btn').addEventListener('click', () => {
    const location = document.getElementById('search-location').value;
    const type = document.getElementById('search-type').value;
    const price = document.getElementById('search-price').value;

    // Scroll to properties
    document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });

    // Filter by type if selected
    if (type) {
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === type) {
                btn.classList.add('active');
                btn.click();
            }
        });
    }

    // Visual feedback
    const searchBtn = document.getElementById('search-btn');
    searchBtn.innerHTML = '<i class="fas fa-check"></i> <span>Found!</span>';
    setTimeout(() => {
        searchBtn.innerHTML = '<i class="fas fa-search"></i> <span>Search</span>';
    }, 2000);
});

// ── Contact Form ──
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const originalContent = submitBtn.innerHTML;
    
    // Loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Success state
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>Message Sent!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});

// ── Newsletter Form ──
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const btn = e.target.querySelector('button');
    const originalIcon = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-check"></i>';
    input.value = '';
    input.placeholder = 'Subscribed! ✓';
    
    setTimeout(() => {
        btn.innerHTML = originalIcon;
        input.placeholder = 'Your email address';
    }, 3000);
});

// ── Smooth scroll for all anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ── Parallax effect on hero ──
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }
});

// ── Cursor glow effect on service cards ──
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(201, 169, 110, 0.06), var(--color-glass))`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});

// ── Tilt effect on property cards ──
document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

console.log('%c VIP Real Estate 🏠', 'color: #c9a96e; font-size: 20px; font-weight: bold;');
console.log('%c Luxury Living Redefined', 'color: #9a9ab0; font-size: 12px;');
