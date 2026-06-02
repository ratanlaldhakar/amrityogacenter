/*
=========================================
YOGAMRIT YOGA CENTER - DATABASE LAYER (LOCALSTORAGE & SUPABASE)
=========================================
*/

// Toggle true to connect to Supabase Cloud Database
const USE_SUPABASE = true; 
const SUPABASE_URL = "https://kxsovgiapzbpxahtkbuo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4c292Z2lhcHpicHhhaHRrYnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MDAzMjcsImV4cCI6MjA5NTk3NjMyN30.cKlyTzjutLCrFsqflsMBVGZa1HtuygD_RqL3ctMorVM";

let supabase = null;
if (USE_SUPABASE) {
  if (typeof window.supabase !== "undefined" && window.supabase.createClient) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  } else {
    console.error("Supabase Client is not loaded. Please ensure the CDN script is loaded in your HTML.");
  }
}


// Standard pre-populated default database
const DEFAULT_DATABASE = {
  admin_creds: {
    username: "admin",
    password: "yogamrit@2026"
  },
  homepage: {
    tagline: "An Ultimate Health, Mind & Soul Resolution",
    phone_primary: "7737773384",
    phone_support: "7597955294",
    address: "3-M-7, 2nd Floor, Near Vinay Stationers, Govt. Hospital Road, Bapunagar, Bhilwara, Rajasthan 311001",
    email: "info@yogamrityoga.com",
    insta: "@yogamritdarpan",
    about_image: "images/about_hero.jpg",
    about_image_align: "center",
    map_link: "https://maps.app.goo.gl/Po9V2UMN3C3fHnXMA",
    stat_medals: "15",
    stat_students: "2000",
    stat_years: "12",
    stat_competitors: "150",
    highlight_title_1: "National Yoga Gold Medalist",
    highlight_desc_1: "Our head coach Suresh Kumar secured the National Championship, demonstrating impeccable execution, technique, and posture mastery in competitive yoga sport.",
    highlight_title_2: "AIU Silver Medalist",
    highlight_desc_2: "Achieved top honors at the All India Inter-University (AIU) Championships, representing elite athletic coordination and competitive excellence on a national university platform."
  },
  coach: {
    name: "Suresh Kumar",
    title: "National Yoga Gold Medalist & AIU Silver Medalist",
    experience: "9+ Years",
    image: "images/coach_medal.jpg",
    image_align: "top", // Default to top so his face is perfectly visible
    quote: "True transformation begins when discipline becomes a habit. Yoga is not only about flexibility; it is about building strength, focus, confidence, and a powerful mindset for life.",
    achievements: [
      "National Gold Medalist",
      "AIU Silver Medalist (2024)",
      "Yoga Federation of India Competitor",
      "Khelo India Participant",
      "6-Time National Level Participant",
      "4 National Gold Medals",
      "1 National Silver Medal",
      "300+ Students Trained",
      "7+ Student Medal Winners"
    ]
  },
  timeline: [
    { id: 1, year: "2014", title: "Began Professional Yogic Training", desc: "Initiated intense traditional and athletic yoga practice, focusing on posture mechanics and deep structural flexibility." },
    { id: 2, year: "2021", title: "All India Inter-University (AIU) Silver Medalist", desc: "Secured the national Silver Medal at the prestigious AIU Championships, demonstrating elite athletic alignment and posture control." },
    { id: 3, year: "2024", title: "National Yoga Sports Gold Medalist", desc: "Achieved peak athletic honor by winning the Gold Medal at the National Yogasana Sports Championship." },
    { id: 4, year: "2026", title: "7th District Yogasana Championship Director", desc: "Hosted, trained, and led Yogamrit academy students to sweep medals at the District Yogasana Sports Championship in Bhilwara." }
  ],
  services: [
    { id: 1, title: "Personal Yoga Classes", icon: "fa-user-tie", desc: "One-on-one sessions customized entirely to your fitness goals, medical history, and availability." },
    { id: 2, title: "Group Yoga Classes", icon: "fa-users", desc: "Energetic and motivating group sessions focusing on flexibility, strength, and community wellness." },
    { id: 3, title: "Home Yoga Classes", icon: "fa-house-chimney", desc: "Experience customized professional fitness guidance in the safety and comfort of your private space." },
    { id: 4, title: "Competition Yoga Training", icon: "fa-trophy", desc: "Advanced posture mastery, stamina building, and artistic alignment routines for future champions." },
    { id: 5, title: "Kids Yoga", icon: "fa-child-reaching", desc: "Specialized batches targeting concentration, memory, growth, and structural spine alignments in children." },
    { id: 6, title: "Women's Wellness Yoga", icon: "fa-person-dress", desc: "Nurturing postures targeting pelvic floor strength, back pain relief, posture correction, and general energy." },
    { id: 7, title: "Weight Loss Programs", icon: "fa-weight-scale", desc: "High-intensity dynamic vinyasa flow paired with metabolism boosting poses and diet guidance." },
    { id: 8, title: "Flexibility Training", icon: "fa-person-running", desc: "Focusing on deep muscle stretching, joint unlocking, and maximizing passive athletic range safely." },
    { id: 9, title: "Meditation", icon: "fa-om", desc: "Scientific dhyana techniques, chakra visualization, and deep mental focus building practices." },
    { id: 10, title: "Pranayama", icon: "fa-wind", desc: "Deep scientific breathing sequences to enrich oxygen levels, cleanse lungs, and charge energy meridians." },
    { id: 11, title: "Stress Relief Programs", icon: "fa-spa", desc: "Calming restorative sequences, deep yoga nidra, and mindfulness to completely clear anxiety." },
    { id: 12, title: "Advanced Asana Training", icon: "fa-fire-flame-curved", desc: "Scorpion forearm stands, backbend dropbacks, leg-behind-head alignments for advanced master practitioners." }
  ],
  gallery: [
    { id: 1, src: "images/championship_2026.png", title: "7th District Championship", caption: "Coach Suresh Kumar with academy children representing Bhilwara", category: "kids" },
    { id: 2, src: "images/splits_pose.png", title: "Hamstring Splits (Hanumanasana)", caption: "Precise deep muscle stretch alignment", category: "training" },
    { id: 3, src: "images/bow_pose_three.png", title: "Standing Bow (Natarajasana)", caption: "Synchronized balance across skill levels", category: "competitions" },
    { id: 4, src: "images/forearm_stand.png", title: "Forearm Scorpion Balance", caption: "Advanced posture control demonstration", category: "competitions" },
    { id: 5, src: "images/bow_pose_two.png", title: "Synchronized King Dancer", caption: "Spine flexibility and balance training", category: "training" },
    { id: 6, src: "images/gallery_awards.jpg", title: "Trophy Room Showcase", caption: "Accolades, medals, and university trophies", category: "awards" }
  ],
  reviews: [
    { id: 1, name: "Rajesh Sharma", rating: 5, text: "Joining Yogamrit has radically solved my chronic back stiffness and posture alignment problems within just 3 months. The athletic insight of a national gold medalist is completely visible in how every muscle stretch is taught. Truly world-class training in Bhilwara!", avatar: "images/avatar1.jpg", approved: true },
    { id: 2, name: "Meenakshi Soni", rating: 5, text: "We admitted our 9-year-old child to the competitive batch. The physical strength and mental concentration she developed is phenomenal. She won her first district-level medal last month under Yogamrit's guidance. The coaches understand children's physics beautifully.", avatar: "images/avatar2.jpg", approved: true },
    { id: 3, name: "Kriti Vyas", rating: 5, text: "Their targeted weight loss and hormonal therapy programs are highly scientific. The pranayama and dynamic sequences helped me shed 14 kgs and resolve severe digestive issues. Their glassmorphic studio atmosphere adds to the premium feel.", avatar: "images/avatar3.jpg", approved: true }
  ],
  gallery_categories: [
    { id: "training", name: "Training Batches" },
    { id: "kids", name: "Kids Classes" },
    { id: "competitions", name: "Competitions" },
    { id: "awards", name: "Awards & Medals" }
  ],
  youtube_videos: [
    { id: 1, video_id: "c8hjhRqItyk", title: "Yoga for Flexibility & Stretching Flow", desc: "A premium session focusing on deep joint releases, flexibility, and muscle recovery alignments." },
    { id: 2, video_id: "v7AYKMP6rOE", title: "Power Vinyasa Core Flow", desc: "Advanced metabolic strength building poses and core control flows under direct coaching." },
    { id: 3, video_id: "Eml2xnoLpYE", title: "10 Min Daily Mind & Body Reset", desc: "Clean, quick restorative breathing alignments and sun salutations for dynamic active energy." }
  ]
};

