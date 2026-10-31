/* Rechner „Was kostet der Status quo" — rechnet lokal, sendet nichts. Dieselbe Formel wie
   tests/fixtures/szenarien.mjs rechnung(): Vorgänge × Minuten je Vorgang gegen ¼ Minute je Klick,
   auf 250 Arbeitstage und den Stundensatz hochgerechnet. */
(function () {
  'use strict';
  var de = function (n) { return Math.round(n).toLocaleString('de-DE'); };
  document.querySelectorAll('[data-rechner]').forEach(function (form) {
    var klicks = Number(form.getAttribute('data-klicks'));
    var rechne = function () {
      var vorgaenge = Number(form.elements.vorgaenge.value) || 0;
      var minuten = Number(form.elements.minuten.value) || 0;
      var satz = Number(form.elements.stundensatz.value) || 0;
      var statusQuo = vorgaenge * minuten;
      var klickda = klicks * 0.25;
      var ersparnis = Math.max(0, statusQuo - klickda);
      var stundenJahr = Math.round(ersparnis * 250 / 60);
      var euroJahr = Math.round(ersparnis * 250 / 60 * satz);
      form.querySelector('[data-aus="statusQuoMin"]').textContent = de(statusQuo) + ' min';
      form.querySelector('[data-aus="klickdaMin"]').textContent = (klickda % 1 ? klickda.toLocaleString('de-DE') : de(klickda)) + ' min';
      form.querySelector('[data-aus="stundenJahr"]').textContent = de(stundenJahr) + ' h';
      form.querySelector('[data-aus="euroJahr"]').textContent = de(euroJahr) + ' €';
    };
    form.addEventListener('input', rechne);
    form.addEventListener('submit', function (e) { e.preventDefault(); rechne(); });
    rechne();
  });
})();
