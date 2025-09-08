// Form validation for contact form (simple version)
function validateForm() {
  let isValid = true;
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  // Clear previous error messages
  document.getElementById('nameError').textContent = '';
  document.getElementById('nameError').style.display = 'none';
  document.getElementById('emailError').textContent = '';
  document.getElementById('emailError').style.display = 'none';
  document.getElementById('messageError').textContent = '';
  document.getElementById('messageError').style.display = 'none';
  
  // Validate name
  if (nameInput.value.length < 2) {
    const lang = getLangFromURL();
    document.getElementById('nameError').textContent = translations[lang].nameError;
    document.getElementById('nameError').style.display = 'block';
    isValid = false;
  }
  
  // Validate email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(emailInput.value)) {
    const lang = getLangFromURL();
    document.getElementById('emailError').textContent = translations[lang].emailError;
    document.getElementById('emailError').style.display = 'block';
    isValid = false;
  }
  
  // Validate message
  if (messageInput.value.length < 10) {
    const lang = getLangFromURL();
    document.getElementById('messageError').textContent = translations[lang].messageError;
    document.getElementById('messageError').style.display = 'block';
    isValid = false;
  }
  
  return isValid;
}
/**
 * Shows the loading icon (e.g., during async operations).
 */
function startLoading() {
  const loadingIcon = document.getElementById('loadingIcon');
  loadingIcon.style.display = 'inline-block'; // Show the loading icon
}

/**
 * Hides the loading icon.
 */
function stopLoading() {
  const loadingIcon = document.getElementById('loadingIcon');
  loadingIcon.style.display = 'none';
}


// Modal functionality - Global functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }
}

/**
 * Section toggling and smooth scrolling
 * - On load: show only hero section, hide all others.
 * - On nav click: hide hero, show only the selected section.
 */
