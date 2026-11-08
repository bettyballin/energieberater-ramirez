# Redesign energieberater-ramirez.de — Änderungen (Branch `design-redesign`, 08.11.2026)

## Einspielen
Variante A (empfohlen): `git apply --index redesign.patch` im Repo auf `design-redesign`, dann committen.
Variante B: Dateien aus diesem Zip 1:1 ins Repo kopieren (Pfade sind erhalten).

Danach optional aufräumen (nicht mehr referenziert):
```
git rm base.css header.css hero.css ueber-mich.css leistungen.css kontakt.css footer.css \
       weiterbildungen.css modal.css legal-pages.css faq.css sections.css redesign.css \
       hero-haus.webp logo.webp logo2.png logo3.png logo_final.png logo_ramirez.png logo_outline.png \
       logo_espanol.png logo_espanol2.png logo_espanol_nob.png logo_haus.png gih.png gih2.png \
       Lebenslauf.docx gih-logo-mitglied-rgb-1500px.eps
```
(`logo.png`, `hero-haus.jpg`, `ramirez.jpg` bleiben als Fallback/OG-Image.)

## Neu
- `styles.css` — einzige CSS-Quelle (Tokens, Komponenten, Unterseiten, Werdegang). `styles.min.css` wird daraus gebaut.
- `build.py` — `python3 build.py` erzeugt `styles.min.css` (benötigt `pip install rcssmin`).
- `fonts/` — Inter + Source Serif 4 als Variable-WOFF2 (Latin-Subset, selbst gehostet, OFL-Lizenzen beigelegt). Keine Google-Fonts-Requests.
- `hero-haus-{800,1200,1500}.webp`, `logo-400.{webp,png}` — responsive/kompakte Bildvarianten.
- `favicon.ico` (13 KB, mehrgrößig, vorher 2,2 MB), `apple-touch-icon.png` aus dem Haus-Icon.

## Geändert
- `index.html` — komplett neue Struktur: Split-Hero, Qualifikationsleiste, redaktionelle Leistungsliste, „Warum Ramirez“, Kennzahlen, 4-Schritte-Ablauf, **Honorar & Förderung**, Kontakt (Consent-Checkbox + Honeypot), FAQ (7 Fragen, JSON-LD synchron), Footer. Title/Description/Schema aktualisiert (ProfessionalService, areaServed, Offer-URLs).
- Leistungsseiten (4) — neuer Header/Footer, Page-Hero mit Breadcrumb, Lesespalte + Sticky-Aside, CTA-Band; „BAFA-zertifiziert“ → „dena-gelistet“.
- `werdegang.html` — Header/Footer/Hero angepasst, Anker `#leistungen`, CTA-Texte.
- `impressum.html` — § 5 TMG → § 5 DDG, §§ 7–10 TMG → DDG, § 55 Abs. 2 RStV → § 18 Abs. 2 MStV; Mitgliedschaften als Liste.
- `datenschutz.html` — neue Abschnitte: Versand über EmailJS, Skript-Einbindung über jsDelivr, lokale Schriften. **TODO (Kommentar im HTML): EmailJS-Anbieterangaben, AVV, Drittland prüfen.**
- `blog.html` — „Ratgeber – in Vorbereitung“, `noindex`, aus Navigation und Sitemap entfernt.
- `404.html` — neues Layout.
- `script.js` — neu: null-sicher auf allen Seiten, deutsche Meldungen, aria-expanded, Consent-Pflicht, Honeypot, kein console.log von Formulardaten.
- `sitemap.xml` — Blog raus, lastmod aktualisiert.

## Fachlich bitte prüfen (Jairo)
- Förderzahlen: 50 % / max. 650 € (EFH/ZFH) / 850 € (ab 3 WE) — Stand Okt 2026 laut BAFA.
- iSFP-Bonus: 5 Prozentpunkte, seit 21.07.2026 nur ab 30.000 € förderfähiger Investition (so jetzt auf der Seite).
- Aussagen „Festpreisangebot vor Auftrag“, „Antwort innerhalb von 24 Stunden“, „Mo–Fr 08–18 Uhr“, „BAFA-Antrag stelle ich für Sie“, „herstellerneutral, keine Provision“ — alles aus bestehenden Inhalten abgeleitet bzw. ergänzt; muss zur Praxis passen.
- Hoster in der Datenschutzerklärung weiterhin anonym; Haftungstexte sagen „wir“.
