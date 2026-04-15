<div align="center">
  <img src="./hardlink_banner_1776273267384.png" alt="HardLink Banner" width="100%" />

  # 🔗 HardLink
  ### Professional URL Shortener with Analytics

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Stack-MERN](https://img.shields.io/badge/Stack-MERN-blue?style=flat-square)](https://www.mongodb.com/mern-stack)
  [![Scale-56.8B](https://img.shields.io/badge/Combinations-56.8_Billion-orange)](https://hardlink.vercel.app)
  [![State-Live](https://img.shields.io/badge/State-Live-green)](https://hardlink.vercel.app)
</div>

---

## 📖 Introduction
**HardLink** is a simple yet powerful tool to shorten long URLs and track how many people click them. It includes a private dashboard where you can manage your links, set custom names, and monitor your traffic in real-time.

---

## 🧠 Engineering Behind This

### 1. The Math of Base62
To keep links as short as possible, I don't just use numbers. I use **Base62**, which includes numbers (`0-9`), uppercase letters (`A-Z`), and lowercase letters (`a-z`). 

**The Calculation:**
By using 6 characters, the number of possible unique URLs is:
$$62 \times 62 \times 62 \times 62 \times 62 \times 62 = 56,800,235,584$$
- **Base 10**: $10^6 = 1,000,000$ (1 Million)
- **Base 62**: $62^6 \approx 56.8 \text{ Billion}$

This density allows us to generate billions of unique short links using only 6 alphanumeric characters without ever using special symbols that might break a web link.

### 2. Custom Rate Limiter
To keep the server safe from spam or automated bots, we built a custom **Sliding Window** rate limiter. Instead of relying on external libraries, this manually tracks requests per IP address to ensure the website stays fast for everyone.

### 3. Smart Analytics Tracking
Every time someone clicks your link, HardLink records it instantly. We use **Atomic Updates** in the database to ensure that even if thousands of people click at the exact same millisecond, every single click is recorded accurately without slowing down the user's redirection.

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

| Layer | Tools |
| :--- | :--- |
| **Frontend** | React 19, Redux Toolkit, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose) |
| **Security** | JWT, Bcrypt, Bearer Auth |
| **Deployment** | Vercel |


---

## 🛠️ Setup Guide

1. Clone the repo: `git clone https://github.com/HardikMathur11/HardLink.git`
2. Backend: `cd Backend && npm install` (Add your `.env` variables)
3. Frontend: `cd ../Frontend && npm install` (Add your API URL)
4. Start: `npm run dev`

<p align="center">Built by Hardik Mathur</p>