// Initialize LocalStorage Database if not present
function initLocalStorageDB() {
  if (!localStorage.getItem("yogamrit_db")) {
    localStorage.setItem("yogamrit_db", JSON.stringify(DEFAULT_DATABASE));
    console.log("Initialized Yogamrit local database successfully!");
  } else {
    // Graceful migrations for existing databases
    let db = null;
    try {
      db = JSON.parse(localStorage.getItem("yogamrit_db"));
    } catch (e) {
      console.error("Error parsing local database during init:", e);
    }
    
    let dirty = false;
    if (!db || typeof db !== "object") {
      db = JSON.parse(JSON.stringify(DEFAULT_DATABASE));
      dirty = true;
    }
    
    // 1. Check top-level keys
    for (const key in DEFAULT_DATABASE) {
      if (db[key] === undefined || db[key] === null) {
        db[key] = JSON.parse(JSON.stringify(DEFAULT_DATABASE[key]));
        dirty = true;
        console.log(`Migrated missing table "${key}" from defaults!`);
      }
    }
    
    // 2. Specific sub-fields in homepage
    if (db.homepage) {
      for (const subKey in DEFAULT_DATABASE.homepage) {
        if (db.homepage[subKey] === undefined || db.homepage[subKey] === null) {
          db.homepage[subKey] = DEFAULT_DATABASE.homepage[subKey];
          dirty = true;
          console.log(`Migrated homepage field "${subKey}" from defaults!`);
        }
      }
      // Force map URL alignment to the new Google sharing link
      if (db.homepage.map_link !== "https://maps.app.goo.gl/Po9V2UMN3C3fHnXMA") {
        db.homepage.map_link = "https://maps.app.goo.gl/Po9V2UMN3C3fHnXMA";
        dirty = true;
        console.log("Forced map link update to https://maps.app.goo.gl/Po9V2UMN3C3fHnXMA!");
      }
    }
    
    // 3. Specific sub-fields in coach
    if (db.coach) {
      for (const subKey in DEFAULT_DATABASE.coach) {
        if (db.coach[subKey] === undefined || db.coach[subKey] === null) {
          db.coach[subKey] = JSON.parse(JSON.stringify(DEFAULT_DATABASE.coach[subKey]));
          dirty = true;
          console.log(`Migrated coach field "${subKey}" from defaults!`);
        }
      }
    }
    


    if (dirty) {
      localStorage.setItem("yogamrit_db", JSON.stringify(db));
      console.log("Completed self-healing Yogamrit local storage migrations!");
    }
  }
}
initLocalStorageDB();

