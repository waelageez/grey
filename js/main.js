const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

const mobileMenuLinks = mobileMenu.querySelectorAll("a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
      }, index * 100);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px) scale(0.95)";
  el.style.transition =
    "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
  observer.observe(el);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation =
          "smoothReveal 1s cubic-bezier(0.4, 0, 0.2, 1) both";
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll("section").forEach((section) => {
  // rp-section manages its own animations — skip it here
  if (section.classList.contains("rp-section")) return;
  sectionObserver.observe(section);
});

let lastScroll = 0;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("shadow-lg");
  } else {
    navbar.classList.remove("shadow-lg");
  }

  lastScroll = currentScroll;
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-primary", "border-b-2", "border-primary");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-primary", "border-b-2", "border-primary");
    }
  });
});

const scrollToTopBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const counters = document.querySelectorAll(".counter");
let hasAnimated = false;

const animateCounter = (counter) => {
  const target = parseInt(counter.getAttribute("data-target"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      counter.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target;
    }
  };

  updateCounter();
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach((counter) => {
          animateCounter(counter);
        });
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".grid.grid-cols-2.gap-6");
if (statsSection) {
  counterObserver.observe(statsSection);
}

const partnersTrack = document.querySelector(".partners-track");
if (partnersTrack) {
  const partnersContent = partnersTrack.innerHTML;
  partnersTrack.innerHTML += partnersContent;
}

const aboutSlides = document.querySelectorAll(".about-slide");
if (aboutSlides.length > 0) {
  let currentSlide = 0;

  function showNextSlide() {
    aboutSlides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % aboutSlides.length;
    aboutSlides[currentSlide].classList.add("active");
  }

  setInterval(showNextSlide, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.addEventListener("load", () => {
            img.classList.add("loaded");
          });
          if (img.complete) {
            img.classList.add("loaded");
          }
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  } else {
    lazyImages.forEach((img) => img.classList.add("loaded"));
  }

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

window.addEventListener("load", () => {
  // Optimized image loading for portfolio
  const images = document.querySelectorAll("section img");

  // Use IntersectionObserver for better performance
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Add loading transition
          img.style.opacity = "0";
          img.style.transition = "opacity 0.3s ease-in";

          // Load image when it's about to enter viewport
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.onload = () => {
              img.style.opacity = "1";
              img.removeAttribute("data-src");
            };
          } else if (!img.complete) {
            img.addEventListener("load", () => {
              img.style.opacity = "1";
            });
          } else {
            img.style.opacity = "1";
          }

          // Stop observing once loaded
          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px 0px", // Start loading 50px before entering viewport
      threshold: 0.01,
    }
  );

  images.forEach((img) => imageObserver.observe(img));
});

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll("section");

      parallaxElements.forEach((el, index) => {
        // Skip the recent-projects video section — parallax breaks its layout
        if (el.classList.contains("rp-section")) return;
        const speed = 0.5;
        const yPos = -(scrolled * speed) / (index + 1);
        if (Math.abs(yPos) < 100) {
          el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });

      ticking = false;
    });
    ticking = true;
  }
});

// Scroll sections fade in/out animation
const scrollSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
      } else {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(30px) scale(0.95)";
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  }
);

// Initialize and observe all sections with scroll-section class
document.querySelectorAll(".scroll-section").forEach((section) => {
  section.style.transition =
    "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
  scrollSectionObserver.observe(section);
});

