document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.2
    };

    // Split text into spans for reveal effect
    const revealText = document.getElementById('revealText');
    if (revealText) {
        const text = revealText.innerText;
        revealText.innerHTML = text.split(' ').map(word => `<span>${word}</span>`).join(' ');
    }

    // Scroll Animations (Intersection Observer)

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Counters
                if (entry.target.classList.contains('stat-box')) {
                    const counter = entry.target.querySelector('.counter');
                    const target = +counter.getAttribute('data-target');
                    const speed = 200;

                    const updateCount = () => {
                        const count = +counter.innerText;
                        const inc = target / speed;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                    observer.unobserve(entry.target); // Run once
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.stat-box').forEach(el => observer.observe(el));

    // Text Reveal on Scroll
    window.addEventListener('scroll', () => {
        if (revealText) {
            const rect = revealText.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how much of the element is visible or passed
            // We want the effect to start when the element enters the viewport and finish when it's fully visible or slightly after
            const start = windowHeight * 0.8; // Start when element is 80% down the viewport
            const end = windowHeight * 0.2;   // End when element is 20% down (scrolled past)

            // Normalize position between 0 and 1
            let percentage = (start - rect.top) / (start - end);
            percentage = Math.max(0, Math.min(1, percentage));

            const spans = revealText.querySelectorAll('span');
            const activeCount = Math.floor(spans.length * percentage);

            spans.forEach((span, index) => {
                if (index < activeCount) {
                    span.classList.add('active');
                } else {
                    span.classList.remove('active');
                }
            });
        }
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
});
