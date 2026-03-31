/* ═══════════════════════════════════════════════
   PLĀNS B — Script
   GSAP ScrollTrigger + Vanilla JS interactions
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Respect reduced motion ──
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Wait for GSAP to load ──
  function onReady(fn) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      fn();
    } else {
      window.addEventListener('load', fn);
    }
  }

  // ═══════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav__link');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  // Scroll state for nav background
  let lastScroll = 0;
  function updateNav() {
    const scrollY = window.scrollY;
    nav.classList.toggle('nav--scrolled', scrollY > 50);
    lastScroll = scrollY;
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Hamburger toggle
  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close mobile menu on link click
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMenu();
    }
  });

  // ── Smooth scroll with offset ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPos, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });

  // ── Active nav link on scroll (scroll spy) ──
  const sections = document.querySelectorAll('main section[id]');

  function updateActiveLink() {
    var scrollY = window.scrollY + nav.offsetHeight + 100;

    // If scrolled to bottom of page, activate the last section
    var atBottom = (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 50);
    if (atBottom) {
      var lastSection = sections[sections.length - 1];
      if (lastSection) {
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + lastSection.id);
        });
        return;
      }
    }

    var currentId = '';
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ═══════════════════════════════════════
  // NEWSLETTER FORM
  // ═══════════════════════════════════════
  var newsletterForm = document.getElementById('newsletterForm');
  var newsletterSuccess = document.getElementById('newsletterSuccess');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // In production, send to your backend / Mailchimp / etc.
      newsletterForm.hidden = true;
      newsletterSuccess.hidden = false;
    });
  }

  // ═══════════════════════════════════════
  // LIGHTBOX
  // ═══════════════════════════════════════
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var galleryItems = document.querySelectorAll('.gallery__item');

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var img = this.querySelector('img');
      if (!img) return;
      // Use higher res version for lightbox
      var src = img.src.replace(/w=\d+/, 'w=1400').replace(/h=\d+/, 'h=1000');
      lightboxImg.src = src;
      lightboxImg.alt = img.alt;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      // Fade in
      requestAnimationFrame(function () {
        lightbox.style.opacity = '1';
      });
    });
  });

  function closeLightbox() {
    lightbox.style.opacity = '0';
    setTimeout(function () {
      lightbox.hidden = true;
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }, 300);
  }

  lightbox.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });

  // ═══════════════════════════════════════
  // GSAP ANIMATIONS
  // ═══════════════════════════════════════
  onReady(function () {
    if (prefersReducedMotion) {
      // Just show everything immediately
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ── Hero entrance ──
    // Set initial hidden states explicitly (more reliable than .from())
    gsap.set('.hero__title', { y: 60, opacity: 0 });
    gsap.set('.hero__tagline', { y: 30, opacity: 0 });
    gsap.set('.hero__cta', { y: 20, opacity: 0 });
    gsap.set('.hero__image-wrap', { scale: 0.95, opacity: 0 });
    gsap.set('.hero__scroll', { opacity: 0 });

    var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .to('.hero__title', {
        y: 0,
        opacity: 1,
        duration: 1,
      })
      .to('.hero__tagline', {
        y: 0,
        opacity: 1,
        duration: 0.7,
      }, '-=0.5')
      .to('.hero__cta', {
        y: 0,
        opacity: 1,
        duration: 0.6,
      }, '-=0.3')
      .to('.hero__image-wrap', {
        scale: 1,
        opacity: 1,
        duration: 1,
      }, '-=0.6')
      .to('.hero__scroll', {
        opacity: 1,
        duration: 0.5,
      }, '-=0.3');

    // ── Hero parallax on scroll ──
    gsap.to('.hero__image-wrap', {
      y: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Hero text fades out on scroll
    gsap.to('.hero__text', {
      y: -40,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: '60% top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Scroll indicator fades
    gsap.to('.hero__scroll', {
      opacity: 0,
      scrollTrigger: {
        trigger: '.hero',
        start: '20% top',
        end: '40% top',
        scrub: true,
      },
    });

    // ── Section reveals ──
    var reveals = gsap.utils.toArray('.reveal');
    reveals.forEach(function (el) {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // ── Show items stagger ──
    var showItems = gsap.utils.toArray('.show');
    showItems.forEach(function (item, i) {
      gsap.to(item, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        delay: i * 0.08,
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    // ── Gallery items stagger ──
    var galleryReveal = gsap.utils.toArray('.gallery__item');
    galleryReveal.forEach(function (item, i) {
      gsap.to(item, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: '.gallery__grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    // ── Music section album art parallax ──
    gsap.to('.music__art', {
      y: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.music',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // ── Nav links underline animation on active change ──
    ScrollTrigger.create({
      trigger: '.about',
      start: 'top center',
      end: 'bottom center',
    });

    // ── Refresh on resize ──
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        ScrollTrigger.refresh();
      }, 250);
    });
  });
})();