// ============================================================
//  HERO COVER — PARTICLE NETWORK
// ============================================================
function initHeroParticles() {
  const canvas = document.getElementById("hero-particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const count = window.innerWidth < 768 ? 45 : 85;
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.38,
    vy: (Math.random() - 0.5) * 0.38,
    radius: Math.random() * 1.6 + 0.5,
    opacity: Math.random() * 0.45 + 0.08,
  }));

  const CONNECTION_DIST = 135;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(213,207,206,${p.opacity})`;
      ctx.fill();

      // Connection lines to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(213,207,206,${0.2 * (1 - dist / CONNECTION_DIST)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}

// ============================================================
//  HERO COVER — MOUSE PARALLAX ON BACKGROUND
// ============================================================
function initHeroParallax() {
  const hero = document.getElementById("home");
  if (!hero) return;

  let targetX = 50, targetY = 50;
  let currentX = 50, currentY = 50;

  document.addEventListener("mousemove", (e) => {
    targetX = 50 + (e.clientX / window.innerWidth  - 0.5) * -18;
    targetY = 50 + (e.clientY / window.innerHeight - 0.5) * -12;
  });

  (function lerp() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    hero.style.backgroundPosition = `${currentX}% ${currentY}%`;
    requestAnimationFrame(lerp);
  })();
}

initHeroParticles();
initHeroParallax();

// ============================================================
//  SOCIAL MEDIA ICONS — STAGGERED APP-ICON ENTRANCE + FLOAT
// ============================================================
function initSocialIcons() {
  const icons = document.querySelectorAll(".social-icon-link");
  if (!icons.length) return;

  const row = document.querySelector(".social-icons-row");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        icons.forEach((icon, i) => {
          setTimeout(() => {
            // 1. Smooth entrance via transition
            icon.style.transition =
              "opacity 0.5s ease, transform 0.72s cubic-bezier(0.34,1.56,0.64,1), background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease";
            icon.style.opacity = "1";
            icon.style.transform = "translateY(0) scale(1) rotate(0deg)";

            // 2. Hand off to idle float animation after entrance settles
            setTimeout(() => {
              icon.style.transition =
                "background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease";
              icon.style.transform = "";
              icon.style.opacity = "";
              icon.style.animationDelay = `${i * 0.45}s`;
              icon.classList.add("si-float");
            }, 750);
          }, i * 110);
        });

        observer.disconnect();
      });
    },
    { threshold: 0.4 }
  );

  if (row) observer.observe(row);
}

initSocialIcons();

// ============================================================
//  GS-SECTION — SCROLL-TRIGGERED REVEAL + COUNTER ANIMATION
// ============================================================

// Module-scope counter so applyLanguage can re-trigger it
function gsRunCounter(el) {
  const target = parseInt(el.getAttribute("data-target"), 10);
  if (isNaN(target)) return;
  el.textContent = "0";
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  (function tick() {
    current += step;
    if (current < target) {
      el.textContent = Math.floor(current);
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  })();
}

(function initGsSections() {
  const gsSections = document.querySelectorAll(".gs-section");
  if (!gsSections.length) return;

  // ── Classes to activate inside each gs-section ─────────────
  const GS_CLASSES = [
    ".gs-tab",
    ".gs-heading",
    ".gs-rule",
    ".gs-col",
    ".gs-li",
    ".gs-svcl",
    ".gs-badge",
    ".gs-svcitem",
    ".gs-svcfooter",
  ];

  const gsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const section = entry.target;

        // Add gs-visible to every animated child
        GS_CLASSES.forEach((selector) => {
          section.querySelectorAll(selector).forEach((el) => {
            el.classList.add("gs-visible");
          });
        });

        // Fire counters
        section.querySelectorAll(".gs-counter").forEach((el) => {
          gsRunCounter(el);
        });

        // Mark as animated for language switching
        section.dataset.gsAnimated = "true";

        // Only animate once
        gsObserver.unobserve(section);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  gsSections.forEach((section) => gsObserver.observe(section));
})();

// ============================================================
//  LANGUAGE SWITCHER — EN / AR (Cairo font)
// ============================================================
const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_partners: "Partners",
    nav_portfolio: "Portfolio",
    nav_reels: "Reels",
    nav_designs: "Designs",
    nav_contact: "Contact Us",
    designs_eyebrow: "Designed · Branded · Crafted by Grey",
    designs_sub: "Scroll-stopping social designs we create for our clients — concept, art direction, and final artwork.",
    designs_stat_1: "Designs Crafted",
    designs_stat_2: "Brands Served",
    designs_stat_3: "Cities",
    designs_cta_h: "Designs that make your brand impossible to scroll past.",
    designs_cta_p: "From concept to final artwork — we craft a visual identity that gets noticed. Let's build yours.",
    designs_cta_btn: "Start Your Project",
    designs_cta_reels: "Watch Our Reels",
    reels_eyebrow: "Shot · Directed · Edited by Grey",
    reels_sub: "Vertical stories we crafted for our clients — concept to final cut. Every frame engineered to stop the scroll.",
    reels_stat_reels: "Reels Produced",
    reels_stat_clients: "Brands Filmed",
    reels_stat_views: "Total Views",
    reels_bar: "Grey Production",
    reels_watch: "Watch on Instagram",
    reels_back: "Back",
    nav_clients: "Clients",
    clients_eyebrow: "Brands we create for",
    clients_sub: "Every logo here is a brand we film, design and grow. Tap one to see the reels and designs we made for them.",
    clients_stat_clients: "Clients",
    clients_stat_reels: "Reels",
    clients_stat_designs: "Designs",
    clients_search: "Search clients",
    clients_empty: "No client matches your search.",
    clients_all: "All clients",
    clients_cta_h: "Your brand could be the next logo on this wall.",
    clients_cta_p: "Tell us about your project — we'll handle the filming, the design and the growth.",
    clients_cta_btn: "Start Your Project",
    reels_cta_h: "Your brand deserves a reel that performs.",
    reels_cta_p: "From the first idea to the final export — we handle the whole production. Let's make something that gets watched.",
    reels_cta_btn: "Start Your Reel",
    reels_cta_designs: "View Our Designs",
    hct_label: "Creative Marketing Agency",
    cin_a1: "A New",
    cin_a2: "Perspective",
    cin_b1: "More Details",
    cin_bg2: "Discover",
    cin_a3: "Beyond",
    cin_b2: "The Horizon",
    hero_bg_word: "STORIES",
    hero_tagline_top: "We Don't Create",
    hero_tagline_bot: `We Tell <span class="accent">Stories</span>`,
    hero_download: "Download Portfolio",
    hero_journey: "Start Your Journey",
    rp_showreel: "SHOWREEL &nbsp;·&nbsp; 2025",
    rp_sub: "Transforming visions into extraordinary stories",
    rp_playing: "PLAYING NOW",
    rp_watch: "Watch Now",
    rp_scroll: "scroll",
    tab_profile: "Company Profile",
    tab_about: "About Us",
    tab_grey: "Grey Agency",
    intro_heading: "Introduction",
    intro_p1a: `At <strong>Grey</strong>, We don't see the world in black and white.<br>We work in the space in between — the grey zone.`,
    intro_p1b: `Because nothing in life is absolute. Everything is full of details, shades, and different perspectives.<br>As said in the Holy Quran: <em>"And [by] the soul and He who proportioned it, and inspired it with its wickedness and its righteousness."</em> Every human carries both sides within, and every story can be seen from more than one angle. That's where our idea was born.`,
    intro_li0: "We don't just deliver services",
    intro_li1: "We build images",
    intro_li2: "We create emotions",
    intro_li3: "We craft identities that last",
    intro_p2a: `<strong>Grey</strong> is not neutral to us… It is a world full of shadows, where every shadow carries meaning, every shade holds a message, and every small difference can make a big impact.`,
    intro_p2b: `We understand them. We analyze them. We see them from every angle, to extract their true value from a new perspective.<br><em>New Perspective — Not just a slogan.</em>`,
    intro_p2c: `<strong>Grey</strong> is not just a marketing agency.<br>It's a way of thinking.`,
    intro_p3a: `It's how we work — We dive deep into details, understand motives before the brand and explore the market, the audience and the opportunities others overlook.`,
    intro_p3b: `Our team consists of more than <span class="gs-counter" data-target="25">25</span> specialists across marketing, branding, and media production — carefully selected, professionally trained, each one bringing vision before skill.`,
    svc_badge: "services",
    svc_digital: "• Digital Marketing",
    svc_branding: "• Branding",
    svc_media_prod: "• Media Production",
    svc_media_buy: "• Media Buying",
    svc_print: "• Printings",
    svc_events: "• Events",
    svc_giveaway: "• Giveaway",
    partners_heading: `<span style="color:#fef7f5;">Our</span> <span class="text-gradient">Partners</span>`,
    partners_sub: "Trusted by leading brands and professionals across industries",
    contact_h1: "Ready to Elevate",
    contact_h2: "Your Brand?",
    contact_body: "Let's collaborate to create something extraordinary. Get in touch and let's discuss how we can help transform your brand into a legend.",
    cta_download: "Download Portfolio",
    cta_touch: "Get In Touch",
    cta_portfolio: "View Portfolio",
    footer_brand: "Grey Agency",
    footer_tagline: "Transforming brands through strategic creativity and innovative marketing solutions.",
    footer_links_h: "Quick Links",
    footer_contact_h: "Contact",
    footer_link_home: "Home",
    footer_link_about: "About",
    footer_link_services: "Services",
    footer_link_portfolio: "Portfolio",
    footer_link_partners: "Partners",
    footer_copy: "© 2026 Grey Agency. All rights reserved.",
    lang_btn: "عربي",
    contact_page_h1: "Get In",
    contact_page_h2: "Touch",
    contact_page_sub: "Let's collaborate to create something extraordinary. Fill out the form below and we'll get back to you as soon as possible.",
    form_name_label: "Full Name",
    form_email_label: "Email Address",
    form_phone_label: "Phone Number",
    form_msg_label: "Message",
    form_name_ph: "Enter your full name",
    form_email_ph: "your.email@example.com",
    form_phone_ph: "+1 (555) 123-4567",
    form_msg_ph: "Tell us about your project...",
    form_submit: "Send Message",
    form_success: "✓ Thank you! Your message has been sent successfully. We'll get back to you soon.",
    form_error: "✗ Oops! Something went wrong. Please try again or email us directly.",
    contact_direct: "Or reach us directly:",
    portfolio_title: `<span style="color:#fef7f5;">Our</span> <span class="text-gradient">Portfolio</span>`,
    portfolio_sub: "A showcase of our creative work and visual storytelling",
  },
  ar: {
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_services: "خدماتنا",
    nav_partners: "شركاؤنا",
    nav_portfolio: "أعمالنا",
    nav_reels: "ريلز",
    nav_designs: "التصاميم",
    nav_contact: "تواصل معنا",
    designs_eyebrow: "تصميم · هوية · إبداع من غراي",
    designs_sub: "تصاميم سوشيال توقف التمرير نصنعها لعملائنا — من الفكرة والإخراج الفني حتى التصميم النهائي.",
    designs_stat_1: "تصميم",
    designs_stat_2: "علامة تجارية",
    designs_stat_3: "مدن",
    designs_cta_h: "تصاميم تجعل علامتك مستحيلة التجاهل.",
    designs_cta_p: "من الفكرة حتى التصميم النهائي — نصنع هوية بصرية تلفت الأنظار. لنبنِ هويتك.",
    designs_cta_btn: "ابدأ مشروعك",
    designs_cta_reels: "شاهد الريلز",
    reels_eyebrow: "تصوير · إخراج · مونتاج من غراي",
    reels_sub: "قصص عمودية صنعناها لعملائنا — من الفكرة حتى المونتاج النهائي. كل لقطة مصمّمة لتوقف التمرير.",
    reels_stat_reels: "ريلز منتَجة",
    reels_stat_clients: "علامات تم تصويرها",
    reels_stat_views: "إجمالي المشاهدات",
    reels_bar: "إنتاج غراي",
    reels_watch: "شاهد على إنستغرام",
    reels_back: "رجوع",
    nav_clients: "عملاؤنا",
    clients_eyebrow: "علامات نصنع لها",
    clients_sub: "كل شعار هنا علامة نصوّر لها ونصمّم وننمّيها. اضغط على أي عميل لترى الريلز والتصاميم التي صنعناها له.",
    clients_stat_clients: "عميل",
    clients_stat_reels: "ريلز",
    clients_stat_designs: "تصميم",
    clients_search: "ابحث عن عميل",
    clients_empty: "لا يوجد عميل بهذا الاسم.",
    clients_all: "كل العملاء",
    clients_cta_h: "قد تكون علامتك الشعار التالي هنا.",
    clients_cta_p: "حدّثنا عن مشروعك، ونحن نتولى التصوير والتصميم والنمو.",
    clients_cta_btn: "ابدأ مشروعك",
    reels_cta_h: "علامتك التجارية تستحق ريلز يحقق نتائج.",
    reels_cta_p: "من الفكرة الأولى حتى التصدير النهائي — نتولى الإنتاج بالكامل. لنصنع شيئاً يستحق المشاهدة.",
    reels_cta_btn: "ابدأ الريلز الخاص بك",
    reels_cta_designs: "شاهد تصاميمنا",
    hct_label: "وكالة تسويق إبداعية",
    cin_a1: "رؤية",
    cin_a2: "جديدة",
    cin_b1: "اكتشف",
    cin_bg2: "اكتشف",
    cin_a3: "ما وراء",
    cin_b2: "الأفق",
    hero_bg_word: "قصص",
    hero_tagline_top: "لا نصنع فحسب",
    hero_tagline_bot: `نحن نروي <span class="accent">القصص</span>`,
    hero_download: "تحميل ملف الأعمال",
    hero_journey: "ابدأ رحلتك",
    rp_showreel: "أحدث أعمالنا &nbsp;·&nbsp; 2025",
    rp_sub: "نحوّل الأفكار إلى قصص استثنائية",
    rp_playing: "يُعرض الآن",
    rp_watch: "شاهد الآن",
    rp_scroll: "اسحب",
    tab_profile: "ملف الشركة",
    tab_about: "من نحن",
    tab_grey: "وكالة غراي",
    intro_heading: "مقدمة",
    intro_p1a: `في <strong>غراي</strong>، لا نرى العالم بالأبيض والأسود.<br>نعمل في المساحة البينية — منطقة الرمادي.`,
    intro_p1b: `لأن لا شيء في الحياة مطلق. كل شيء مليء بالتفاصيل والظلال ووجهات النظر المختلفة.<br>كما قال الله تعالى: <em>«وَنَفْسٍ وَمَا سَوَّاهَا، فَأَلْهَمَهَا فُجُورَهَا وَتَقْوَاهَا»</em> كل إنسان يحمل الجانبين في داخله، وكل قصة يمكن رؤيتها من أكثر من زاوية. من هنا وُلدت فكرتنا.`,
    intro_li0: "لا نقدم خدمات فحسب",
    intro_li1: "نبني صورة",
    intro_li2: "نصنع مشاعر",
    intro_li3: "نصوغ هويات تدوم",
    intro_p2a: `<strong>غراي</strong> ليست محايدة بالنسبة لنا… إنها عالم مليء بالظلال، حيث لكل ظل معنى، ولكل درجة رسالة، وكل فارق صغير يمكن أن يصنع أثراً كبيراً.`,
    intro_p2b: `نفهمها. نحللها. نراها من كل زاوية، لنستخرج قيمتها الحقيقية من منظور جديد.<br><em>منظور جديد — ليست مجرد شعار.</em>`,
    intro_p2c: `<strong>غراي</strong> ليست مجرد وكالة تسويق.<br>إنها طريقة تفكير.`,
    intro_p3a: `هكذا نعمل — نغوص عميقاً في التفاصيل، نفهم الدوافع قبل العلامة التجارية، ونستكشف السوق والجمهور والفرص التي يغفل عنها الآخرون.`,
    intro_p3b: `يضم فريقنا أكثر من <span class="gs-counter" data-target="25">25</span> متخصص في التسويق والهوية التجارية والإنتاج الإعلامي — تم اختيارهم بعناية وتدريبهم باحترافية، يجلب كل منهم رؤية قبل المهارة.`,
    svc_badge: "خدمات",
    svc_digital: "التسويق الرقمي",
    svc_branding: "الهوية التجارية",
    svc_media_prod: "الإنتاج الإعلامي",
    svc_media_buy: "شراء الإعلانات",
    svc_print: "المطبوعات",
    svc_events: "الفعاليات",
    svc_giveaway: "الهدايا الترويجية",
    partners_heading: `<span style="color:#fef7f5;">شركاؤنا</span>`,
    partners_sub: "يثق بنا كبار العلامات التجارية والمحترفين في مختلف القطاعات",
    contact_h1: "هل أنت مستعد للارتقاء",
    contact_h2: "بعلامتك التجارية؟",
    contact_body: "دعنا نتعاون لنصنع شيئاً استثنائياً. تواصل معنا لنناقش كيف يمكننا مساعدتك في تحويل علامتك التجارية إلى أسطورة.",
    cta_download: "تحميل ملف الأعمال",
    cta_touch: "تواصل معنا",
    cta_portfolio: "استعرض الأعمال",
    footer_brand: "وكالة غراي",
    footer_tagline: "نحوّل العلامات التجارية من خلال الإبداع الاستراتيجي وحلول التسويق المبتكرة.",
    footer_links_h: "روابط سريعة",
    footer_contact_h: "تواصل",
    footer_link_home: "الرئيسية",
    footer_link_about: "من نحن",
    footer_link_services: "خدماتنا",
    footer_link_portfolio: "أعمالنا",
    footer_link_partners: "شركاؤنا",
    footer_copy: "© 2026 وكالة غراي. جميع الحقوق محفوظة.",
    lang_btn: "English",
    contact_page_h1: "تواصل",
    contact_page_h2: "معنا",
    contact_page_sub: "دعنا نتعاون لنصنع شيئاً استثنائياً. أكمل النموذج أدناه وسنرد عليك في أقرب وقت.",
    form_name_label: "الاسم الكامل",
    form_email_label: "البريد الإلكتروني",
    form_phone_label: "رقم الهاتف",
    form_msg_label: "الرسالة",
    form_name_ph: "أدخل اسمك الكامل",
    form_email_ph: "بريدك@مثال.com",
    form_phone_ph: "+20 10 0000 0000",
    form_msg_ph: "أخبرنا عن مشروعك...",
    form_submit: "إرسال الرسالة",
    form_success: "✓ شكراً! تم إرسال رسالتك بنجاح. سنرد عليك قريباً.",
    form_error: "✗ عذراً! حدث خطأ. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة.",
    contact_direct: "أو تواصل معنا مباشرة:",
    portfolio_title: `<span style="color:#fef7f5;">أعمالنا</span>`,
    portfolio_sub: "معرض إبداعي لأعمالنا وقصصنا البصرية",
  },
};

