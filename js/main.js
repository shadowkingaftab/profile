/* THE INFINITE CANVAS — shared page interactions */
(function ($) {
  'use strict';
  $(function () {
    const $menu = $('.menu-toggle');
    const $nav = $('.site-nav');
    $menu.on('click', function () {
      const isOpen = $(this).attr('aria-expanded') === 'true';
      $(this).attr('aria-expanded', String(!isOpen));
      $(this).attr('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      $nav.toggleClass('open', !isOpen);
    });
    $nav.find('a').on('click', function () {
      $menu.attr('aria-expanded', 'false').attr('aria-label', 'Open navigation');
      $nav.removeClass('open');
    });
    const revealItems = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            currentObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('revealed'));
    }
    const backTop = document.querySelector('.back-top');
    if (backTop) {
      const updateBackTop = () => backTop.classList.toggle('visible', window.scrollY > 500);
      window.addEventListener('scroll', updateBackTop, { passive: true });
      updateBackTop();
      backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });
})(window.jQuery);
