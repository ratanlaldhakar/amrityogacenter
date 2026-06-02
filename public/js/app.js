/*
=========================================
YOGAMRIT YOGA CENTER - INTERACTIVE SCRIPTING V3
=========================================
*/

document.addEventListener('DOMContentLoaded', async () => {
  // Register GSAP ScrollTrigger
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch (e) {
    console.warn("GSAP ScrollTrigger registration skipped:", e);
  }
  
  // 1. DYNAMIC DATA RENDERING ENGINE (POPULATE DOM)
  try {
    await renderDynamicContent();
  } catch (e) {
    console.error("FATAL: Failed to render dynamic content from database:", e);
  }
  
  // 2. INITIALIZE INTERACTIVE UI TRIGGERS (AFTER DOM INJECTION)
  const initializers = [
    { name: "Header", fn: initHeader },
    { name: "ThemeSwitcher", fn: initThemeSwitcher },
    { name: "CustomCursor", fn: initCustomCursor },
    { name: "TiltEffects", fn: initTiltEffects },
    { name: "ScrollAnimations", fn: initScrollAnimations },
    { name: "StatsCounter", fn: initStatsCounter },
    { name: "CircularInfographic", fn: initCircularInfographic },
    { name: "GalleryFilterAndLightbox", fn: initGalleryFilterAndLightbox },
    { name: "TestimonialsSlider", fn: initTestimonialsSlider },
    { name: "ReviewSubmissionSystem", fn: initReviewSubmissionSystem }
  ];

  initializers.forEach(init => {
    try {
      init.fn();
      console.log(`Successfully initialized: ${init.name}`);
    } catch (e) {
      console.error(`Error initializing ${init.name}:`, e);
    }
  });
});

