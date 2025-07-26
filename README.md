# 🐾 Annocat – Visually Capture. Annotate. Organize. Share.

**Annocat** is your purr-fect companion for visually bookmarking the web. Capture specific sections of any page, add notes and annotations, then view, organize, and share everything from your web dashboard.

---

## 📁 Folder Structure

```
.
├── web/           # Next.js dashboard (App Router, all features)
│   └── src/
│       └── app/   # Dashboard, projects, login, sharing, etc.
│       └── db/    # Drizzle ORM schema, fetch logic
│       └── components/ # UI, sidebar, nav, buttons, etc.
│       └── hooks/ # Custom React hooks
│       └── lib/   # Auth, utils
├── extension/     # Chrome extension (coming soon)
└── README.md
```

---

## 🧠 About Annocat

Whether you're a designer collecting inspiration, a PM organizing client feedback, or just a curious cat saving cool stuff — **Annocat** helps you do it with clarity and style.

### 🐱 Core Features

- 📸 Screenshot and save specific sections of any webpage
- 📝 Add notes, labels, and rich visual annotations
- 📂 Organize everything into project folders
- 🔗 Share folders and reports with clients or teammates
- 🌐 Open all captured links at once (no duplicates)
- 📤 Export to PDF, Figma, or custom formats
- ☁️ Cloud sync with a full-featured dashboard

---

## 🖥 Web Dashboard (`/web`)

### Built With

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) – Auth, DB, file storage
- [Drizzle ORM](https://orm.drizzle.team/) – Type-safe schema and queries
- [shadcn/ui](https://ui.shadcn.com/) – Modern UI components
- [Lucide React](https://lucide.dev/) – Icon set

---

## 🧩 Chrome Extension (`/extension`)

> 🛠️ Coming soon!

This will be the cat-alyst of your workflow:

- Injects UI into webpages for section-based screenshot capture
- Lets you add annotations right after capture
- Automatically syncs with your projects in the dashboard

### Planned Tech Stack

- Manifest V3
- React + Tailwind for popup & settings
- `html2canvas` for screenshotting DOM elements
- Supabase for seamless sync

---

## 🐾 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/annocat.git

# Navigate to the web dashboard
cd web

# Install dependencies (pnpm recommended)
pnpm install

# Start the dev server
pnpm run dev
```

> Make sure to set up your `.env` file with Supabase credentials and auth secrets.

---

## 🗺 Roadmap

- [x] Next.js dashboard layout
- [x] Auth + Drizzle schema with Supabase
- [x] Capture, annotate, organize, share
- [x] Open all links in one click
- [ ] Chrome extension popup UI
- [ ] Screenshot + annotation overlay
- [ ] Real-time sync with dashboard
- [ ] Export: PDF / HTML / Figma
- [ ] Public folder sharing

---

## 📄 License

GPL-3.0 License —  because we believe in open source, not copycatting.

---

## 😸 Made with <3 by [Yash D](https://yashd.in)

If you have feedback, ideas, or just want to say meow — feel free to open an issue or drop a message. Contributions are claw-some.
