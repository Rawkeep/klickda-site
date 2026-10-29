// Klickda — minimales Verhalten, keine Abhängigkeiten.
(function () {
  "use strict";

  // Mobile Navigation auf-/zuklappen
  var schalter = document.getElementById("navSchalter");
  var nav = document.getElementById("nav");
  if (schalter && nav) {
    schalter.addEventListener("click", function () {
      var offen = nav.classList.toggle("offen");
      schalter.setAttribute("aria-expanded", offen ? "true" : "false");
    });
    // Nach Klick auf einen Menüpunkt wieder schließen (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("offen");
        schalter.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Jahreszahl im Fuß aktuell halten
  var jahr = document.getElementById("jahr");
  if (jahr) jahr.textContent = String(new Date().getFullYear());
})();
