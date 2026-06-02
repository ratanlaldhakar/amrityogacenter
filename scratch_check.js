
    // =========================================
    // ADMIN DASHBOARD LOGIC ENGINE
    // =========================================
    
    // Auth gate check
    document.addEventListener("DOMContentLoaded", () => {
      if (sessionStorage.getItem("admin_authenticated") === "true") {
        showWorkspace();
      }
    });
    
    // Login button trigger
    document.getElementById("login-btn").addEventListener("click", async () => {
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;
      
      const creds = await dbService.getAdminCreds();
      
      // Verification Gate
      if (user === creds.username && pass === creds.password) {
        sessionStorage.setItem("admin_authenticated", "true");
        showWorkspace();
      } else {
        const err = document.getElementById("login-error");
        err.style.display = "block";
        setTimeout(() => { err.style.opacity = 1; }, 50);
      }
    });
    
    // Logout trigger
    document.getElementById("logout-btn").addEventListener("click", () => {
      sessionStorage.removeItem("admin_authenticated");
      location.reload();
    });
    
    function showWorkspace() {
      document.getElementById("auth-gate").style.display = "none";
      const workspace = document.getElementById("admin-workspace");
      workspace.style.display = "block";
      initTabs();
      loadHomepageForm();
      loadCoachForm();
      loadServicesDropdown();
      loadGalleryCategories(); // Dynamically load categories
      loadGalleryList();
      loadVideosList();
      loadReviewsQueue();
    }
    
    // Dynamically load gallery categories into select option list
    async function loadGalleryCategories() {
      const select = document.getElementById("select-gal-cat");
      if (!select) return;
      select.innerHTML = "";
      
      const categories = await dbService.getGalleryCategories();
      categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat.id;
        opt.textContent = cat.name;
        select.appendChild(opt);
      });
    }

    // Smooth custom Toast alert with support for error states
    function showToast(message = "Configuration saved successfully!", type = "success") {
      const toast = document.getElementById("success-toast");
      if (type === "error") {
        toast.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="margin-right: 8px; color: #ff4757;"></i> ${message}`;
        toast.style.borderColor = "#ff4757";
        toast.style.boxShadow = "0 5px 20px rgba(255, 71, 87, 0.15)";
      } else {
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="margin-right: 8px; color: #25d366;"></i> ${message}`;
        toast.style.borderColor = "#25d366";
        toast.style.boxShadow = "0 5px 20px rgba(37, 211, 102, 0.15)";
      }
      toast.style.display = "block";
      setTimeout(() => {
        toast.style.display = "none";
      }, 3500);
    }
    
    // Dashboard sidebar tab panels toggling
    function initTabs() {
      const sidebarButtons = document.querySelectorAll(".sidebar-btn");
      const panels = document.querySelectorAll(".admin-panel");
      
      sidebarButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          sidebarButtons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          
          const target = btn.getAttribute("data-target");
          panels.forEach(p => {
            if (p.id === target) {
              p.classList.add("active");
            } else {
              p.classList.remove("active");
            }
          });
        });
      });
    }
    
      // --- 1. HOMEPAGE SETTINGS FORM ---
    async function loadHomepageForm() {
      const info = await dbService.getHomepage();
      document.getElementById("input-tagline").value = info.tagline;
      document.getElementById("input-phone").value = info.phone_primary;
      document.getElementById("input-support").value = info.phone_support;
      document.getElementById("input-address").value = info.address;
      document.getElementById("input-email").value = info.email;
      document.getElementById("select-about-align").value = info.about_image_align || "center";
      
      // Load Achievements statistics & highlights
      document.getElementById("input-stat-medals").value = info.stat_medals || "15";
      document.getElementById("input-stat-students").value = info.stat_students || "2000";
      document.getElementById("input-stat-years").value = info.stat_years || "12";
      document.getElementById("input-stat-competitors").value = info.stat_competitors || "150";
      
      document.getElementById("input-highlight-title-1").value = info.highlight_title_1 || "";
      document.getElementById("input-highlight-desc-1").value = info.highlight_desc_1 || "";
      document.getElementById("input-highlight-title-2").value = info.highlight_title_2 || "";
      document.getElementById("input-highlight-desc-2").value = info.highlight_desc_2 || "";
      
      // Load dynamic credentials
      const creds = await dbService.getAdminCreds();
      document.getElementById("input-admin-username").value = creds.username;
      document.getElementById("input-admin-password").value = creds.password;
    }
    
    document.getElementById("form-homepage").addEventListener("submit", async (e) => {
      e.preventDefault();
      const tagline = document.getElementById("input-tagline").value;
      const phone_primary = document.getElementById("input-phone").value;
      const phone_support = document.getElementById("input-support").value;
      const address = document.getElementById("input-address").value;
      const email = document.getElementById("input-email").value;
      const about_image_align = document.getElementById("select-about-align").value;
      
      const stat_medals = document.getElementById("input-stat-medals").value;
      const stat_students = document.getElementById("input-stat-students").value;
      const stat_years = document.getElementById("input-stat-years").value;
      const stat_competitors = document.getElementById("input-stat-competitors").value;
      
      const highlight_title_1 = document.getElementById("input-highlight-title-1").value;
      const highlight_desc_1 = document.getElementById("input-highlight-desc-1").value;
      const highlight_title_2 = document.getElementById("input-highlight-title-2").value;
      const highlight_desc_2 = document.getElementById("input-highlight-desc-2").value;
      
      const fileInput = document.getElementById("input-about-file");
      const file = fileInput.files[0];
      
      const updateData = { 
        tagline, 
        phone_primary, 
        phone_support, 
        address, 
        email, 
        about_image_align,
        stat_medals,
        stat_students,
        stat_years,
        stat_competitors,
        highlight_title_1,
        highlight_desc_1,
        highlight_title_2,
        highlight_desc_2
      };
      
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          updateData.about_image = reader.result;
          await dbService.updateHomepage(updateData);
          showToast("Homepage configurations and photo updated!");
          fileInput.value = "";
        };
        reader.readAsDataURL(file);
      } else {
        await dbService.updateHomepage(updateData);
        showToast("Homepage configurations updated!");
      }
    });

    document.getElementById("form-admin-creds").addEventListener("submit", async (e) => {
      e.preventDefault();
      const user = document.getElementById("input-admin-username").value;
      const pass = document.getElementById("input-admin-password").value;
      
      await dbService.updateAdminCreds(user, pass);
      showToast("Security credentials updated! Please use these next time you log in.");
    });
    
    // --- 2. COACH PROFILE FORM ---
    async function loadCoachForm() {
      const coach = await dbService.getCoach();
      document.getElementById("input-coach-name").value = coach.name;
      document.getElementById("input-coach-title").value = coach.title;
      document.getElementById("input-coach-exp").value = coach.experience;
      document.getElementById("input-coach-quote").value = coach.quote;
      document.getElementById("select-coach-align").value = coach.image_align || "top";
      
      // Load milestones timeline
      loadTimelineList();
    }
    
    async function loadTimelineList() {
      const listContainer = document.getElementById("timeline-list");
      listContainer.innerHTML = "";
      
      const timeline = await dbService.getTimeline();
      timeline.forEach(item => {
        const el = document.createElement("div");
        el.className = "dashboard-item";
        const titleSafe = (item.title || "").replace(/"/g, "&quot;");
        const descSafe = (item.desc || "").replace(/"/g, "&quot;");
        el.innerHTML = `
          <div class="item-info">
            <h5>${item.year} - ${item.title || ""}</h5>
            <p>${item.desc || ""}</p>
          </div>
          <div class="item-actions">
            <button class="btn-action btn-approve edit-time-btn" data-id="${item.id}" data-year="${item.year}" data-title="${titleSafe}" data-desc="${descSafe}"><i class="fa-solid fa-pen"></i> Edit</button>
            <button class="btn-action btn-reject delete-time-btn" data-id="${item.id}"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        `;
        listContainer.appendChild(el);
      });
      
      // Bind delete triggers
      document.querySelectorAll(".delete-time-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.getAttribute("data-id");
          await dbService.deleteTimelineItem(id);
          showToast("Milestone timeline deleted!");
          resetTimelineForm();
          loadTimelineList();
        });
      });

      // Bind edit triggers
      document.querySelectorAll(".edit-time-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          const year = btn.getAttribute("data-year");
          const title = btn.getAttribute("data-title");
          const desc = btn.getAttribute("data-desc");
          
          document.getElementById("input-time-id").value = id;
          document.getElementById("input-time-year").value = year;
          document.getElementById("input-time-title").value = title;
          document.getElementById("input-time-desc").value = desc;
          
          const submitBtn = document.getElementById("time-submit-btn");
          submitBtn.innerHTML = `<i class="fa-solid fa-save"></i> Update`;
          document.getElementById("time-cancel-btn").style.display = "inline-block";
          
          document.getElementById("form-timeline").scrollIntoView({ behavior: 'smooth' });
        });
      });
    }
    
    // Add/Update timeline milestone
    document.getElementById("form-timeline").addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("input-time-id").value;
      const year = document.getElementById("input-time-year").value;
      const title = document.getElementById("input-time-title").value;
      const desc = document.getElementById("input-time-desc").value;
      
      if (!year || !title || !desc) return;
      
      if (id) {
        await dbService.updateTimelineItem(id, year, title, desc);
        showToast("Milestone timeline successfully updated!");
      } else {
        await dbService.addTimelineItem(year, title, desc);
        showToast("Milestone timeline successfully added!");
      }
      
      resetTimelineForm();
      loadTimelineList();
    });

    function resetTimelineForm() {
      document.getElementById("input-time-id").value = "";
      document.getElementById("input-time-year").value = "";
      document.getElementById("input-time-title").value = "";
      document.getElementById("input-time-desc").value = "";
      
      const submitBtn = document.getElementById("time-submit-btn");
      submitBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add`;
      document.getElementById("time-cancel-btn").style.display = "none";
    }

    document.getElementById("time-cancel-btn").addEventListener("click", resetTimelineForm);
    
    document.getElementById("form-coach").addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("input-coach-name").value;
      const title = document.getElementById("input-coach-title").value;
      const experience = document.getElementById("input-coach-exp").value;
      const quote = document.getElementById("input-coach-quote").value;
      const image_align = document.getElementById("select-coach-align").value;
      
      const fileInput = document.getElementById("input-coach-file");
      const file = fileInput.files[0];
      
      const updateData = { name, title, experience, quote, image_align };
      
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          updateData.image = reader.result;
          await dbService.updateCoach(updateData);
          showToast("Coach profile and biography photo updated!");
          fileInput.value = "";
        };
        reader.readAsDataURL(file);
      } else {
        await dbService.updateCoach(updateData);
        showToast("Coach profile updated!");
      }
    });
    
    // --- 3. SERVICES CARD FORM ---
    async function loadServicesDropdown() {
      const select = document.getElementById("select-service");
      select.innerHTML = '<option value="">-- Choose Card to Edit --</option>';
      
      const services = await dbService.getServices();
      services.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s.id;
        opt.textContent = `${s.id}. ${s.title}`;
        select.appendChild(opt);
      });
    }
    
    // Handle dropdown selection
    document.getElementById("select-service").addEventListener("change", async (e) => {
      const id = e.target.value;
      const form = document.getElementById("form-service");
      
      if (!id) {
        form.style.display = "none";
        return;
      }
      
      const services = await dbService.getServices();
      const selected = services.find(s => s.id === parseInt(id));
      
      if (selected) {
        document.getElementById("input-service-title").value = selected.title;
        document.getElementById("input-service-desc").value = selected.desc;
        form.style.display = "block";
      }
    });
    
    document.getElementById("form-service").addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("select-service").value;
      const title = document.getElementById("input-service-title").value;
      const desc = document.getElementById("input-service-desc").value;
      
      await dbService.updateService(id, title, desc);
      showToast("Service program updated successfully!");
      loadServicesDropdown();
      document.getElementById("form-service").style.display = "none";
    });
    
    // --- 4. GALLERY MANAGER ---
    async function loadGalleryList() {
      const listContainer = document.getElementById("gallery-list");
      listContainer.innerHTML = "";
      
      const gallery = await dbService.getGallery();
      gallery.forEach(item => {
        const el = document.createElement("div");
        el.className = "dashboard-item";
        const titleSafe = (item.title || "").replace(/"/g, "&quot;");
        const captionSafe = (item.caption || "").replace(/"/g, "&quot;");
        el.innerHTML = `
          <div style="display: flex; align-items: center; gap: 20px;">
            <img src="${item.src}" class="img-preview" alt="Preview">
            <div class="item-info">
              <h5>${item.title || ""}</h5>
              <p>Category: <strong>${item.category || ""}</strong> - ${item.caption || ""}</p>
            </div>
          </div>
          <div class="item-actions">
            <button class="btn-action btn-approve edit-gal-btn" data-id="${item.id}" data-title="${titleSafe}" data-caption="${captionSafe}" data-category="${item.category}"><i class="fa-solid fa-pen"></i> Edit</button>
            <button class="btn-action btn-reject delete-gal-btn" data-id="${item.id}"><i class="fa-solid fa-trash"></i> Remove</button>
          </div>
        `;
        listContainer.appendChild(el);
      });
      
      document.querySelectorAll(".delete-gal-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.getAttribute("data-id");
          await dbService.deleteGalleryItem(id);
          showToast("Photo card removed from gallery!");
          resetGalleryForm();
          loadGalleryList();
        });
      });

      // Bind edit triggers
      document.querySelectorAll(".edit-gal-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          const title = btn.getAttribute("data-title");
          const caption = btn.getAttribute("data-caption");
          const category = btn.getAttribute("data-category");
          
          document.getElementById("input-gal-id").value = id;
          document.getElementById("input-gal-title").value = title;
          document.getElementById("input-gal-caption").value = caption;
          document.getElementById("select-gal-cat").value = category;
          
          document.getElementById("gal-form-title").textContent = "Edit Existing Photo Card";
          
          // Make file optional
          const fileInput = document.getElementById("input-gal-file");
          fileInput.required = false;
          fileInput.previousElementSibling.textContent = "Upload New Image File (Optional - leave blank to keep current image)";
          
          const submitBtn = document.querySelector("#form-gallery button[type='submit']");
          submitBtn.innerHTML = `<i class="fa-solid fa-save"></i> Update Photo Card`;
          document.getElementById("gal-cancel-btn").style.display = "inline-block";
          
          document.getElementById("form-gallery").scrollIntoView({ behavior: 'smooth' });
        });
      });
    }
    
    // Upload or Update photo card
    document.getElementById("form-gallery").addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("input-gal-id").value;
      const title = document.getElementById("input-gal-title").value;
      const caption = document.getElementById("input-gal-caption").value;
      const category = document.getElementById("select-gal-cat").value;
      const fileInput = document.getElementById("input-gal-file");
      
      const file = fileInput.files[0];
      
      if (id) {
        // Edit Mode Flow
        if (file) {
          const reader = new FileReader();
          reader.onload = async () => {
            await dbService.updateGalleryItem(id, title, caption, category, reader.result);
            showToast("Gallery card successfully updated!");
            resetGalleryForm();
            loadGalleryList();
          };
          reader.readAsDataURL(file);
        } else {
          await dbService.updateGalleryItem(id, title, caption, category);
          showToast("Gallery card successfully updated!");
          resetGalleryForm();
          loadGalleryList();
        }
      } else {
        // Add Mode Flow
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async () => {
          await dbService.addGalleryItem(reader.result, title, caption, category);
          showToast("Dynamic photo card published!");
          resetGalleryForm();
          loadGalleryList();
        };
        reader.readAsDataURL(file);
      }
    });

    function resetGalleryForm() {
      document.getElementById("input-gal-id").value = "";
      document.getElementById("input-gal-title").value = "";
      document.getElementById("input-gal-caption").value = "";
      document.getElementById("gal-form-title").textContent = "Add New Photo Card";
      
      const fileInput = document.getElementById("input-gal-file");
      fileInput.value = "";
      fileInput.required = true;
      fileInput.previousElementSibling.textContent = "Upload Image File (Base64)";
      
      const submitBtn = document.querySelector("#form-gallery button[type='submit']");
      submitBtn.innerHTML = `<i class="fa-solid fa-cloud-arrow-up" style="margin-right: 8px;"></i> Upload & Publish Photo`;
      document.getElementById("gal-cancel-btn").style.display = "none";
    }

    document.getElementById("gal-cancel-btn").addEventListener("click", resetGalleryForm);

    // Create dynamic custom category form submit handler
    document.getElementById("form-category").addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("input-cat-name");
      const name = nameInput.value.trim();
      if (!name) return;
      
      const result = await dbService.addGalleryCategory(name);
      if (result) {
        showToast(`Category "${name}" created successfully!`);
        nameInput.value = "";
        await loadGalleryCategories(); // refresh dynamic select options list
      } else {
        showToast("Category name already exists!", "error");
      }
    });
    
    // --- 5. REVIEWS MODERATION PANEL ---
    async function loadReviewsQueue() {
      const pendingList = document.getElementById("pending-reviews-list");
      const approvedList = document.getElementById("approved-reviews-list");
      const pendingBadge = document.getElementById("pending-badge");
      
      pendingList.innerHTML = "";
      approvedList.innerHTML = "";
      
      const allReviews = await dbService.getReviews(true);
      
      const pending = allReviews.filter(r => !r.approved);
      const approved = allReviews.filter(r => r.approved);
      
      // Update badge count
      if (pending.length > 0) {
        pendingBadge.textContent = pending.length;
        pendingBadge.style.display = "inline-block";
      } else {
        pendingBadge.style.display = "none";
      }
      
      // Populate pending
      if (!pending.length) {
        pendingList.innerHTML = '<p style="color:var(--color-text-secondary); font-style:italic;">No pending reviews awaiting moderation.</p>';
      } else {
        pending.forEach(r => {
          const stars = '<i class="fa-solid fa-star"></i>'.repeat(r.rating) + '<i class="fa-regular fa-star"></i>'.repeat(5 - r.rating);
          const el = document.createElement("div");
          el.className = "dashboard-item";
          el.innerHTML = `
            <div class="item-info" style="max-width: 70%;">
              <h5>${r.name} - <span style="color:var(--color-gold);">${stars}</span></h5>
              <p style="font-style: italic; margin-top:5px;">"${r.text}"</p>
            </div>
            <div class="item-actions">
              <button class="btn-action btn-approve approve-review-btn" data-id="${r.id}"><i class="fa-solid fa-check"></i> Approve</button>
              <button class="btn-action btn-reject reject-review-btn" data-id="${r.id}"><i class="fa-solid fa-xmark"></i> Reject</button>
            </div>
          `;
          pendingList.appendChild(el);
        });
      }
      
      // Populate approved
      approved.forEach(r => {
        const stars = '<i class="fa-solid fa-star"></i>'.repeat(r.rating) + '<i class="fa-regular fa-star"></i>'.repeat(5 - r.rating);
        const el = document.createElement("div");
        el.className = "dashboard-item";
        el.innerHTML = `
          <div class="item-info" style="max-width: 75%;">
            <h5>${r.name} - <span style="color:var(--color-gold);">${stars}</span></h5>
            <p style="font-style: italic; margin-top:5px;">"${r.text}"</p>
          </div>
          <div class="item-actions">
            <button class="btn-action btn-reject delete-review-btn" data-id="${r.id}"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        `;
        approvedList.appendChild(el);
      });
      
      // Bind Moderation actions
      document.querySelectorAll(".approve-review-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.getAttribute("data-id");
          await dbService.approveReview(id);
          showToast("Review approved and published live!");
          loadReviewsQueue();
        });
      });
      
      document.querySelectorAll(".reject-review-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.getAttribute("data-id");
          await dbService.rejectReview(id);
          showToast("Review rejected and deleted!");
          loadReviewsQueue();
        });
      });
      
      document.querySelectorAll(".delete-review-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.getAttribute("data-id");
          await dbService.deleteReview(id);
          showToast("Review deleted from live database!");
          loadReviewsQueue();
        });
      });
    }

    // --- 6. YOUTUBE VIDEOS EDITOR ---
    async function loadVideosList() {
      const listContainer = document.getElementById("videos-list");
      if (!listContainer) return;
      listContainer.innerHTML = "";
      
      const videos = await dbService.getYoutubeVideos();
      if (!videos.length) {
        listContainer.innerHTML = `
          <div style="text-align: center; color: var(--color-text-secondary); padding: 30px; grid-column: 1 / -1;">
            <p>No YouTube videos published yet. Use the form above to add a video.</p>
          </div>
        `;
        return;
      }
      
      videos.forEach(v => {
        const el = document.createElement("div");
        el.className = "dashboard-item";
        const titleSafe = (v.title || "").replace(/"/g, "&quot;");
        const descSafe = (v.desc || "").replace(/"/g, "&quot;");
        el.innerHTML = `
          <div style="display: flex; align-items: center; gap: 20px;">
            <div style="position: relative; width: 120px; height: 68px; border-radius: var(--radius-sm); overflow: hidden; background: #000; border: 1px solid rgba(255,255,255,0.08); flex-shrink: 0;">
              <img src="https://img.youtube.com/vi/${v.video_id}/0.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Thumbnail">
              <i class="fa-solid fa-play" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: red; font-size: 1.2rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));"></i>
            </div>
            <div class="item-info">
              <h5>${v.title || ""}</h5>
              <p style="margin-top: 5px;">ID: <strong style="color: var(--color-saffron);">${v.video_id || ""}</strong> - ${v.desc || ""}</p>
            </div>
          </div>
          <div class="item-actions">
            <button class="btn-action btn-approve edit-vid-btn" data-id="${v.id}" data-videoid="${v.video_id}" data-title="${titleSafe}" data-desc="${descSafe}"><i class="fa-solid fa-pen"></i> Edit</button>
            <button class="btn-action btn-reject delete-vid-btn" data-id="${v.id}"><i class="fa-solid fa-trash"></i> Remove</button>
          </div>
        `;
        listContainer.appendChild(el);
      });
      
      // Bind delete triggers
      document.querySelectorAll(".delete-vid-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.getAttribute("data-id");
          await dbService.deleteYoutubeVideo(id);
          showToast("YouTube video removed from showcase!");
          resetVideoForm();
          loadVideosList();
        });
      });
      
      // Bind edit triggers
      document.querySelectorAll(".edit-vid-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          const video_id = btn.getAttribute("data-videoid");
          const title = btn.getAttribute("data-title");
          const desc = btn.getAttribute("data-desc");
          
          document.getElementById("input-vid-id").value = id;
          document.getElementById("input-vid-title").value = title;
          document.getElementById("input-vid-code").value = video_id;
          document.getElementById("input-vid-desc").value = desc;
          
          document.getElementById("vid-form-title").textContent = "Edit Existing YouTube Video";
          
          const submitBtn = document.getElementById("vid-submit-btn");
          submitBtn.innerHTML = `<i class="fa-solid fa-save"></i> Update YouTube Video`;
          document.getElementById("vid-cancel-btn").style.display = "inline-block";
          
          document.getElementById("form-videos").scrollIntoView({ behavior: 'smooth' });
        });
      });
    }
    
    function resetVideoForm() {
      document.getElementById("input-vid-id").value = "";
      document.getElementById("input-vid-title").value = "";
      document.getElementById("input-vid-code").value = "";
      document.getElementById("input-vid-desc").value = "";
      
      document.getElementById("vid-form-title").textContent = "Add New YouTube Video";
      
      const submitBtn = document.getElementById("vid-submit-btn");
      submitBtn.innerHTML = `<i class="fa-solid fa-cloud-arrow-up" style="margin-right: 8px;"></i> Publish YouTube Video`;
      document.getElementById("vid-cancel-btn").style.display = "none";
    }
    
    function extractYoutubeId(input) {
      if (!input) return "";
      const trimmed = input.trim();
      
      // 1. Check for YouTube Shorts format
      if (trimmed.includes("/shorts/")) {
        const parts = trimmed.split("/shorts/");
        if (parts.length > 1) {
          return parts[1].split(/[?#&]/)[0].substring(0, 11);
        }
      }
      
      // 2. Check for standard YouTube URL structures
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = trimmed.match(regExp);
      
      if (match && match[2].length === 11) {
        return match[2];
      }
      
      // 3. Safe fallback for raw IDs or truncated entries
      return trimmed.substring(0, 11);
    }
    
    document.getElementById("vid-cancel-btn").addEventListener("click", resetVideoForm);
    
    document.getElementById("form-videos").addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("input-vid-id").value;
      const title = document.getElementById("input-vid-title").value;
      const rawCode = document.getElementById("input-vid-code").value;
      const desc = document.getElementById("input-vid-desc").value;
      
      const video_id = extractYoutubeId(rawCode);
      
      if (video_id.length !== 11) {
        showToast("Invalid YouTube Video ID. Please enter an 11-character code or full YouTube URL.", "error");
        return;
      }
      
      if (id) {
        await dbService.updateYoutubeVideo(id, video_id, title, desc);
        showToast("YouTube video configuration updated successfully!");
      } else {
        await dbService.addYoutubeVideo(video_id, title, desc);
        showToast("New YouTube video published successfully!");
      }
      
      resetVideoForm();
      loadVideosList();
    });
  