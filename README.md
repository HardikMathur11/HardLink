<div align="center">
  <img src="./hardlink_banner_1776273267384.png" alt="HardLink Banner" width="100%" />

  # 🔗 HardLink
  ### Professional URL Shortener with Analytics

  [![Stack-MERN](https://img.shields.io/badge/Stack-MERN-blue?style=flat-square)](https://www.mongodb.com/mern-stack)
  [![Scale-56.8B](https://img.shields.io/badge/Combinations-56.8_Billion-orange)](https://hardlink.vercel.app)
  [![State-Live](https://img.shields.io/badge/State-Live-green)](https://hardlink.vercel.app)
</div>

---

## 📖 Introduction
**HardLink** is a simple yet powerful tool to shorten long URLs and track how many people click them. It includes a private dashboard where you can manage your links, set custom names, and monitor your traffic in real-time.

---

## 🧠 Engineering Behind This

### 1. Generating Unique Links (Base62)
To keep links as short as possible, we don't just use numbers. We use **Base62**, which includes numbers (`0-9`), uppercase letters (`A-Z`), and lowercase letters (`a-z`). 
- **The Result**: Even with just 6 characters, we can generate over **56 Billion** unique combinations without any special symbols that might break a web link.
- **The Strategy**: We use a deterministic hashing process that ensures your long URL always maps to the same short, reliable code.

### 2. Custom Rate Limiter
To keep the server safe from spam or automated bots, we built a custom **Sliding Window** rate limiter. Instead of relying on external libraries, this manually tracks requests per IP address to ensure the website stays fast for everyone.

### 3. Smart Analytics Tracking
Every time someone clicks your link, HardLink records it instantly. We use **Atomic Updates** in the database to ensure that even if thousands of people click at the same time, every single click is recorded accurately without slowing down the user's redirection.

### 4. Direct Authentication (Bearer Token)
To make sure you stay logged in securely across different websites, we use a **Bearer Token** system. This bypasses the security blocks that modern browsers often place on cookies, ensuring your session is always stable and safe.

---

## ✨ Key Features
- **🚀 Simple Shortening**: Instant URL conversion.
- **📊 Link Dashboard**: Track all your links and click counts in one place.
- **⚡ Custom Names**: Create your own custom link aliases (e.g., `/my-promo`).
- **🛡️ Secure Login**: Protected user accounts and private data.

---

## 🏗️ Technology Stack
- **Frontend**: React 19, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Security**: JWT & Bearer Tokens

---

## 🚀 Setup Guide

1. Clone the repo: `git clone https://github.com/HardikMathur11/HardLink.git`
2. Backend: `cd Backend && npm install` (Add your `.env` variables)
3. Frontend: `cd ../Frontend && npm install` (Add your API URL)
4. Start: `npm run dev`

<p align="center">Built by Hardik Mathur</p>
