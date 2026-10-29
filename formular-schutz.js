/* Rawkeep Go-Live-Kit — Formular-Schutz ohne Captcha (~1 KB).
   Honeypot + Zeitfalle: stoppt den Großteil der Spam-Bots, ohne echte
   Nutzer zu nerven oder Daten an Dritte zu geben (kein reCAPTCHA).

   Nutzung — Attribut ans Formular, Skript einbinden:
     <form data-schutz action="…">…</form>
     <script src="formular-schutz.js" defer></script>

   Was passiert:
   1. Honeypot: Ein unsichtbares Feld wird eingefügt. Menschen sehen es
      nicht — Bots füllen es aus ⇒ Absenden wird blockiert.
   2. Zeitfalle: Absenden unter 3 Sekunden nach Seitenaufbau ⇒ Bot.
   Beides passiert clientseitig; bei serverseitigen Formularen dieselben
   zwei Checks zusätzlich im Backend prüfen (Feld leer? Zeit plausibel?). */
(function () {
  "use strict";
  var MIN_SEKUNDEN = 3;
  var start = Date.now();

  document.querySelectorAll("form[data-schutz]").forEach(function (form) {
    // Honeypot-Feld einfügen (für Menschen unsichtbar, für Bots ein Köder)
    var falle = document.createElement("input");
    falle.type = "text";
    falle.name = "firmenname_bitte_leer_lassen";
    falle.tabIndex = -1;
    falle.autocomplete = "off";
    falle.setAttribute("aria-hidden", "true");
    falle.style.cssText = "position:absolute;left:-9999px;height:1px;width:1px;opacity:0;";
    form.appendChild(falle);

    // Verweildauer mitschicken, damit der Server die Zeitfalle ebenfalls
    // prüfen kann (clientseitig allein ist gegen echte Bots wirkungslos).
    var dauer = document.createElement("input");
    dauer.type = "hidden";
    dauer.name = "dauer_sekunden";
    form.appendChild(dauer);

    form.addEventListener("submit", function (e) {
      var sekunden = (Date.now() - start) / 1000;
      dauer.value = String(Math.round(sekunden));
      if (falle.value !== "" || sekunden < MIN_SEKUNDEN) {
        e.preventDefault();
        // Bots bekommen keine Fehlermeldung — sie sollen denken, es hat geklappt.
      }
    });
  });
})();