/* 
=========================================
0. DYNAMIC DOM RENDERING PIPELINE
=========================================
*/
async function renderDynamicContent() {
  console.log("Starting dynamic content rendering...");
  
  // Fetch data records from dbService with robust fallbacks
  let hp = null;
  try { hp = await dbService.getHomepage(); } catch(e) { console.error("Error fetching homepage:", e); }
  if (!hp) hp = (window.getLocalDB ? window.getLocalDB().homepage : null) || (window.DEFAULT_DATABASE ? window.DEFAULT_DATABASE.homepage : {});

  let coach = null;
  try { coach = await dbService.getCoach(); } catch(e) { console.error("Error fetching coach:", e); }
  if (!coach) coach = (window.getLocalDB ? window.getLocalDB().coach : null) || (window.DEFAULT_DATABASE ? window.DEFAULT_DATABASE.coach : {});

  let services = null;
  try { services = await dbService.getServices(); } catch(e) { console.error("Error fetching services:", e); }
  if (!services || !Array.isArray(services)) services = (window.getLocalDB ? window.getLocalDB().services : null) || (window.DEFAULT_DATABASE ? window.DEFAULT_DATABASE.services : []);

  let timeline = null;
  try { timeline = await dbService.getTimeline(); } catch(e) { console.error("Error fetching timeline:", e); }
  if (!timeline || !Array.isArray(timeline)) timeline = (window.getLocalDB ? window.getLocalDB().timeline : null) || (window.DEFAULT_DATABASE ? window.DEFAULT_DATABASE.timeline : []);

  let gallery = null;
  try { gallery = await dbService.getGallery(); } catch(e) { console.error("Error fetching gallery:", e); }
  if (!gallery || !Array.isArray(gallery)) gallery = (window.getLocalDB ? window.getLocalDB().gallery : null) || (window.DEFAULT_DATABASE ? window.DEFAULT_DATABASE.gallery : []);

  let reviews = null;
  try { reviews = await dbService.getReviews(); } catch(e) { console.error("Error fetching reviews:", e); }
  if (!reviews || !Array.isArray(reviews)) reviews = (window.getLocalDB ? window.getLocalDB().reviews : null) || (window.DEFAULT_DATABASE ? window.DEFAULT_DATABASE.reviews : []);
  
  // A. POPULATE HOMEPAGE INFORMATION WIDGETS
  // Navbar Free Trial CTA
  const navCta = document.getElementById("nav-cta-btn");
  if (navCta) navCta.href = `tel:${hp.phone_primary}`;
  
  // Hero CTA buttons
  const heroWa = document.getElementById("hero-wa-btn");
  if (heroWa) heroWa.href = `https://wa.me/91${hp.phone_primary}?text=Namaste! I would like to book a free trial class at Yogamrit Yoga Center.`;
  const heroCall = document.getElementById("hero-call-btn");
  if (heroCall) heroCall.href = `tel:${hp.phone_primary}`;
  
  // Contact panel elements
  const contactAddress = document.getElementById("contact-address-text");
  if (contactAddress) contactAddress.innerHTML = hp.address.replace(/,/g, ",<br>");
  const contactPhone = document.getElementById("contact-phone-primary");
  if (contactPhone) {
    contactPhone.href = `tel:${hp.phone_primary}`;
    contactPhone.textContent = `+91 ${hp.phone_primary}`;
  }
  const contactSupport = document.getElementById("contact-phone-support");
  if (contactSupport) {
    contactSupport.href = `tel:${hp.phone_support}`;
    contactSupport.textContent = `+91 ${hp.phone_support}`;
  }
  const contactInsta = document.getElementById("contact-insta-handle");
  if (contactInsta) contactInsta.textContent = hp.insta;
  
  // Contact button triggers
  const btnCall = document.getElementById("contact-btn-call-trigger");
  if (btnCall) btnCall.href = `tel:${hp.phone_primary}`;
  const btnWa = document.getElementById("contact-btn-wa-trigger");
  if (btnWa) btnWa.href = `https://wa.me/91${hp.phone_primary}?text=Namaste! I am inquiring about admissions at Yogamrit Yoga Center.`;
  const btnInsta = document.getElementById("contact-btn-insta-trigger");
  if (btnInsta) btnInsta.href = `https://instagram.com/${hp.insta.replace('@', '')}`;
  
  // Set dynamic map directions link
  const btnMaps = document.querySelector(".contact-btn-maps");
  if (btnMaps) btnMaps.href = hp.map_link || "https://share.google/5AmTYJHojblGNDEIl";
  
  // Footer elements
  const footerTagline = document.getElementById("footer-tagline-text");
  if (footerTagline) footerTagline.textContent = hp.tagline;
  const footerInstaIcon = document.getElementById("footer-insta-icon");
  if (footerInstaIcon) footerInstaIcon.href = `https://instagram.com/${hp.insta.replace('@', '')}`;
  const footerWaIcon = document.getElementById("footer-wa-icon");
  if (footerWaIcon) footerWaIcon.href = `https://wa.me/91${hp.phone_primary}`;
  const footerCallIcon = document.getElementById("footer-call-icon");
  if (footerCallIcon) footerCallIcon.href = `tel:${hp.phone_primary}`;
  
  const footerAddress = document.getElementById("footer-address-text");
  if (footerAddress) footerAddress.textContent = hp.address;
  const footerPhone = document.getElementById("footer-phone-text");
  if (footerPhone) {
    footerPhone.href = `tel:${hp.phone_primary}`;
    footerPhone.textContent = `+91 ${hp.phone_primary}`;
  }
  const footerEmail = document.getElementById("footer-email-text");
  if (footerEmail) footerEmail.textContent = hp.email;
  const footerInstaText = document.getElementById("footer-insta-text");
  if (footerInstaText) footerInstaText.textContent = hp.insta;
  
  // H. POPULATE ACHIEVEMENTS STATS & HIGHLIGHTS LIVE
  const statMedals = document.getElementById("stat-medals");
  if (statMedals) statMedals.setAttribute("data-target", hp.stat_medals || "15");
  const statStudents = document.getElementById("stat-students");
  if (statStudents) statStudents.setAttribute("data-target", hp.stat_students || "2000");
  const statYears = document.getElementById("stat-years");
  if (statYears) statYears.setAttribute("data-target", hp.stat_years || "12");
  const statCompetitors = document.getElementById("stat-competitors");
  if (statCompetitors) statCompetitors.setAttribute("data-target", hp.stat_competitors || "150");

  const highlightTitle1 = document.getElementById("highlight-title-1");
  if (highlightTitle1) highlightTitle1.textContent = hp.highlight_title_1 || "";
  const highlightDesc1 = document.getElementById("highlight-desc-1");
  if (highlightDesc1) highlightDesc1.textContent = hp.highlight_desc_1 || "";
  const highlightTitle2 = document.getElementById("highlight-title-2");
  if (highlightTitle2) highlightTitle2.textContent = hp.highlight_title_2 || "";
  const highlightDesc2 = document.getElementById("highlight-desc-2");
  if (highlightDesc2) highlightDesc2.textContent = hp.highlight_desc_2 || "";
  
  // Dynamic About / Why Choose image and vertical alignment
  const elAboutImg = document.getElementById("about-image");
  if (elAboutImg) {
    if (hp.about_image) elAboutImg.src = hp.about_image;
    if (hp.about_image_align) {
      elAboutImg.style.objectPosition = `center ${hp.about_image_align}`;
    } else {
      elAboutImg.style.objectPosition = "center center";
    }
  }
  
  // B. POPULATE COACH DETAILS & TIMELINE
  const elCoachName = document.getElementById("coach-title-name");
  if (elCoachName) elCoachName.textContent = `Meet Head Coach ${coach.name}`;
  const elCoachSub = document.getElementById("coach-sub-title");
  if (elCoachSub) elCoachSub.textContent = coach.title;
  const elCoachBio = document.getElementById("coach-bio-lead");
  if (elCoachBio) elCoachBio.innerHTML = `Coach <strong>${coach.name}</strong> is an elite competitive yoga coach, national-level gold medalist, and AIU silver medalist with over <strong>${coach.experience}</strong> of coaching experience.`;
  const elCoachQuote = document.getElementById("coach-quote-text");
  if (elCoachQuote) elCoachQuote.textContent = `"${coach.quote}"`;
  const elCoachImg = document.getElementById("coach-image");
  if (elCoachImg) {
    elCoachImg.src = coach.image;
    if (coach.image_align) {
      elCoachImg.style.objectPosition = `center ${coach.image_align}`;
    } else {
      elCoachImg.style.objectPosition = "center top"; // Recommended top crop default
    }
  }
  
  // Render timeline milestones list
  const timelineContainer = document.getElementById("coach-timeline");
  if (timelineContainer) {
    timelineContainer.innerHTML = "";
    timeline.forEach(item => {
      const milestone = document.createElement("div");
      milestone.className = "timeline-item";
      milestone.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-date">${item.year}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-desc">${item.desc}</div>
      `;
      timelineContainer.appendChild(milestone);
    });
  }
  
  // C. POPULATE 12 SERVICE CARDS
  const servicesGrid = document.getElementById("services-grid");
  if (servicesGrid) {
    servicesGrid.innerHTML = "";
    services.forEach(s => {
      const card = document.createElement("div");
      card.className = "service-card glass-panel";
      card.setAttribute("data-tilt", "");
      card.innerHTML = `
        <div class="service-icon-box">
          <i class="fa-solid ${s.icon}"></i>
        </div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <a href="https://wa.me/91${hp.phone_primary}?text=Namaste!%20I%20am%20interested%20in%20${encodeURIComponent(s.title)}." target="_blank" class="service-learn-more">
          Inquire Now <i class="fa-solid fa-arrow-right"></i>
        </a>
      `;
      servicesGrid.appendChild(card);
    });
  }
  
  // D. POPULATE GALLERY MASONRY PHOTOS & DYNAMIC FILTER BUTTONS
  const filtersContainer = document.getElementById("gallery-filters-container");
  if (filtersContainer) {
    filtersContainer.innerHTML = "";
    
    // Create 'All Photos' default filter button
    const btnAll = document.createElement("button");
    btnAll.className = "filter-btn active";
    btnAll.setAttribute("data-filter", "all");
    btnAll.textContent = "All Photos";
    filtersContainer.appendChild(btnAll);
    
    // Query categories from dbService and append filter buttons
    const categories = await dbService.getGalleryCategories();
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "filter-btn";
      btn.setAttribute("data-filter", cat.id);
      btn.textContent = cat.name;
      filtersContainer.appendChild(btn);
    });
  }

  const galleryGrid = document.getElementById("gallery-grid");
  if (galleryGrid) {
    galleryGrid.innerHTML = "";
    gallery.forEach(item => {
      const card = document.createElement("div");
      card.className = "gallery-item";
      card.setAttribute("data-category", item.category);
      card.innerHTML = `
        <img src="${item.src}" alt="${item.caption}">
        <div class="gallery-overlay">
          <h4>${item.title}</h4>
          <p>${item.caption}</p>
        </div>
      `;
      galleryGrid.appendChild(card);
    });
  }
  
  // E. POPULATE TESTIMONIALS SLIDER TRACK
  const reviewsTrack = document.getElementById("testimonials-track");
  const dotsContainer = document.getElementById("testimonial-dots");
  if (reviewsTrack && dotsContainer) {
    reviewsTrack.innerHTML = "";
    dotsContainer.innerHTML = "";
    
    if (!reviews.length) {
      reviewsTrack.innerHTML = `
        <div class="testimonial-slide">
          <div class="testimonial-card glass-panel">
            <p class="testimonial-text">"No verified reviews found. Click 'Share Your Experience' below to submit a review."</p>
          </div>
        </div>
      `;
    } else {
      reviews.forEach((r, idx) => {
        const stars = '<i class="fa-solid fa-star"></i>'.repeat(r.rating) + '<i class="fa-regular fa-star"></i>'.repeat(5 - r.rating);
        const slide = document.createElement("div");
        slide.className = "testimonial-slide";
        slide.innerHTML = `
          <div class="testimonial-card glass-panel">
            <i class="fa-solid fa-quote-left quote-icon"></i>
            <div class="testimonial-rating">${stars}</div>
            <p class="testimonial-text">"${r.text}"</p>
            <div class="testimonial-user">
              <img src="${r.avatar}" alt="${r.name}" class="testimonial-avatar">
              <div class="testimonial-info">
                <h4>${r.name}</h4>
                <p>Verified Practitioner</p>
              </div>
            </div>
          </div>
        `;
        reviewsTrack.appendChild(slide);
        
        // Add dot navigation indicator dynamically
        const dot = document.createElement("div");
        dot.className = `testimonial-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute("data-index", idx);
        dotsContainer.appendChild(dot);
      });
    }
  }
  
  // I. POPULATE YOUTUBE VIDEOS GRID
  const videosGrid = document.getElementById("videos-grid");
  if (videosGrid) {
    videosGrid.innerHTML = "";
    const youtubeVideos = await dbService.getYoutubeVideos();
    if (!youtubeVideos || youtubeVideos.length === 0) {
      videosGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-secondary); padding: 40px;">
          <p>No videos available at the moment. Please check back later.</p>
        </div>
      `;
    } else {
      youtubeVideos.forEach(v => {
        const card = document.createElement("div");
        card.className = "video-card";
        card.innerHTML = `
          <div class="video-wrapper">
            <iframe 
              src="https://www.youtube.com/embed/${v.video_id}" 
              title="${v.title}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen>
            </iframe>
          </div>
          <div class="video-info">
            <h3>${v.title}</h3>
            <p>${v.desc}</p>
          </div>
        `;
        videosGrid.appendChild(card);
      });
    }
  }
  
  console.log("Completed dynamic content injection!");
}

/* 
=========================================
1. HEADER SCROLL & HAMBURGER MENU
=========================================
*/
function initHeader() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!header || !hamburger || !navMenu) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* 
=========================================
1B. DUAL LIGHT/DARK THEME SWITCHER
=========================================
*/
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle');
  
  if (!toggleBtn) return;
  
  const savedTheme = localStorage.getItem('theme');
  const isLight = savedTheme === 'light';
  
  if (isLight) {
    document.body.classList.add('light-theme');
    setTimeout(() => {
      if (window.updateThreeTheme) {
        window.updateThreeTheme(true);
      }
    }, 200);
  }
  
  toggleBtn.addEventListener('click', () => {
    const hasLightClass = document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', hasLightClass ? 'light' : 'dark');
    if (window.updateThreeTheme) {
      window.updateThreeTheme(hasLightClass);
    }
    
    // Mobile-Only Theme Toggle Spin Easing
    if (window.innerWidth <= 991) {
      gsap.to(toggleBtn, {
        rotation: '+=360',
        scale: 0.8,
        duration: 0.4,
        ease: 'back.out(1.5)',
        onComplete: () => {
          gsap.to(toggleBtn, { scale: 1, duration: 0.15 });
        }
      });
    }
  });
}

/* 
=========================================
2. CUSTOM ORGANIC CURSOR (Lag-Trail Follower)
=========================================
*/
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  
  if (!cursor || !follower) return;
  
  let posX = 0, posY = 0;
  let mouseX = 0, mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  
  function updateFollower() {
    posX += (mouseX - posX) * 0.12;
    posY += (mouseY - posY) * 0.12;
    
    follower.style.left = posX + 'px';
    follower.style.top = posY + 'px';
    
    requestAnimationFrame(updateFollower);
  }
  updateFollower();
  
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.6)';
    follower.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });
  
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
  
  const hoverables = document.querySelectorAll('a, button, .benefit-node, .gallery-item, .service-card, .stat-card, .filter-btn, .theme-toggle-btn');
  hoverables.forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
}

/* 
=========================================
3. 3D TILT EFFECT (Card Parallax on Hover)
=========================================
*/
function initTiltEffects() {
  const tiltCards = document.querySelectorAll('[data-tilt]');
  
  if (window.innerWidth < 992) return;
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const mouseX = e.clientX - cardRect.left;
      const mouseY = e.clientY - cardRect.top;
      
      const rotX = ((cardRect.height / 2 - mouseY) / (cardRect.height / 2)) * 12;
      const rotY = ((mouseX - cardRect.width / 2) / (cardRect.width / 2)) * 12;
      
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
      card.style.borderColor = 'rgba(255, 153, 51, 0.45)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.borderColor = 'var(--glass-border)';
    });
  });
}

/* 
=========================================
4. GSAP SCROLL-TRIGGERED ENTRANCES
=========================================
*/
function initScrollAnimations() {
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
  
  if (document.getElementById('about-image')) {
    // 3D fold-in transition on scroll
    gsap.from('#about-image', {
      opacity: 0,
      rotationY: -15,
      rotationX: 5,
      scale: 0.92,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 75%'
      }
    });
  }
  
  if (document.getElementById('coach-image')) {
    // 3D fold-in flip on scroll
    gsap.from('#coach-image', {
      opacity: 0,
      rotationY: 15,
      rotationX: 5,
      scale: 0.92,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#coach',
        start: 'top 75%'
      }
    });
  }
  
  gsap.from('.about-feature-item', {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-features',
      start: 'top 85%'
    }
  });
  
  gsap.from('.timeline-item', {
    opacity: 0,
    x: -30,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 80%'
    }
  });
  
  gsap.from('.service-card', {
    opacity: 0,
    y: 50,
    stagger: 0.08,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 80%'
    }
  });
  
  gsap.from('.highlight-box', {
    opacity: 0,
    x: (i) => i === 0 ? -60 : 60,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.achievements-highlights',
      start: 'top 85%'
    }
  });

  // Mobile-only benefits cards scroll triggered entrance animation
  if (window.innerWidth <= 768) {
    gsap.from('.mobile-benefit-card', {
      opacity: 0,
      y: 40,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#mobile-benefits-list',
        start: 'top 85%'
      }
    });
  }
}

/* 
=========================================
5. STATS DYNAMIC COUNTERS
=========================================
*/
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 85%',
      onEnter: () => {
        let counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            stat.textContent = Math.floor(counter.value) + '+';
          }
        });
      }
    });
  });
}

/* 
=========================================
6. INTERACTIVE CIRCULAR INFOGRAPHIC
=========================================
*/
const benefitData = {
  'weight-loss': {
    title: 'Weight Loss & Tone',
    icon: 'fa-weight-scale',
    desc: 'Boost metabolic operations, shred stubborn visceral fat, and strengthen lean muscles using active dynamic vinyasa flow schedules and custom core building poses under direct coaching.',
    bullets: [
      'Actively elevates heart rate and calories burn',
      'Tightens abdominal core muscles',
      'Regulates hunger hormones and digestive tracts'
    ]
  },
  'womens-health': {
    title: "Women's Wellness Yoga",
    icon: 'fa-person-dress',
    desc: 'Nurture pelvic floor strength, structural posture correction, and general energetic balance designed to align menstrual rhythms and build deep internal core stability.',
    bullets: [
      'Alleviates pelvic and lumbar stress points',
      'Strengthens lower back and deep pelvic joints',
      'Enhances natural structural alignment'
    ]
  },
  'hormonal-balance': {
    title: 'Hormonal Balance',
    icon: 'fa-yin-yang',
    desc: 'Deeply balancing sequences utilizing targeted compression postures to stimulate and soothe thyroid, adrenal, pineal, and general glandular operations.',
    bullets: [
      'Soothes endocrine fluctuations',
      'Supports optimal thyroid and metabolic functions',
      'Alleviates stress-induced high cortisol deposits'
    ]
  },
  'flexibility-mobility': {
    title: 'Flexibility & Mobility',
    icon: 'fa-person-running',
    desc: 'Unblock muscle fibers, loosen calcified connective tissues, and maximize active athletic range of motion using professional myofascial stretching protocols.',
    bullets: [
      'Unlocks tight hamstring and hip joints',
      'Improves vascular blood circulation throughout limbs',
      'Drastically reduces athletic skeletal injury risks'
    ]
  },
  'posture-improvement': {
    title: 'Posture Improvement',
    icon: 'fa-child',
    desc: 'Reverse desk-slouch damage, align spinal curves, and reinforce shoulder blades to establish an elegant, pain-free posture aligned to natural geometry.',
    bullets: [
      'Re-aligns slouched vertebrae structure',
      'Strengthens spinal cord suspension muscles',
      'Relieves chronic neck, shoulder, and upper back pains'
    ]
  },
  'stress-relief': {
    title: 'Stress Relief & Calm',
    icon: 'fa-spa',
    desc: 'Activate the parasympathetic nervous system (rest & digest) through restorative alignments, scientific breathing, and deep yoga-nidra meditation.',
    bullets: [
      'Calms heart rate and high blood pressure',
      'Clears mental clutter and cognitive exhaustions',
      'Restores deep sleep cycles and mental rest'
    ]
  },
  'mental-wellness': {
    title: 'Mental Wellness',
    icon: 'fa-brain',
    desc: 'Sharpen cognitive concentration, reinforce mental discipline, and build robust focus. Ideal for students, athletes, and professionals needing deep concentration.',
    bullets: [
      'Builds focus and analytical concentration skills',
      'Enhances oxygen supply to cortical zones',
      'Develops emotional steadiness and mental grit'
    ]
  },
  'energy-enhancement': {
    title: 'Energy Enhancement',
    icon: 'fa-bolt',
    desc: 'Recharge your pranic energy flows. Clear internal blocks, enhance cellular respiration, and feel active and rejuvenated throughout the day.',
    bullets: [
      'Restores stamina and physical cell oxygenations',
      'Recharges natural body vitality (Prana)',
      'Flushes out chronic lethargy and physical fatigue'
    ]
  }
};

function initCircularInfographic() {
  // Populate mobile benefits list dynamically
  const mobileList = document.getElementById("mobile-benefits-list");
  if (mobileList) {
    mobileList.innerHTML = "";
    Object.keys(benefitData).forEach(key => {
      const data = benefitData[key];
      const card = document.createElement("div");
      card.className = "mobile-benefit-card glass-panel";
      card.style.padding = "25px 20px";
      
      const bulletsHtml = data.bullets.map(b => `<li><i class="fa-solid fa-circle-check" style="color:var(--color-saffron); margin-right:8px;"></i> ${b}</li>`).join("");
      
      card.innerHTML = `
        <h4 style="color: var(--color-saffron); font-size: 1.25rem; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
          <i class="fa-solid ${data.icon}"></i> ${data.title}
        </h4>
        <p style="font-size: 0.95rem; color: var(--color-text-secondary); margin-bottom: 15px; line-height: 1.6;">${data.desc}</p>
        <ul class="infographic-detail-list" style="margin-left: 0; display:flex; flex-direction:column; gap:8px; list-style:none;">
          ${bulletsHtml}
        </ul>
      `;
      mobileList.appendChild(card);
    });
  }

  const nodes = document.querySelectorAll('.benefit-node');
  const titleEl = document.getElementById('benefit-title');
  const descEl = document.getElementById('benefit-desc');
  const bulletsEl = document.getElementById('benefit-bullets');
  const orbit = document.querySelector('.infographic-orbit');
  
  if (!nodes.length || !titleEl) return;
  
  let currentRotation = 0;
  
  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      
      currentRotation += 45;
      orbit.style.transform = `rotate(${currentRotation}deg)`;
      
      const benefitKey = node.getAttribute('data-benefit');
      const data = benefitData[benefitKey];
      
      if (!data) return;
      
      gsap.to('#detail-panel', {
        opacity: 0,
        y: 15,
        duration: 0.25,
        onComplete: () => {
          titleEl.innerHTML = `<i class="fa-solid ${data.icon}"></i> ${data.title}`;
          descEl.textContent = data.desc;
          
          bulletsEl.innerHTML = '';
          data.bullets.forEach(bullet => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${bullet}`;
            bulletsEl.appendChild(li);
          });
          
          gsap.to('#detail-panel', {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out'
          });
        }
      });
    });
  });
}

