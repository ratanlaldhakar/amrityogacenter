# 🧘‍♂️ Amrit Yoga Center (अमृत योग केंद्र)

> **High-Performance 3D Web Application & Enterprise SEO Platform**  
> Built with **Vite 4**, **Vanilla JS**, **Custom Glassmorphism CSS**, **Three.js (3D Graphics)**, **EmailJS Integration**, and **Supabase (PostgreSQL Database)**.

---

## 🌟 Key Features

- 🧘 **3D Interactive Hero Canvas**: Powered by Three.js for interactive background particle animations.
- 📜 **Dynamic Certificate Verification System**: Instant public search and verification of yoga teacher training and course completion certificates backed by Supabase.
- 👑 **Admin Portal (`admin.html`)**: Complete dashboard for managing certificates, student bookings, activity logs, and system metrics.
- 🚀 **Enterprise SEO Engine (~700+ Pages)**: Programmatic generator script (`scripts/generate-pages.js`) targeting ~90 cities across India for 12 distinct yoga service offerings.
- 📩 **EmailJS Booking System**: Automatic email notification delivery to administration whenever a prospective student books a free trial class.
- 📝 **Automated Blog Engine**: Dynamic blog generator (`scripts/generate-blogs.js`) organizing articles into 20 health & wellness categories.

---

## 🛠️ Tech Stack & Services

| Layer | Technology / Service |
|---|---|
| **Build & Dev Tool** | [Vite 4](https://vitejs.dev/) |
| **Frontend Language** | Modern Vanilla JavaScript (ES6+), HTML5, Custom CSS3 |
| **3D Animations** | [Three.js](https://threejs.org/) |
| **Database & Auth** | [Supabase PostgreSQL](https://supabase.com/) |
| **Email Notifications** | [EmailJS Browser SDK](https://www.emailjs.com/) |
| **Deployment & Hosting** | [Vercel](https://vercel.com/) (Supports clean URL rewrites) |

---

## ⚙️ Environment & Setup

### 1. Prerequisites
- **Node.js**: v18.x or v20.x recommended
- **NPM**: v9+ package manager

### 2. Environment Variables (`.env`)
Create a `.env` file in the root folder (reference `.env.example`):

```env
# Supabase Public Keys
VITE_SUPABASE_URL=https://kxsovgiapzbpxahtkbuo.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Supabase Migration & Admin Setup Credentials (optional for setup.js)
DB_PASSWORD=your_database_password
SERVICE_ROLE_KEY=your_service_role_secret
ADMIN_PASSWORD=Admin123!
```

---

## 🚀 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (runs page generator then Vite)
npm run dev

# 3. Build production bundle (outputs to dist/)
npm run build

# 4. Preview production build locally
npm run preview

# 5. Run database migration & seed default superadmin
node scripts/setup.js
```

---

## 📧 EmailJS Configuration

The interactive Free Trial Modal initializes EmailJS in `js/app.js` using the following credentials:
- **Public Key**: `unI9GpMpWuyCcYJoT`
- **Service ID**: `service_8sb3twf`
- **Template ID**: `template_v12c1d5`

When a student submits the booking form, the system automatically:
1. Stores the trial booking record safely inside Supabase PostgreSQL.
2. Triggers EmailJS to send a real-time email alert containing student details (Name, Phone, City, Preferred Batch, Goal, Notes).

---

## 📁 Repository Documentation

- **[AGENTS.md](AGENTS.md)**: Guidelines for AI assistant tools to prevent redundant file scans.
- **[CODEBASE_MAP.md](CODEBASE_MAP.md)**: Detailed mapping of file structures and source templates.

---

## 🔒 License & Ownership

© **Amrit Yoga Center** (अमृत योग केंद्र). All rights reserved.
