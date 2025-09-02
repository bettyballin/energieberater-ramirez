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
});