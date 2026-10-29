/* Rawkeep Design-Kit — Scroll-Effekte ohne Abhängigkeiten (~2 KB).
   0 CDN, DSGVO-sauber, respektiert prefers-reduced-motion komplett.

   Nutzung (Attribute im HTML genügen, Skript einmal einbinden):
     <section data-reveal>…</section>            sanftes Einblenden beim Scrollen
     <div data-reveal data-delay="2">…</div>     gestaffelt (Stufe × 90 ms)
     <div data-parallax="0.3">…</div>            Parallax-Ebene (0.1 sanft … 0.5 stark)
     <span data-counter="250">0</span>           zählt hoch, sobald sichtbar
     <header data-nav-shrink>…</header>          bekommt .geschrumpft beim Scrollen

   Zugehörige Basis-Styles: effects.css (Reveal-Zustände, .lift, .geschrumpft). */
(function () {
  "use strict";

  var ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Kann der Browser Scroll-Animationen selbst? Dann übernimmt modern.css
  // (Compositor statt JS-Thread) und dieses Skript hält sich raus — es
  // bleibt nur für Zähler und die Navigation zuständig.
  var nativ =
    typeof CSS !== "undefined" &&
    CSS.supports &&
    CSS.supports("animation-timeline", "view()") &&
    document.querySelector('link[href*="modern.css"], style[data-kit-modern]') !== null;

  // ── Scroll-Reveal + Zähler (IntersectionObserver) ────────────────────
  var reveals = nativ ? [] : document.querySelectorAll("[data-reveal]");
  var counters = document.querySelectorAll("[data-counter]");

  if (ruhig || !("IntersectionObserver" in window)) {
    // Ohne Animation: alles sofort sichtbar, Zähler auf Endwert.
    reveals.forEach(function (el) { el.classList.add("sichtbar"); });
    counters.forEach(function (el) { el.textContent = el.getAttribute("data-counter"); });
  } else {
    var io = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);
        var stufe = parseInt(el.getAttribute("data-delay") || "0", 10);
        setTimeout(function () { el.classList.add("sichtbar"); }, stufe * 90);
        if (el.hasAttribute("data-counter")) zaehle(el);
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
    counters.forEach(function (el) { io.observe(el); });
  }

  function zaehle(el) {
    var ziel = parseFloat(el.getAttribute("data-counter"));
    var dauer = 900, start = null;
    function tick(t) {
      if (!start) start = t;
      var f = Math.min((t - start) / dauer, 1);
      el.textContent = String(Math.round(ziel * (1 - Math.pow(1 - f, 3))));
      if (f < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ── Parallax (transform im rAF — nie background-attachment: fixed) ───
  var ebenen = ruhig || nativ ? [] : Array.prototype.slice.call(
    document.querySelectorAll("[data-parallax]")
  );
  var navs = document.querySelectorAll("[data-nav-shrink]");
  var angefragt = false;

  function anwenden() {
    angefragt = false;
    var y = window.scrollY || 0;
    ebenen.forEach(function (el) {
      var faktor = parseFloat(el.getAttribute("data-parallax")) || 0.3;
      el.style.transform = "translate3d(0," + Math.round(y * faktor) + "px,0)";
    });
    navs.forEach(function (el) { el.classList.toggle("geschrumpft", y > 24); });
  }

  if (ebenen.length || navs.length) {
    window.addEventListener("scroll", function () {
      if (!angefragt) { angefragt = true; requestAnimationFrame(anwenden); }
    }, { passive: true });
    anwenden();
  }
})();
