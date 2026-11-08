# Redesign energieberater-ramirez.de — v9 – dunkler Header, Foto-Hero nach Vorlage (Branch `design-redesign`, 08.11.2026)

## Einspielen
A) `git apply --index redesign.patch` im Repo auf `design-redesign`, committen, pushen.
B) Dateien aus diesem Zip 1:1 ins Repo kopieren (Pfade erhalten).

Danach aufräumen (nicht mehr referenziert):
```
git rm base.css header.css hero.css ueber-mich.css leistungen.css kontakt.css footer.css \
       weiterbildungen.css modal.css legal-pages.css faq.css sections.css redesign.css \
       hero-haus.webp logo.webp logo.png logo2.png logo3.png logo_final.png logo_ramirez.png logo_outline.png \
       logo_espanol.png logo_espanol2.png logo_espanol_nob.png logo_haus.png gih.png gih2.png \
       Lebenslauf.docx gih-logo-mitglied-rgb-1500px.eps
```
Deploy per SFTP ohne `.git`, `.claude`, `.vscode`, `plans`, `*.md`, `*.py`.

## Logo (v5, final)
- Zeichen: Haus als Monoline in Website-Navy #0E2235 (auf dunklem Grund weiß), Energielabel-Etikett „A" in Klasse-A-Grün #009640 mit weißem A; das Etikett sitzt auf der linken Hauskante (bündig mit der Dachtraufe, überlappt die linke Wand, Spitze zeigt ins Haus).
- Wortmarke „RAMIREZ" Source Serif 4 (600), Tagline „ENERGIEBERATUNG" Inter (500) – ausgezeichnet, keine Font-Abhängigkeit.
- Dateien: `logo.svg` (Header), `logo-dark.svg` (Footer), `logo-stacked.svg` / `logo-stacked-dark.svg` (Visitenkarte, Social, Fahrzeug), `logo-icon.svg` (Zeichen allein),
  `favicon.svg`, `favicon.ico` (16/32/48), `apple-touch-icon.png` (180, Navy-Hintergrund).
- Alle Seiten: SVG-Logo im Header, dunkle Variante im Footer ohne weiße Kachel, Favicon-Links (`favicon.svg` + `.ico`).
- CSS: `.logo` 44 px (Scroll 38 px, mobil 36 px), `.footer-logo` 52 px; `white-space: nowrap` für Nav, Telefon, CTA.

## Neu in v9: Header & Hero
- Header jetzt dunkel (Navy) auf allen Seiten: weißes Logo (`logo-dark.svg`), Telefon als Bernstein-Pill, CTA Bernstein. Drawer und Dropdown dunkel.
- Hero vollflächig: Hausfoto rechts (`hero-haus-1200/1800.webp` + `hero-haus.jpg`, mit Bernstein-Giebelkontur und A-Label ins Bild komponiert), Verlauf nach Navy links; Serifen-Headline mit Bernstein-Betonung, Pill-CTA + Textlink; untere Zeile mit Skyline-Zeichnung und drei USPs. 50-%-Karte entfällt (steht im Abschnitt Honorar). `hero-illustration.svg` entfällt.

- Empfehlung: ein echtes Foto von Jairo vor Ort (Begehung, Baustelle, Thermografie) ersetzt das Studio-Porträt 1:1 – gleiche Datei, gleicher Rahmen.

## Aus v1 (unverändert gültig)
- `styles.css` → `styles.min.css` (34 KB), `build.py`, `/fonts/` (Inter, Source Serif 4, selbst gehostet, OFL).
- `index.html` neu; Leistungsseiten, Werdegang, Impressum (DDG/MStV), Datenschutz (EmailJS, jsDelivr, lokale Schriften — TODO-Kommentar beachten), Blog (noindex), 404, `script.js`, `sitemap.xml`.
- Hero: Porträt (`ramirez.webp`) statt KI-Haus; `hero-haus-*.webp` entfallen (auch `hero-haus.jpg` kann weg). Alternative: `hero-illustration.svg` (Gebäudeschnitt, Linienzeichnung) – Einbau: `<figure class="hero-portrait">` durch `<img src="hero-illustration.svg" alt="">` ersetzen.

## Fachlich prüfen (Jairo)
Förderzahlen 50 % / 650 € / 850 €, iSFP-Bonus-Regel ab 30.000 € (seit 21.07.2026), Aussagen zu Festpreis, 24-h-Antwort, Mo–Fr 08–18 Uhr, Antragstellung, Herstellerneutralität.