document.addEventListener('DOMContentLoaded', function () {
    const sectionIds = ['ueber-mich', 'leistungen', 'weiterbildungen', 'kontakt'];
    const sections = sectionIds.map(id => document.getElementById(id));
    const heroSection = document.getElementById('hero');
    const logo = document.querySelector('.logo');

    // Logo: start large, shrink on scroll
    const header = document.querySelector('header');
    if (logo) {
        logo.classList.add('logo-large');
        if (header) header.classList.remove('header-small');
        window.addEventListener('scroll', function () {
            if (window.scrollY > 20) {
                logo.classList.remove('logo-large');
                if (header) header.classList.add('header-small');
            } else {
                logo.classList.add('logo-large');
                if (header) header.classList.remove('header-small');
            }
        });
    }

    // On load: hide all sections except hero
    sections.forEach(section => section.classList.add('hidden-section'));
    if (heroSection) heroSection.classList.remove('hidden-section');

    // Add click event to nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').replace('#', '');
            if (sectionIds.includes(targetId)) {
                e.preventDefault();
                // Hide hero, show only the clicked section
                if (heroSection) heroSection.classList.add('hidden-section');
                sections.forEach(section => {
                    if (section.id === targetId) section.classList.remove('hidden-section');
                    else section.classList.add('hidden-section');
                });
                // No scroll to section; just show/hide
            } else if (targetId === '' || targetId === 'hero') {
                // "Startseite" clicked: show only hero, hide all others
                e.preventDefault();
                if (heroSection) heroSection.classList.remove('hidden-section');
                sections.forEach(section => section.classList.add('hidden-section'));
                // No scroll to top for Startseite
            }
        });
    });

    // --- Intro Banner Dynamic Update ---
    const introBanner = document.querySelector('.intro-banner');
    const introTitle = introBanner ? introBanner.querySelector('.intro-title') : null;
    const introDesc = introBanner ? introBanner.querySelector('.intro-desc') : null;

    // Section info map for fallback
    const sectionInfo = {
        'hero': {
            title: '',
            desc: ''
        },
        'ueber-mich': {
            title: document.getElementById('ueber-mich')?.dataset.title || 'Über Mich',
            desc: document.getElementById('ueber-mich')?.dataset.desc || ''
        },
        'leistungen': {
            title: document.getElementById('leistungen')?.dataset.title || 'Leistungen',
            desc: document.getElementById('leistungen')?.dataset.desc || ''
        },
        'weiterbildungen': {
            title: document.getElementById('weiterbildungen')?.dataset.title || 'Weiterbildungen',
            desc: document.getElementById('weiterbildungen')?.dataset.desc || ''
        },
        'kontakt': {
            title: document.getElementById('kontakt')?.dataset.title || 'Kontakt',
            desc: document.getElementById('kontakt')?.dataset.desc || ''
        }
    };

    function updateIntroBanner(sectionId) {
        if (!introBanner || !introTitle || !introDesc) return;
        if (sectionId === 'hero') {
            introBanner.style.display = 'none';
        } else {
            introBanner.style.display = '';
            const info = sectionInfo[sectionId];
            introTitle.textContent = info.title;
            introDesc.textContent = info.desc;
        }
    }

    // On nav click, update banner
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').replace('#', '');
            if (sectionIds.includes(targetId)) {
                updateIntroBanner(targetId);
            }
        });
    });

    // On load, show Startseite
    updateIntroBanner('hero');
      
    // EmailJS integration for contact form
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('status');
    let emailTimeout;

    // Check if EmailJS is properly loaded
    function isEmailJSLoaded() {
        return typeof emailjs !== 'undefined' && emailjs.hasOwnProperty('init');
    }

    // Validate contact form fields (stricter than validateForm)
    function validateContactForm() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        let isValid = true;

        // Validate name (at least 2 characters)
        if (!nameInput.value || nameInput.value.trim().length < 2) {
        isValid = false;
        nameInput.classList.add('invalid-input');
        } else {
        nameInput.classList.remove('invalid-input');
        }

        // Validate email (using a simple regex pattern)
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailInput.value || !emailPattern.test(emailInput.value)) {
        isValid = false;
        emailInput.classList.add('invalid-input');
        } else {
        emailInput.classList.remove('invalid-input');
        }

        // Validate message (at least 10 characters)
        if (!messageInput.value || messageInput.value.trim().length < 10) {
        isValid = false;
        messageInput.classList.add('invalid-input');
        } else {
        messageInput.classList.remove('invalid-input');
        }

        return isValid;
    }

    // Add an event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Clear any previous status
        statusDiv.textContent = '';
        statusDiv.className = '';
        
        // Validate form
        if (!validateContactForm()) {
        statusDiv.textContent = 'Please fill out all fields correctly.';
        statusDiv.className = 'error-message';
        return;
        }
        
        // Check if EmailJS is loaded
        if (!isEmailJSLoaded()) {
        statusDiv.textContent = 'Email service not available. Please try again later or contact directly via email.';
        statusDiv.className = 'error-message';
        return;
        }
        
        // Show loading icon with a small delay to ensure it renders properly
        setTimeout(() => {
        startLoading();
        }, 10);
        
        // Set a timeout to hide the loading icon if the email sending takes too long
        emailTimeout = setTimeout(() => {
        statusDiv.textContent = 'Request is taking longer than expected. Please wait...';
        // Keep the loading icon visible
        }, 5000);
        
        // Disable form inputs during submission
        const formInputs = form.querySelectorAll('input, textarea, button');
        formInputs.forEach(input => input.disabled = true);
        
        // Get form data
        const formData = {
        from_name: document.getElementById('name').value,
        from_mail: document.getElementById('email').value,
        message: document.getElementById('message').value
        };
        
        // Log form data for debugging
        console.log("Sending email with data:", formData);
        
        // Use emailjs.send instead of sendForm to explicitly pass the form data
        emailjs.send("service_", "template_", formData)
        .then(() => {
            clearTimeout(emailTimeout);
            statusDiv.textContent = 'Message sent successfully!';
            statusDiv.className = 'success-message';
            form.reset(); // Clear the form fields
            stopLoading();
            
            // Re-enable form inputs
            formInputs.forEach(input => input.disabled = false);
        }, (error) => {
            clearTimeout(emailTimeout);
            console.error("EmailJS Error:", error);
            statusDiv.textContent = 'Error sending message. Please try again or contact directly via email.';
            statusDiv.className = 'error-message';
            stopLoading();
            
            // Re-enable form inputs
            formInputs.forEach(input => input.disabled = false);
        });
    });
    
    // Initialize modal event listeners
    const modals = document.querySelectorAll('.modal-overlay');
    
    modals.forEach(modal => {
        // Click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Escape key to close any open modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    closeModal(modal.id);
                }
            });
        }
    });
});