// Read current database from LocalStorage with safe fallbacks
function getLocalDB() {
  const dbStr = localStorage.getItem("yogamrit_db");
  if (!dbStr) {
    localStorage.setItem("yogamrit_db", JSON.stringify(DEFAULT_DATABASE));
    return DEFAULT_DATABASE;
  }
  try {
    return JSON.parse(dbStr) || DEFAULT_DATABASE;
  } catch (e) {
    console.error("Error parsing local database:", e);
    localStorage.setItem("yogamrit_db", JSON.stringify(DEFAULT_DATABASE));
    return DEFAULT_DATABASE;
  }
}

// Write database to LocalStorage
function saveLocalDB(db) {
  localStorage.setItem("yogamrit_db", JSON.stringify(db));
}

// =========================================
// ABSTRACT DATABASE ACCESS SERVICE API
// =========================================
const dbService = {
  
  // A. HOMEPAGE CONTENT
  async getHomepage() {
    if (USE_SUPABASE) {
      const { data, error } = await supabase.from('homepage').select('*').single();
      if (!error) return data;
    }
    return getLocalDB().homepage;
  },

  async updateHomepage(data) {
    if (USE_SUPABASE) {
      await supabase.from('homepage').update(data).eq('id', 1);
    }
    const db = getLocalDB();
    db.homepage = { ...db.homepage, ...data };
    saveLocalDB(db);
    return true;
  },

  // B. COACH SHOWCASE DETAILS
  async getCoach() {
    if (USE_SUPABASE) {
      const { data, error } = await supabase.from('coach').select('*').single();
      if (!error) return data;
    }
    return getLocalDB().coach;
  },

  async updateCoach(data) {
    if (USE_SUPABASE) {
      await supabase.from('coach').update(data).eq('id', 1);
    }
    const db = getLocalDB();
    db.coach = { ...db.coach, ...data };
    saveLocalDB(db);
    return true;
  },

  // C. TIMELINE
  async getTimeline() {
    if (USE_SUPABASE) {
      const { data, error } = await supabase.from('timeline').select('*').order('year', { ascending: true });
      if (!error) return data;
    }
    return getLocalDB().timeline;
  },

  async addTimelineItem(year, title, desc) {
    const db = getLocalDB();
    const newItem = {
      id: Date.now(),
      year,
      title,
      desc
    };
    db.timeline.push(newItem);
    db.timeline.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    saveLocalDB(db);
    return newItem;
  },

  async updateTimelineItem(id, year, title, desc) {
    const db = getLocalDB();
    db.timeline = db.timeline.map(item => {
      if (item.id === parseInt(id)) {
        return { ...item, year, title, desc };
      }
      return item;
    });
    db.timeline.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    saveLocalDB(db);
    return true;
  },

  async deleteTimelineItem(id) {
    const db = getLocalDB();
    db.timeline = db.timeline.filter(item => item.id !== parseInt(id));
    saveLocalDB(db);
    return true;
  },

  // D. SERVICES
  async getServices() {
    if (USE_SUPABASE) {
      const { data, error } = await supabase.from('services').select('*').order('id', { ascending: true });
      if (!error) return data;
    }
    return getLocalDB().services;
  },

  async updateService(id, title, desc) {
    const db = getLocalDB();
    db.services = db.services.map(s => {
      if (s.id === parseInt(id)) {
        return { ...s, title, desc };
      }
      return s;
    });
    saveLocalDB(db);
    return true;
  },

  // E. REVIEWS / TESTIMONIAL MODERATION
  async getReviews(includePending = false) {
    if (USE_SUPABASE) {
      let query = supabase.from('reviews').select('*');
      if (!includePending) {
        query = query.eq('approved', true);
      }
      const { data, error } = await query;
      if (!error) return data;
    }
    const allReviews = getLocalDB().reviews;
    if (includePending) return allReviews;
    return allReviews.filter(r => r.approved === true);
  },

  async addReview(name, rating, text, avatar = "images/avatar1.jpg") {
    if (USE_SUPABASE) {
      const { data, error } = await supabase.from('reviews').insert([
        { name, rating: parseInt(rating), text, avatar, approved: false }
      ]);
      return data;
    }
    const db = getLocalDB();
    const newReview = {
      id: Date.now(),
      name,
      rating: parseInt(rating),
      text,
      avatar,
      approved: false
    };
    db.reviews.push(newReview);
    saveLocalDB(db);
    return newReview;
  },

  async approveReview(id) {
    if (USE_SUPABASE) {
      await supabase.from('reviews').update({ approved: true }).eq('id', id);
    }
    const db = getLocalDB();
    db.reviews = db.reviews.map(r => {
      if (r.id === parseInt(id)) {
        return { ...r, approved: true };
      }
      return r;
    });
    saveLocalDB(db);
    return true;
  },

  async rejectReview(id) {
    return this.deleteReview(id);
  },

  async deleteReview(id) {
    if (USE_SUPABASE) {
      await supabase.from('reviews').delete().eq('id', id);
    }
    const db = getLocalDB();
    db.reviews = db.reviews.filter(r => r.id !== parseInt(id));
    saveLocalDB(db);
    return true;
  },

  // F. GALLERY MEDIA
  async getGallery() {
    if (USE_SUPABASE) {
      const { data, error } = await supabase.from('gallery').select('*').order('id', { ascending: true });
      if (!error) return data;
    }
    return getLocalDB().gallery;
  },

  async addGalleryItem(src, title, caption, category) {
    if (USE_SUPABASE) {
      const { data, error } = await supabase.from('gallery').insert([
        { src, title, caption, category }
      ]);
      return data;
    }
    const db = getLocalDB();
    const newItem = {
      id: Date.now(),
      src,
      title,
      caption,
      category
    };
    db.gallery.push(newItem);
    saveLocalDB(db);
    return newItem;
  },

  async updateGalleryItem(id, title, caption, category, src = null) {
    const db = getLocalDB();
    db.gallery = db.gallery.map(item => {
      if (item.id === parseInt(id)) {
        const updated = { ...item, title, caption, category };
        if (src) updated.src = src;
        return updated;
      }
      return item;
    });
    saveLocalDB(db);
    return true;
  },

  async deleteGalleryItem(id) {
    if (USE_SUPABASE) {
      await supabase.from('gallery').delete().eq('id', id);
    }
    const db = getLocalDB();
    db.gallery = db.gallery.filter(item => item.id !== parseInt(id));
    saveLocalDB(db);
    return true;
  },

  // G. SECURITY CREDENTIALS
  async getAdminCreds() {
    const db = getLocalDB();
    return db.admin_creds || { username: "admin", password: "yogamrit@2026" };
  },

  async updateAdminCreds(username, password) {
    const db = getLocalDB();
    db.admin_creds = { username, password };
    saveLocalDB(db);
    return true;
  },

  // H. GALLERY CATEGORIES
  async getGalleryCategories() {
    const db = getLocalDB();
    return db.gallery_categories || DEFAULT_DATABASE.gallery_categories;
  },

  async addGalleryCategory(name) {
    const db = getLocalDB();
    if (!db.gallery_categories) {
      db.gallery_categories = [
        { id: "training", name: "Training Batches" },
        { id: "kids", name: "Kids Classes" },
        { id: "competitions", name: "Competitions" },
        { id: "awards", name: "Awards & Medals" }
      ];
    }
    // Generate unique safe ID
    const id = name.toLowerCase().trim().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    
    // Check if ID already exists to avoid duplicates
    if (db.gallery_categories.find(c => c.id === id)) {
      return false;
    }
    
    const newCategory = { id, name };
    db.gallery_categories.push(newCategory);
    saveLocalDB(db);
    return newCategory;
  },

  // I. YOUTUBE VIDEO SHOWCASE
  async getYoutubeVideos() {
    return getLocalDB().youtube_videos || [];
  },

  async addYoutubeVideo(video_id, title, desc) {
    const db = getLocalDB();
    const newItem = {
      id: Date.now(),
      video_id,
      title,
      desc
    };
    db.youtube_videos = db.youtube_videos || [];
    db.youtube_videos.push(newItem);
    saveLocalDB(db);
    return newItem;
  },

  async updateYoutubeVideo(id, video_id, title, desc) {
    const db = getLocalDB();
    db.youtube_videos = db.youtube_videos || [];
    db.youtube_videos = db.youtube_videos.map(v => {
      if (v.id === parseInt(id)) {
        return { ...v, video_id, title, desc };
      }
      return v;
    });
    saveLocalDB(db);
    return true;
  },

  async deleteYoutubeVideo(id) {
    const db = getLocalDB();
    db.youtube_videos = db.youtube_videos || [];
    db.youtube_videos = db.youtube_videos.filter(v => v.id !== parseInt(id));
    saveLocalDB(db);
    return true;
  }
};

// Export to window so other scripts (app.js, admin.html) can access it
window.dbService = dbService;
