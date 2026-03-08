/* ===================================================
   ASK BETTER — Landing Page Scripts
   =================================================== */

(function () {
  'use strict';

  // --- Language Toggle ---
  var html = document.documentElement;
  var langToggle = document.getElementById('langToggle');

  if (langToggle) {
    // Sync toggle UI with the language already set in <head>
    var currentLang = html.getAttribute('data-lang') || 'en';
    langToggle.querySelectorAll('.lang-option').forEach(function (el) {
      el.classList.toggle('active', el.dataset.value === currentLang);
    });

    langToggle.addEventListener('click', function (e) {
      var option = e.target.closest('.lang-option');
      if (!option) return;

      var lang = option.dataset.value;
      if (!lang) return;

      html.setAttribute('data-lang', lang);
      html.setAttribute('lang', lang);

      // Update page title
      document.title = lang === 'es'
        ? 'Ask Better — Preguntas que transforman tu mente'
        : 'Ask Better — Empowering Questions That Rewire Your Mind';

      langToggle.querySelectorAll('.lang-option').forEach(function (el) {
        el.classList.toggle('active', el.dataset.value === lang);
      });

      try {
        localStorage.setItem('askbetter-lang', lang);
      } catch (_) { /* ignore */ }
    });
  }

  // --- Navbar Scroll Effect ---
  var navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle('is-scrolled', window.scrollY > 32);
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // --- Scroll Reveal Animations ---
  var animElements = document.querySelectorAll('.anim-fade-up');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // --- Hide scroll hint after first scroll ---
  var scrollHint = document.querySelector('.hero-scroll-hint');
  if (scrollHint) {
    function hideScrollHint() {
      if (window.scrollY > 100) {
        scrollHint.style.opacity = '0';
        scrollHint.style.transition = 'opacity 0.4s ease';
        window.removeEventListener('scroll', hideScrollHint);
      }
    }
    window.addEventListener('scroll', hideScrollHint, { passive: true });
  }

})();