/* 
=========================================
7. MASONRY GALLERY WITH FILTERING & LIGHTBOX
=========================================
*/
function initGalleryFilterAndLightbox() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  
  if (!galleryItems.length || !lightbox) return;
  
  let activeCategory = 'all';
  let filteredItems = Array.from(galleryItems);
  let currentImgIndex = 0;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      activeCategory = btn.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        
        if (activeCategory === 'all' || itemCat === activeCategory) {
          item.style.display = 'block';
          gsap.to(item, { scale: 1, opacity: 1, duration: 0.4 });
        } else {
          gsap.to(item, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              item.style.display = 'none';
            }
          });
        }
      });
      
      setTimeout(() => {
        filteredItems = Array.from(galleryItems).filter(item => {
          return activeCategory === 'all' || item.getAttribute('data-category') === activeCategory;
        });
      }, 400);
    });
  });
  
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      currentImgIndex = filteredItems.indexOf(item);
      openLightbox();
    });
  });
  
  function openLightbox() {
    const targetItem = filteredItems[currentImgIndex];
    if (!targetItem) return;
    
    const imgSrc = targetItem.querySelector('img').src;
    const imgCaption = targetItem.querySelector('.gallery-overlay h4').textContent;
    
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = imgCaption;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  function navigateLightbox(direction) {
    currentImgIndex += direction;
    
    if (currentImgIndex < 0) {
      currentImgIndex = filteredItems.length - 1;
    } else if (currentImgIndex >= filteredItems.length) {
      currentImgIndex = 0;
    }
    
    gsap.to(lightboxImg, {
      opacity: 0,
      scale: 0.95,
      duration: 0.15,
      onComplete: () => {
        const nextItem = filteredItems[currentImgIndex];
        lightboxImg.src = nextItem.querySelector('img').src;
        lightboxCaption.textContent = nextItem.querySelector('.gallery-overlay h4').textContent;
        
        gsap.to(lightboxImg, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: 'power2.out'
        });
      }
    });
  }
  
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  nextBtn.addEventListener('click', () => navigateLightbox(1));
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-container')) {
      closeLightbox();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

