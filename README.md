# Hero-Bild tauschen (auf Stand v6)

Nur diese Dateien ins Repo kopieren (Pfade: Wurzel):
- hero-haus-800.webp, hero-haus-1200.webp, hero-haus-1600.webp  (aus house.png, 2:1; Ausschnitt per CSS `object-position: 74% 50%`)
- index.html  (Hero: `<img class="hero-image" …srcset…>` statt Porträt; Preload angepasst; Porträt wieder im Abschnitt „Warum Ramirez“)
- styles.css + styles.min.css  (`.hero-image`: 4:3 Desktop, 16:10 mobil)

Optional löschen: hero-haus.jpg, hero-haus.webp (alte Bilder), hero-illustration.svg (falls nicht gewünscht).
