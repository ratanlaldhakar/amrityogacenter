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
    
 
