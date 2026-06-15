// ── Language switcher ──
    function setLang(lang) {
      document.documentElement.setAttribute('data-lang', lang);
      document.getElementById('btn-fr').classList.toggle('active', lang === 'fr');
      document.getElementById('btn-en').classList.toggle('active', lang === 'en');

      document.querySelectorAll('[data-fr][data-en]').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text) el.innerHTML = text;
      });
    }

    // ── Slider générique (ASVS + CarWash) ──
    function initSlider(sliderId, dotsContainerId) {
      const slider = document.getElementById(sliderId);
      if (!slider) return;
      const slides = slider.querySelectorAll('.slide');
      const dotsWrap = dotsContainerId ? document.getElementById(dotsContainerId) : slider.closest('.project-img-wrap').querySelector('.slider-dots');
      const dots = dotsWrap ? dotsWrap.querySelectorAll('.slider-dot') : [];
      let current = 0, timer;

      function goTo(n) {
        slides[current].classList.remove('active');
        if (dots[current]) dots[current].classList.remove('active');
        current = (n + slides.length) % slides.length;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
      }
      function start() { timer = setInterval(() => goTo(current + 1), 3500); }

      dots.forEach(d => d.addEventListener('click', () => {
        clearInterval(timer);
        goTo(+d.dataset.slide);
        start();
      }));
      start();
    }

    initSlider('asvs-slider', null);
    initSlider('carwash-slider', 'carwash-dots');
    initSlider('health-slider', 'health-dots');
    initSlider('neobank-slider', 'neobank-dots');

    // ── Scroll reveal for timeline items ──
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.timeline-item').forEach(el => obs.observe(el));