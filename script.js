/**
 * Energieberater Ramirez — script.js
 * - Mobile-Navigation (Hamburger + Overlay)
 * - Header verkleinert sich beim Scrollen
 * - Kontaktformular: Validierung, Einwilligung, Honeypot, Versand via EmailJS
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    /* ---------------- Mobile-Navigation ---------------- */
    var hamburger = document.getElementById('hamburgerMenu');
    var drawer = document.getElementById('headerContent');
    var overlay = document.getElementById('mobileOverlay');

    function setMenu(open) {
      if (!drawer) return;
      drawer.classList.toggle('active', open);
      if (hamburger) {
        hamburger.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        hamburger.setAttribute('aria-label', open ? 'Navigation schließen' : 'Navigation öffnen');
      }
      if (overlay) overlay.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    if (hamburger) {
      hamburger.addEventListener('click', function () {
        setMenu(!drawer.classList.contains('active'));
      });
    }
    if (overlay) overlay.addEventListener('click', function () { setMenu(false); });

    document.querySelectorAll('.header-content a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) setMenu(false);
    });

    /* ---------------- Header beim Scrollen ---------------- */
    var header = document.querySelector('header');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('header-small', window.scrollY > 24);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ---------------- Kontaktformular ---------------- */
    var form = document.getElementById('contactForm');
    if (!form) return;

    var statusDiv = document.getElementById('status');
    var loadingIcon = document.getElementById('loadingIcon');
    var fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      message: document.getElementById('message'),
      consent: document.getElementById('consent'),
      honeypot: document.getElementById('website')
    };
    var errors = {
      name: document.getElementById('nameError'),
      email: document.getElementById('emailError'),
      message: document.getElementById('messageError'),
      consent: document.getElementById('consentError')
    };
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setError(key, text) {
      var el = errors[key];
      var field = fields[key];
      if (el) { el.textContent = text || ''; el.style.display = text ? 'block' : 'none'; }
      if (field && field.classList) field.classList.toggle('invalid-input', !!text);
      if (field) field.setAttribute('aria-invalid', text ? 'true' : 'false');
    }

    function setStatus(text, type) {
      if (!statusDiv) return;
      statusDiv.textContent = text || '';
      statusDiv.className = type ? type + '-message' : '';
    }

    function validate() {
      var ok = true;
      if (!fields.name || fields.name.value.trim().length < 2) { setError('name', 'Bitte geben Sie Ihren Namen an.'); ok = false; } else setError('name', '');
      if (!fields.email || !EMAIL_RE.test(fields.email.value.trim())) { setError('email', 'Bitte geben Sie eine gültige E-Mail-Adresse an.'); ok = false; } else setError('email', '');
      if (!fields.message || fields.message.value.trim().length < 10) { setError('message', 'Bitte beschreiben Sie Ihr Anliegen in mindestens 10 Zeichen.'); ok = false; } else setError('message', '');
      if (fields.consent && !fields.consent.checked) { setError('consent', 'Bitte bestätigen Sie den Datenschutzhinweis.'); ok = false; } else setError('consent', '');
      return ok;
    }

    ['name', 'email', 'message'].forEach(function (key) {
      if (fields[key]) fields[key].addEventListener('input', function () { if (fields[key].classList.contains('invalid-input')) validate(); });
    });
    if (fields.consent) fields.consent.addEventListener('change', function () { if (fields.consent.checked) setError('consent', ''); });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      setStatus('');

      // Honeypot: Bots füllen das versteckte Feld aus — still verwerfen.
      if (fields.honeypot && fields.honeypot.value) {
        form.reset();
        setStatus('Vielen Dank für Ihre Nachricht.', 'success');
        return;
      }

      if (!validate()) {
        setStatus('Bitte prüfen Sie die markierten Felder.', 'error');
        var firstInvalid = form.querySelector('.invalid-input, [aria-invalid="true"]');
        if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
        return;
      }

      if (typeof window.emailjs === 'undefined' || typeof window.emailjs.send !== 'function') {
        setStatus('Der Versand ist gerade nicht verfügbar. Bitte schreiben Sie direkt an info@energieberater-ramirez.de oder rufen Sie an.', 'error');
        return;
      }

      var controls = form.querySelectorAll('input, textarea, button');
      controls.forEach(function (c) { c.disabled = true; });
      if (loadingIcon) loadingIcon.style.display = 'inline-block';

      var slowTimer = setTimeout(function () {
        setStatus('Der Versand dauert etwas länger als üblich – bitte einen Moment Geduld.');
      }, 6000);

      var payload = {
        from_name: fields.name.value.trim(),
        from_mail: fields.email.value.trim(),
        message: fields.message.value.trim()
      };

      window.emailjs.send('service_npdni2c', 'template_z20cxdh', payload).then(function () {
        clearTimeout(slowTimer);
        form.reset();
        setStatus('Vielen Dank – Ihre Anfrage ist eingegangen. Ich melde mich in der Regel innerhalb von 24 Stunden.', 'success');
      }, function () {
        clearTimeout(slowTimer);
        setStatus('Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@energieberater-ramirez.de.', 'error');
      }).then(function () {
        if (loadingIcon) loadingIcon.style.display = 'none';
        controls.forEach(function (c) { c.disabled = false; });
      });
    });
  });
})();