let currentLang = "en";

function applyLanguage(lang) {
  currentLang = lang;
  const isAr = lang === "ar";
  const t = translations[lang];

  // Set HTML attributes
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", isAr ? "rtl" : "ltr");

  // Replace all [data-i18n] elements via innerHTML
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Replace placeholder attributes
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key] !== undefined) el.setAttribute("placeholder", t[key]);
  });

  // Show/hide lang-specific elements (e.g. rp-title)
  document.querySelectorAll(".lang-en").forEach((el) => {
    el.style.display = isAr ? "none" : "";
  });
  document.querySelectorAll(".lang-ar").forEach((el) => {
    el.style.display = isAr ? "" : "none";
  });

  // Re-run counters in already-animated sections
  document
    .querySelectorAll(".gs-section[data-gs-animated]")
    .forEach((section) => {
      section.querySelectorAll(".gs-counter").forEach((el) => {
        gsRunCounter(el);
      });
    });

  // Update all lang toggle buttons text
  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    btn.textContent = t.lang_btn;
  });

  // Save to localStorage
  try { localStorage.setItem("grey_lang", lang); } catch (e) {}
}

(function initLangSwitcher() {
  // Wire up toggle buttons
  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyLanguage(currentLang === "en" ? "ar" : "en");
    });
  });

  // Load saved preference
  let saved = "en";
  try { saved = localStorage.getItem("grey_lang") || "en"; } catch (e) {}
  applyLanguage(saved);
})();
