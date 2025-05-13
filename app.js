document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Mobile Menu
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');

    const handleResize = () => {
        navLinks.style.display = window.innerWidth > 768 ? 'flex' : 'none';
    };

    const toggleMenu = (e) => {
        if (window.innerWidth <= 768 && e.target.closest('nav')) {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        }
    };

    window.addEventListener('resize', handleResize);
    nav.addEventListener('click', toggleMenu);
    handleResize(); // Initial check

    // Park Cards
    document.querySelectorAll('.learn-more').forEach(button => {
        button.addEventListener('click', (e) => {
            if (!button.classList.contains('expandable')) return;
            e.preventDefault();
            const description = button.previousElementSibling;
            description.classList.toggle('expanded');
            button.textContent = description.classList.contains('expanded') 
                ? 'Show Less' 
                : 'Learn More';
        });
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.park-card').forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(term) ? 'block' : 'none';
            });
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const statusEl = document.getElementById('formStatus');

            submitBtn.disabled = true;
            statusEl.style.display = 'none';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    statusEl.textContent = 'Message sent successfully!';
                    statusEl.className = 'success';
                    contactForm.reset();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                statusEl.textContent = 'Error sending message. Please try again.';
                statusEl.className = 'error';
            } finally {
                submitBtn.disabled = false;
                statusEl.style.display = 'block';
                setTimeout(() => {
                    statusEl.style.display = 'none';
                }, 5000);
            }
        });
    }
});