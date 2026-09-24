# CODEBASE_MAP.md - Fast Structural Reference

This document maps out the file structure of **Amrit Yoga Center** to avoid full codebase directory scans.

---

## Directory & File Taxonomy

```
/ (Root Directory)
├── 📄 AGENTS.md                  <-- Rules & Instructions for AI Agents
├── 📄 CODEBASE_MAP.md            <-- Codebase structure map (This file)
├── 📄 .env.example               <-- Required environment variables template
├── 📄 package.json               <-- Project configuration, dependencies, build scripts
├── 📄 vite.config.js             <-- Vite bundle inputs, clean URL middleware, dist asset copier
├── 📄 vercel.json                <-- Vercel deployment rewrite rules for clean routes
├── 📄 supabase-migration.sql     <-- PostgreSQL Database Schema & RLS Security Policies
│
├── 🎨 Source Code Directories
│   ├── 📁 css/
│   │   └── style.css            <-- Main design system (glassmorphism, layout, admin dark theme)
│   ├── 📁 js/
│   │   ├── app.js               <-- Main UI handlers, contact form, certificate search modal
│   │   ├── db.js                <-- Supabase API layer (Auth, Certificates CRUD, Logs)
│   │   └── three-scene.js       <-- Three.js 3D interactive hero background animation
│   ├── 📁 services/
│   │   └── *.html               <-- 12 Core static service pages (kids, corporate, therapy, etc.)
│   └── 📁 scripts/
│       ├── generate-pages.js    <-- Node script: Generates 700+ city SEO landing pages
│       ├── generate-blogs.js    <-- Node script: Generates blog posts in category folders
│       └── setup.js             <-- Node script: Applies SQL migration & seeds Admin user
│
├── 🌐 Core Hand-Crafted Pages
│   ├── index.html               <-- Primary Homepage
│   ├── admin.html               <-- Admin Dashboard & Certificate Management Portal
│   ├── blog.html                <-- Main Blog Hub
│   ├── certificates.html        <-- Certificate Search & Verification Page
│   ├── certificate.html         <-- Dynamic Single Certificate Details Viewer
│   └── [guide-name].html        <-- Health guides (meditation-benefits, yoga-for-back-pain, etc.)
│
└── ⚡ Auto-Generated Directories & Files (DO NOT EDIT INDIVIDUALLY)
    ├── 📁 blog/                 <-- Auto-generated blog articles (20 categories)
    ├── 📁 dist/                 <-- Production build output (generated on npm run build)
    └── 📄 [service]-[city].html  <-- 700+ Auto-generated city SEO pages in root
```

---

## Fast Search Guide for Development Tasks

| If you want to modify... | Go to this file / folder |
|---|---|
| Main homepage design or hero | `index.html` & `js/three-scene.js` |
| Site colors, fonts, responsive styling | `css/style.css` |
| Admin panel UI or login workflow | `admin.html` & `js/db.js` |
| Certificate verification logic | `certificates.html`, `certificate.html`, `js/db.js` |
| Database tables, RLS policies, triggers | `supabase-migration.sql` |
| SEO city page generator template | `scripts/generate-pages.js` |
| Blog generator template | `scripts/generate-blogs.js` |
| Build pipeline / Routing / URL rewrite | `vite.config.js` & `vercel.json` |

---

## Environment & Run Commands

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```
