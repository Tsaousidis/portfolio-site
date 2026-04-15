# 🚀 Scroll-Driven Portfolio — Konstantinos Tsaousidis

A performance-focused, interaction-driven portfolio built with Flask and modern frontend practices.
Designed to showcase projects through **scroll-based storytelling**, clean UI architecture, and mobile-first optimization.

🔗 Live: https://tsaousidis.online

---

## ✨ Experience Highlights

* 🎯 Scroll-driven project presentation with sticky sections
* 📱 Dual rendering logic (interactive desktop / optimized mobile layout)
* ⚡ Performance-first design (optimized assets & rendering path)
* 🎨 Minimal, intentional UI with subtle motion and hierarchy
* 🔍 SEO-friendly structure and accessibility-conscious layout

---

## 🧠 Design Approach

This portfolio is not just a static showcase.
It is built as an **experience**, focusing on:

* Structured content flow instead of page fragmentation
* Controlled animations (no unnecessary motion)
* Clear visual hierarchy and readability
* Consistent behavior across devices

---

## 💻 Tech Stack

### Frontend

* HTML5
* Tailwind CSS
* Vanilla JavaScript (ES6+)

### Backend

* Python 3.12
* Flask

### Deployment

* Render (Gunicorn)

---

## 🚀 Performance Optimizations

* ⚡ Merged and minified CSS
* 🚫 Reduced render-blocking resources
* 🖼 Responsive images (mobile-optimized assets)
* 💤 Lazy loading for non-critical images
* 🔗 Preconnect & preload for critical resources
* 📉 Optimized critical rendering path

📊 Lighthouse Performance:

* Mobile: ~88
* Desktop: ~98

---

## 📁 Project Structure

```
portfolio-site/
├── src/
│   └── tailwind-input.css        # Tailwind source file
│
├── static/
│   ├── css/
│   │   ├── app.min.css          # Production (merged & minified)
│   │   ├── style.css            # Custom styles (dev)
│   │   └── tailwind.css         # Generated Tailwind (dev)
│   │
│   ├── js/
│   │   └── main.js              # Core frontend logic
│   │
│   ├── images/                  # Optimized assets (webp, responsive)
│   ├── robots.txt
│   └── sitemap.xml
│
├── templates/
│   └── index.html               # Main template (SPA-style rendering)
│
├── app.py                       # Flask app entry point
├── wsgi.py                      # Production server entry
│
├── requirements.txt             # Python dependencies
├── package.json                 # Build tools (Tailwind)
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
│
├── render.yaml                  # Deployment config
├── .env / .env.example          # Environment variables
├── .gitignore
└── README.md
```

---

## 📱 Responsive Strategy

The site uses a **device-aware approach**:

* 📱 Mobile: simplified vertical layout for clarity & performance
* 💻 Desktop: scroll-based interactions and richer presentation
* ⚖️ Consistent UX across all breakpoints

---

## 🔒 Security Features

* CSRF protection
* Input validation & sanitization
* reCAPTCHA integration (contact form)
* Secure environment variable handling

---

## 👨‍💻 Author

**Konstantinos Tsaousidis**

* 💼 LinkedIn: https://www.linkedin.com/in/konstantinos-tsaousidis-1b7360225/
* 💻 GitHub: https://github.com/Tsaousidis
* 🌐 Portfolio: https://tsaousidis.online
* 📧 Email: [kostastsaousbm@gmail.com](mailto:kostastsaousbm@gmail.com)

---

## ©️ License

© 2026 Konstantinos Tsaousidis — All rights reserved.

This project is personal work and may not be reproduced without permission.