/* 
=========================================
8. TESTIMONIALS SLIDER (Auto-Play Carousel)
=========================================
*/
function initTestimonialsSlider() {
  const track = document.getElementById('testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  
  if (!track || !slides.length) return;
  
  let currentIndex = 0;
  let autoplayInterval;
  
  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }
  
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 7000);
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoplay();
    startAutoplay();
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoplay();
    startAutoplay();
  });
  
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.getAttribute('data-index'));
      updateSlider();
      stopAutoplay();
      startAutoplay();
    });
  });
  
  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);
  
  startAutoplay();
}

/* 
=========================================
9. INTERACTIVE REVIEWS SUBMISSION SYSTEM
=========================================
*/
function initReviewSubmissionSystem() {
  const openBtn = document.getElementById("open-review-modal-btn");
  const closeBtn = document.getElementById("close-review-modal-btn");
  const cancelBtn = document.getElementById("cancel-review-btn");
  const modal = document.getElementById("review-submission-modal");
  const form = document.getElementById("submit-review-form");
  const starNodes = document.querySelectorAll(".star-rating-node");
  const ratingInput = document.getElementById("input-rev-rating");
  const toast = document.getElementById("review-success-toast");
  
  if (!openBtn || !modal || !form) return;
  
  // Open modal
  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
  
  // Close modal helper
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
    form.reset();
    resetStars();
  };
  
  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  
  // Close modal on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("lightbox-container")) {
      closeModal();
    }
  });
  
  // Star rating nodes hover & click selector
  starNodes.forEach(star => {
    star.addEventListener("click", () => {
      const val = parseInt(star.getAttribute("data-val"));
      ratingInput.value = val;
      
      // Update star designs
      starNodes.forEach((s, idx) => {
        if (idx < val) {
          s.style.color = "var(--color-gold)";
        } else {
          s.style.color = "var(--color-text-secondary)";
        }
      });
    });
  });
  
  function resetStars() {
    ratingInput.value = "5";
    starNodes.forEach(s => {
      s.style.color = "var(--color-gold)";
    });
  }
  // Initialize stars as solid gold
  resetStars();
  
  // Form submission handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("input-rev-name").value;
    const rating = ratingInput.value;
    const text = document.getElementById("input-rev-text").value;
    
    if (!name || !text) return;
    
    // Add review with approved: false to database
    await dbService.addReview(name, rating, text);
    
    // Close modal
    closeModal();
    
    // Trigger dynamic success glassmorphic notification toast
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 4500);
  });
}
    
 
