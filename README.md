# Shutterscape GCU

The official website for the **Shutterscape Photography Club** at GCU — built with Next.js 14, Tailwind CSS, MongoDB, and Cloudinary.

## Features

- 📸 **Masonry Gallery** with lightbox & category filters
- 🗓️ **Activities Timeline** with rich-text descriptions
- 👥 **About Page** — Faculty, Core Team, Alumni & Codénix credit
- 🔐 **Admin Dashboard** — CRUD for Activities, Gallery, Members
- ✏️ **Tiptap Rich-Text Editor** in admin panel
- ☁️ **Cloudinary** image uploads with on-the-fly optimization
- 🛡️ **JWT auth** with HTTP-only cookies & edge middleware

## Getting Started

```bash
# 1. Clone & install
git clone <repo-url>
cd shutterscape-gcu
npm install

# 2. Configure environment
cp .env.example .env.local
# Fill in MongoDB URI, JWT secret, Cloudinary keys

# 3. Seed the database
npm run seed

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Framework    | Next.js 14 (App Router)          |
| Styling      | Tailwind CSS 3                    |
| Database     | MongoDB + Mongoose                |
| Auth         | JWT (jose) + HTTP-only cookies    |
| Storage      | Cloudinary                        |
| Editor       | Tiptap (ProseMirror)              |
| Animations   | Framer Motion                     |
| Validation   | Zod                               |
