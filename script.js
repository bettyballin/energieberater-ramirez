/**
 * Section toggling and smooth scrolling
 * - On load: show only hero section, hide all others.
 * - On nav click: hide hero, show only the selected section.
 */
document.addEventListener('DOMContentLoaded', function () {
    const sectionIds = ['ueber-mich', 'leistungen', 'weiterbildungen', 'kontakt'];
    const sections = sectionIds.map(id => document.getElementById(id));
    sections.forEach(section => section.classList.add('hidden-section'));

    // Add click event to nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').replace('#', '');
            if (sectionIds.includes(targetId)) {
                e.preventDefault();
                // Hide all sections, show only the clicked section
                sections.forEach(section => {
                    if (section.id === targetId) section.classList.remove('hidden-section');
                    else section.classList.add('hidden-section');
                });
                // Smooth scroll to the section
                document.getElementById(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Intro Banner Dynamic Update ---
    const introBanner = document.querySelector('.intro-banner');
    const introTitle = introBanner ? introBanner.querySelector('.intro-title') : null;
    const introDesc = introBanner ? introBanner.querySelector('.intro-desc') : null;

    // Section info map for fallback
    const sectionInfo = {
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
        const info = sectionInfo[sectionId];
        introTitle.textContent = info.title;
        introDesc.textContent = info.desc;
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