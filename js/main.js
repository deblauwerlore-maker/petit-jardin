// Zachte fade-in bij het scrollen (niet bij "beperk beweging").
(function () {
  var items = document.querySelectorAll('.reveal');
  var rustig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (rustig || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-zichtbaar'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-zichtbaar'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  // Tijdelijk voorbeeldformulier: verstuurt niets. Verdwijnt zodra de MailerLite-embed erin staat.
  var form = document.querySelector('.voorbeeldformulier');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.querySelector('.formulier__melding').hidden = false;
    });
  }
})();
