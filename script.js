/* ============================================================
   ABRICO REALTY v2 — script.js
   Cinematic hero · Language toggle · Scroll reveal · Form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────────────
     SLIDE DATA — per-slide eyebrow / headline / sub text
     These override the default text per active slide
  ───────────────────────────────────────────────────────── */
  const SLIDES = [
    {
      en: {
        eyebrow: "West Africa's Premier Destination",
        line1:   "Live, Invest",
        line2:   "& Thrive in Ghana.",
        sub:     "Bilingual real estate, relocation & curated stays for Francophones ready to discover West Africa's most dynamic city."
      },
      fr: {
        eyebrow: "La Première Destination d'Afrique de l'Ouest",
        line1:   "Vivez, Investissez",
        line2:   "& Prospérez au Ghana.",
        sub:     "Immobilier bilingue, relocalisation et séjours sur mesure pour les francophones prêts à découvrir la ville la plus dynamique d'Afrique de l'Ouest."
      }
    },
    {
      en: {
        eyebrow: "Premium Real Estate",
        line1:   "Find Your Perfect",
        line2:   "Home in Accra.",
        sub:     "From East Legon villas to Oyarifa residences — premium properties for every lifestyle and every budget."
      },
      fr: {
        eyebrow: "Immobilier Premium",
        line1:   "Trouvez Votre",
        line2:   "Maison Idéale à Accra.",
        sub:     "Des villas d'East Legon aux résidences d'Oyarifa — des propriétés premium pour chaque style de vie et chaque budget."
      }
    },
    {
      en: {
        eyebrow: "Your Trusted Bilingual Partner",
        line1:   "Relocate with",
        line2:   "Confidence & Ease.",
        sub:     "Complete relocation support — housing, schools, administration. We speak your language. FR/EN bilingual service from day one."
      },
      fr: {
        eyebrow: "Votre Partenaire Bilingue de Confiance",
        line1:   "Déménagez en",
        line2:   "Toute Confiance.",
        sub:     "Accompagnement complet à la relocalisation — logement, écoles, administration. Nous parlons votre langue. Service bilingue FR/AN dès le premier jour."
      }
    },
    {
      en: {
        eyebrow: "Curated Accra Experience",
        line1:   "Experience Accra",
        line2:   "with a Local Expert.",
        sub:     "4-day discovery stays, neighbourhood tours, gastronomy and cultural immersion. Accra is not a city you visit — it is a city you feel."
      },
      fr: {
        eyebrow: "Expérience Accra Sur Mesure",
        line1:   "Vivez Accra",
        line2:   "avec un Expert Local.",
        sub:     "Séjours découverte de 4 jours, visites de quartiers, gastronomie et immersion culturelle. Accra ne se visite pas, elle se ressent."
      }
    }
  ];

  let currentLang = 'en';
  let currentSlide = 0;
  let sliderTimer  = null;
  const INTERVAL   = 5800;


  /* ─────────────────────────────────────────────────────────
     1. NAVBAR
  ───────────────────────────────────────────────────────── */
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }, { passive: true });


  /* ─────────────────────────────────────────────────────────
     2. HERO — CINEMATIC ENTRANCE
  ───────────────────────────────────────────────────────── */
  const hero = document.getElementById('hero');

  // Trigger cinematic entrance after a short delay
  setTimeout(() => {
    hero.classList.add('ready');
  }, 200);


  /* ─────────────────────────────────────────────────────────
     3. HERO — SLIDER ENGINE
  ───────────────────────────────────────────────────────── */
  const slides      = document.querySelectorAll('.hero-slide');
  const thumbs      = document.querySelectorAll('.slide-thumb');
  const counterEl   = document.querySelector('.slide-current');
  const progressBar = document.getElementById('slideProgressBar');

  // Hero text elements
  const eyebrowEl = document.querySelector('.eyebrow-text');
  const line1El   = document.querySelector('.line-reveal:not(.accent-line)');
  const line2El   = document.querySelector('.accent-line');
  const subEl     = document.querySelector('.hero-sub');

  const updateHeroText = (idx) => {
    const data = SLIDES[idx][currentLang];
    if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;
    if (line1El)   line1El.textContent   = data.line1;
    if (line2El)   line2El.textContent   = data.line2;
    if (subEl)     subEl.textContent     = data.sub;
  };

  const goToSlide = (idx) => {
    // Remove active
    slides[currentSlide].classList.remove('active');
    thumbs[currentSlide].classList.remove('active');

    currentSlide = ((idx % slides.length) + slides.length) % slides.length;

    // Activate new slide
    slides[currentSlide].classList.add('active');
    thumbs[currentSlide].classList.add('active');

    // Update counter
    if (counterEl) {
      counterEl.textContent = String(currentSlide + 1).padStart(2, '0');
    }

    // Animate hero text out then in
    if (hero) {
      hero.classList.remove('ready');
      setTimeout(() => {
        updateHeroText(currentSlide);
        hero.classList.add('ready');
      }, 180);
    }

    // Restart progress
    startProgress();
  };

  const startProgress = () => {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    progressBar.offsetHeight; // force reflow
    progressBar.style.transition = `width ${INTERVAL}ms linear`;
    progressBar.style.width = '100%';
  };

  const startAutoplay = () => {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => goToSlide(currentSlide + 1), INTERVAL);
  };

  // Thumb clicks
  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      goToSlide(parseInt(t.dataset.index));
      startAutoplay();
    });
  });

  // Arrow clicks
  document.getElementById('heroPrev')?.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
    startAutoplay();
  });
  document.getElementById('heroNext')?.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
    startAutoplay();
  });

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goToSlide(currentSlide - 1); startAutoplay(); }
    if (e.key === 'ArrowRight') { goToSlide(currentSlide + 1); startAutoplay(); }
  });

  // Touch swipe
  let touchStartX = 0;
  hero?.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  hero?.addEventListener('touchend', e => {
    const dx = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(dx) > 44) {
      goToSlide(dx > 0 ? currentSlide + 1 : currentSlide - 1);
      startAutoplay();
    }
  });

  // Init
  updateHeroText(0);
  startProgress();
  startAutoplay();


  /* ─────────────────────────────────────────────────────────
     4. STAT COUNTERS
  ───────────────────────────────────────────────────────── */
  let countersRan = false;

  const runCounter = (el) => {
    const target = parseInt(el.dataset.target);
    const dur = 1800;
    const fps = 60;
    const steps = dur / (1000 / fps);
    let current = 0;

    const tick = () => {
      current = Math.min(current + target / steps, target);
      el.textContent = Math.floor(current);
      if (current < target) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !countersRan) {
      countersRan = true;
      document.querySelectorAll('.stat-count').forEach(runCounter);
    }
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) counterObserver.observe(statsSection);


  /* ─────────────────────────────────────────────────────────
     5. SCROLL REVEAL
  ───────────────────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      // Stagger siblings
      const siblings = Array.from(
        entry.target.parentElement.querySelectorAll('.reveal')
      );
      const delay = siblings.indexOf(entry.target) * 90;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ─────────────────────────────────────────────────────────
     6. LANGUAGE TOGGLE — EN / FR
  ───────────────────────────────────────────────────────── */
  const langFab     = document.getElementById('langFab');
  const langFabText = document.getElementById('langFabText');

  const applyLang = (lang) => {
    document.querySelectorAll('[data-en]').forEach(el => {
      const val = el.getAttribute('data-' + lang);
      if (!val) return;

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else if (el.tagName === 'OPTION') {
        el.text = val;
      } else {
        el.innerHTML = val;
      }
    });

    // Textarea custom placeholders
    document.querySelectorAll(`textarea[data-${lang}-placeholder]`).forEach(el => {
      el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
    });

    // Update hero text for current slide
    updateHeroText(currentSlide);

    document.documentElement.lang = lang;
  };

  langFab?.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    langFabText.textContent = currentLang === 'en' ? 'FR' : 'EN';

    // Pulse feedback
    langFab.style.transform = 'scale(.9)';
    setTimeout(() => { langFab.style.transform = ''; }, 120);

    applyLang(currentLang);

    try { localStorage.setItem('abrico_lang', currentLang); } catch(e) {}
  });

  // Restore saved language
  try {
    const saved = localStorage.getItem('abrico_lang');
    if (saved && saved !== 'en') {
      currentLang = saved;
      langFabText.textContent = 'EN';
      applyLang(currentLang);
    }
  } catch(e) {}


  /* ─────────────────────────────────────────────────────────
     7. CONTACT FORM
  ───────────────────────────────────────────────────────── */
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name  = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();

      if (!name || !email) {
        showMsg(
          currentLang === 'fr'
            ? 'Veuillez remplir votre nom et email.'
            : 'Please fill in your name and email.',
          'error'
        );
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMsg(
          currentLang === 'fr'
            ? 'Adresse email invalide.'
            : 'Please enter a valid email address.',
          'error'
        );
        return;
      }

      const span = submitBtn.querySelector('span');
      const orig = span.textContent;
      span.textContent = currentLang === 'fr' ? 'Envoi...' : 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '.7';

      // Replace this with your real backend call
      await new Promise(r => setTimeout(r, 1600));

      span.textContent = orig;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '';

      form.reset();
      showMsg(
        currentLang === 'fr'
          ? 'Message envoyé. Nous répondons sous 24 heures.'
          : 'Message sent. We will reply within 24 hours.',
        'success'
      );
    });

    const showMsg = (text, type) => {
      document.querySelector('.form-feedback')?.remove();
      const d = document.createElement('div');
      d.className = 'form-feedback';
      d.textContent = text;
      Object.assign(d.style, {
        marginTop: '14px',
        padding: '12px 18px',
        borderRadius: '4px',
        fontSize: '.88rem',
        fontWeight: '400',
        textAlign: 'center',
        background: type === 'success' ? 'rgba(34,197,94,.1)' : 'rgba(220,50,50,.08)',
        color:      type === 'success' ? '#15803d' : '#b91c1c',
        border:     `1px solid ${type === 'success' ? 'rgba(34,197,94,.3)' : 'rgba(220,50,50,.25)'}`,
      });
      form.appendChild(d);
      if (type === 'success') setTimeout(() => d.remove(), 6000);
    };

    // Label focus states
    document.querySelectorAll('.f-group input, .f-group select, .f-group textarea').forEach(el => {
      const label = el.closest('.f-group')?.querySelector('label');
      if (!label) return;
      el.addEventListener('focus', () => { label.style.color = 'var(--teal)'; });
      el.addEventListener('blur',  () => { label.style.color = ''; });
    });
  }


  /* ─────────────────────────────────────────────────────────
     8. SMOOTH SCROLL
  ───────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h')
      ) || 70;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });


  /* ─────────────────────────────────────────────────────────
     9. SCROLL-TO-TOP on logo
  ───────────────────────────────────────────────────────── */
  document.querySelector('.nav-brand')?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ─────────────────────────────────────────────────────────
     10. LAZY IMAGES (when real images added)
         Usage: <img data-src="images/hero-1.jpg" />
  ───────────────────────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.addEventListener('load', () => img.classList.add('loaded'));
          lazyObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[data-src]').forEach(img => lazyObserver.observe(img));
  }


  /* ─────────────────────────────────────────────────────────
     11. HIDE FLOATING LANG BUTTON near contact section
  ───────────────────────────────────────────────────────── */
  const contactSection = document.getElementById('contact');
  if (contactSection && langFab) {
    new IntersectionObserver(entries => {
      const isIn = entries[0].isIntersecting;
      langFab.style.opacity       = isIn ? '0' : '1';
      langFab.style.pointerEvents = isIn ? 'none' : '';
    }, { threshold: 0.2 }).observe(contactSection);
  }


  /* ─────────────────────────────────────────────────────────
     CONSOLE SIGNATURE
  ───────────────────────────────────────────────────────── */
  console.log('%c ABRICO REALTY ', 'background:#f77c1b;color:#fff;font-size:14px;padding:4px 8px;border-radius:3px;font-weight:bold');
  console.log('%c Accra, Ghana · www.abricorealty.com', 'color:#257a9d;font-size:11px');

}); // end DOMContentLoaded