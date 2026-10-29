# Klickda — Inhalte selbst ändern (2-Minuten-Anleitung)

Alles Wichtige (Preise, Zeiten, Texte) steht in **einer Datei**: `index.html`.

1. Datei auf GitHub öffnen (Link von Rawkeep, Login nötig)
2. Stift-Symbol (Bearbeiten) klicken
3. Mit Strg+F / Cmd+F den Text suchen und **nur Text/Zahlen zwischen `>` und `<`** ändern
4. Grün **Commit changes** klicken — nach 1–2 Minuten automatisch live

❌ Nie spitze Klammern `< >` oder `class=`-Wörter löschen.
🆘 Etwas kaputt? Jede Änderung ist mit einem Klick rückgängig machbar — Nachricht an Rawkeep genügt.

## Vor dem Livegang

- `[E-Mail eintragen]` im Formular (`action="mailto:…"`) und `[Straße Hausnummer] · [PLZ]` im Kontakt ersetzen.
- `impressum.html` und `datenschutz.html`: Platzhalter mit den Pflichtangaben füllen (§ 5 DDG, Art. 13 DSGVO) — nur dort steht der Klarname.
- `https://klickda.example/` in `index.html` (schema.org), `sitemap.xml` und `robots.txt` durch die echte Adresse ersetzen, sobald die Markenprüfung durch ist.
- Screenshots `klickda-cockpit*.png` kommen aus `../e2e/` — nach jeder Oberflächenänderung `npm run e2e` und neu kopieren.

## Abnahme-Bilder

`abnahme-desktop.png` / `abnahme-mobil.png` erzeugt `python3 -m devteam.cli abnahme webseite`
aus dem Werk (mit `DEVTEAM_CHROMIUM=…`, wenn kein Python-Playwright-Browser installiert
ist). Die Bilder entstehen mit reduzierter Bewegung, sonst zeigt `animation-timeline:
view()` in einem Ganzseiten-Screenshot leere Flächen; Besucher sehen die Einblendung.

## Livegang (GitHub Pages, der Fabrik-Weg)

Die Seite bekommt ein **eigenes, öffentliches Repo** — das Produkt-Repo bleibt
privat, Pages ist auf öffentlichen Repos kostenlos. `pages.yml` und
`qualitaet.yml` liegen schon in `.github/workflows/`.

```bash
cd webseite
git init -b main && git add -A && git commit -m "feat: Klickda-Showcase aus der Rawkeep Kundenseiten-Fabrik"
gh repo create Rawkeep/klickda-site --public --source . --push
gh api repos/Rawkeep/klickda-site/pages -X POST -f build_type=workflow   # einmalig; der Workflow deployt danach bei jedem Push
```

Live unter `https://rawkeep.github.io/klickda-site/`, später eigene Domain in den
Pages-Einstellungen. **Nicht** `rawkeep-architekt webseite --deploy` auf diesen
Ordner laufen lassen — das erzeugt die Vorlage neu und überschreibt den Inhalt.
