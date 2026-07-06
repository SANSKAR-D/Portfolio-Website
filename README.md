# 🌟 Sanskar Gupta — Portfolio Website

> *A personal developer portfolio built with Next.js, featuring live competitive programming stats, interactive 3D rendering, and a clean component-based architecture.*

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## ✨ Features

### 🦸 Hero Section
- Impactful bio and introduction with CTA buttons (Download Resume, View Projects)
- Animated background with dynamic visuals
- Tech stack icon showcase

### 🧊 3D graphics & Interactive Canvas
- Rotating 3D stylized planet model rendered inside the Contact section using React Three Fiber
- Scroll-linked 3D wrapper (`Scroll3DWrapper.js`) for immersive layout tilt animations
- Scroll progress indicator

### 🏆 Live Coding Stats Dashboard
- **Real-time API integration** — fetches live data from LeetCode & Codeforces
- LeetCode: Total problems solved, contest rating, contests attended
- Codeforces: Current rating, max rating, contests count
- **1-hour server-side cache** to avoid rate limits (in-memory; upgradeable to Redis/Vercel KV)
- Data fetched via Next.js API Route (`/api/profiles`)

### 📁 Projects Gallery
- Dynamic project cards with title, description, tech tags, and GitHub/demo links
- Pinnable featured projects

### 🧑‍💼 Experience & Education
- Vertical timeline layout for university milestones and positions

### 📬 Contact Section
- Validated contact form
- Links to GitHub, LinkedIn, and other socials

### ⚙️ UX Extras
- Scroll-to-top button
- Smooth scroll progress bar
- Fully responsive (mobile-first)
- Dark mode aesthetic

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | JavaScript |
| **Styling** | Vanilla CSS (`globals.css`, `components.css`) |
| **3D Rendering** | Three.js / React Three Fiber (`Contact.js`) |
| **API & Email** | Next.js Route Handlers, Nodemailer |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
Portfolio-Website/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.js        # Nodemailer Contact Form handler
│   │   └── profiles/
│   │       └── route.js        # Live LeetCode + Codeforces API handler
│   ├── layout.js               # Root layout with metadata & fonts
│   ├── page.js                 # Main page — assembles all sections
│   ├── globals.css             # Global styles
│   └── components.css          # Component-level styles
├── components/
│   ├── Hero.js                 # Landing hero section
│   ├── About.js                # About me section
│   ├── Projects.js             # Projects gallery
│   ├── CodingProfiles.js       # Competitive programming cards
│   ├── CodeDashboard.js        # Live stats dashboard
│   ├── Experience.js           # Timeline section (education, certifications)
│   ├── Contact.js              # Contact form + socials + 3D planet
│   ├── Navbar.js               # Navigation bar
│   ├── Footer.js               # Footer
│   ├── Background.js           # Animated background
│   ├── Scroll3DWrapper.js      # Scroll-linked 3D layout effects
│   ├── ScrollProgress.js       # Scroll progress bar
│   └── ScrollToTop.js          # Back-to-top button
├── public/                     # Static assets
├── .env.example                # Email SMTP setup template
├── PRD.md                      # Product Requirements Document
├── next.config.mjs
└── package.json
```

---

## ⚡ Live API — Coding Stats

The portfolio fetches real-time stats via a built-in Next.js API route:

```
GET /api/profiles?platform=leetcode&handle=sanskarguptadsa
GET /api/profiles?platform=codeforces&handle=Sanskar__G
```

**LeetCode** response:
```json
{ "solved": 350, "rating": 1542, "contests": 12 }
```

**Codeforces** response:
```json
{ "rating": 1284, "maxRating": 1310, "contests": 18 }
```

- Responses are cached server-side for **1 hour** to stay within API rate limits
- Falls back to stale cache on fetch failures

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/SANSKAR-D/Portfolio-Website.git
cd Portfolio-Website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📧 Contact

**Sanskar Gupta**
- 📧 sethsanskar856@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/sanskargupta-)
- 🐙 [GitHub](https://github.com/SANSKAR-D)
- 🏆 [Codolio](https://codolio.com/profile/SANSKAR-D)
- 💻 [LeetCode](https://leetcode.com/u/sanskarguptadsa/)
- 🔵 [Codeforces](https://codeforces.com/profile/Sanskar__G)
