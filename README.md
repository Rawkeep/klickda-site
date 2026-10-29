# Klickda — Webseite (generiert von der Rawkeep Kundenseiten-Fabrik)

Stil-Stufe: **ELEGANT** · Architektur-Begründung: `BRIEFING.html`

## Ansehen

```bash
python3 -m http.server 8080   # oder index.html doppelklicken
```

## Vor dem Livegang (Platzhalter ersetzen)

- Alle `[eckigen Klammern]` in `index.html` mit echten Inhalten füllen
- Impressum + Datenschutz final (Kunde bestätigt schriftlich)
- Domain in `sitemap.xml`/`robots.txt` eintragen
- Go-Live-Checkliste in `BRIEFING.html` abarbeiten

## Wächter aktivieren (go-live-kit)

`qualitaet.yml` + `uptime.yml` aus `devteam/go-live-kit/` nach `.github/workflows/` kopieren, URLs/PFAD setzen — dann laufen Lighthouse-Budget, Link-Check und Uptime-Alarm automatisch.

Kunden-Anleitung zum Selbst-Pflegen: `PFLEGE.md`
