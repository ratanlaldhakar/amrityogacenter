# AGENTS.md - Developer & Agent Instructions

> **CRITICAL RULE FOR AI AGENTS**: Do NOT scan or edit individual city/SEO HTML files (e.g., `kids-yoga-agra.html`, `online-yoga-classes-delhi.html`) individually! Over 700+ HTML files in the root are **auto-generated**. Always edit source templates or generator scripts instead.

---

## 1. Project Overview & Architecture

**Amrit Yoga Center** is a high-performance web application built with **Vite 4**, **Vanilla JS**, **Custom Glassmorphism CSS**, **Three.js** (3D hero graphics), and **Supabase (PostgreSQL)** for dynamic certificate verification & admin management.

### Key Architectural Pattern:
- **Core Pages**: `index.html`, `admin.html`, `certificates.html`, `certificate.html`, `blog.html`
- **Source Scripts & Templates**:
  - `scripts/generate-pages.js`: Generates ~700+ city & service SEO landing pages covering ~90 cities across India.
  - `scripts/generate-blogs.js`: Generates SEO blog articles into `blog/` subdirectories.
  - `scripts/setup.js`: Database migration runner and admin seeding script.
- **Frontend Logic & Styling**:
  - `js/app.js`: Interactive UI logic, certificate lookup modal, contact forms.
  - `js/db.js`: Supabase API layer for certificate queries, admin auth, activity logs.
  - `js/three-scene.js`: 3D canvas animation hero background.
  - `css/style.css`: Comprehensive design system & dark theme for admin.
  - `services/`: Core service templates (12 static pages).
- **Backend & Database**:
  - `supabase-migration.sql`: Schema definitions, RLS security policies, triggers, and stats counters.

---

## 2. Environment & Technical Requirements

### Prerequisites:
- **Node.js**: v18.x or v20.x (Recommended: Node 18+)
- **Package Manager**: npm (v9+)
- **Database**: Supabase PostgreSQL Cloud Instance

### Installed NPM Packages:
- `vite` (`^4.5.3`): Build tool & local dev server.
- `@supabase/supabase-js` (`^2.107.0`): Supabase client library.
- `dotenv` (`^17.4.2`): Environment variable loader.
- `pg` (`^8.21.0`): PostgreSQL client for setup script migrations.

### Environment Variables (`.env`):
Create a `.env` file in the root directory (see `.env.example`):
```env
VITE_SUPABASE_URL=https://kxsovgiapzbpxahtkbuo.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
DB_PASSWORD=your_db_password          # Optional: for running scripts/setup.js
SERVICE_ROLE_KEY=your_service_key    # Optional: for running scripts/setup.js
ADMIN_PASSWORD=your_admin_password    # Optional: default admin pass
```

---

## 3. Workflow & CLI Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Runs `scripts/generate-pages.js` to build SEO pages, then launches Vite dev server on `http://localhost:5173`. |
| `npm run build` | Runs `scripts/generate-pages.js`, compiles site via Vite into `dist/`, and copies `js/` & `images/`. |
| `npm run preview` | Previews the compiled `dist/` production bundle locally. |
| `node scripts/setup.js` | Executes `supabase-migration.sql` against Supabase DB and seeds default superadmin user (`admin@yogamrit.com`). |

---

## 4. How to Modify Content or Features

1. **Changing Layout/Styles for City SEO Pages**:
   - Edit `scripts/generate-pages.js`. Do **NOT** edit `.html` files in the root directly.
   - Run `npm run dev` or `npm run build` to propagate changes to all ~700+ pages automatically.

2. **Changing Blog Layout/Styles**:
   - Edit `scripts/generate-blogs.js` or `blog.html`.

3. **Modifying Certificate Verification / Admin UI**:
   - UI: `admin.html`, `certificates.html`, `certificate.html`.
   - Logic & Supabase Integration: `js/db.js` and `js/app.js`.
   - Database Schema: `supabase-migration.sql`.

4. **Modifying Styling / Design**:
   - Edit `css/style.css`.
