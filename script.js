/**
 * Section toggling and smooth scrolling
 * - On load: show only hero section, hide all others.
 * - On nav click: hide hero, show only the selected section.
 */
document.addEventListener('DOMContentLoaded', function () {
    const sectionIds = ['ueber-mich', 'leistungen', 'weiterbildungen', 'kontakt'];
    const sections = sectionIds.map(id => document.getElementById(id));
    const hero = document.getElementById('hero');

    // On load: show only hero, hide all other sections
    sections.forEach(section => section.classList.add('hidden-section'));
    if (hero) hero.classList.remove('hidden-section');

    // Add click event to nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').replace('#', '');
            if (sectionIds.includes(targetId)) {
                e.preventDefault();
                // Hide hero, hide all sections, show only the clicked section
                if (hero) hero.classList.add('hidden-section');
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
});