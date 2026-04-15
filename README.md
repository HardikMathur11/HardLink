<div align="center">
  <img src="./hardlink_banner_1776273267384.png" alt="HardLink Banner" width="100%" />

  # 🔗 HardLink
  ### A High-Density URL Shortener with Advanced System Design Logic

  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
  [![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=flat-square)](https://www.mongodb.com/mern-stack)
  [![Scale](https://img.shields.io/badge/Combinations-56.8_Billion-orange)](https://hardlink.vercel.app)
  [![State](https://img.shields.io/badge/State-Production--Ready-red)](https://hardlink.vercel.app)
</div>

---

## 📖 Introduction
**HardLink** is a production-grade URL shortening . While most shorteners rely on simple sequential IDs, HardLink implements **Hardware-level hashing** and **Base62 encoding** to provide a collision-resistant, high-density link ecosystem. It is built to handle massive scale while maintaining a sleek, minimalist user experience.

---

## 🧠 System Design & Engineering Deep-Dive

### 1. Solving the Collision Problem
A common mistake in URL shorteners is simply taking the first 6 characters of a hash. This leads to the **Birthday Paradox**—where different URLs accidentally generate the same code. 

**The HardLink Solution:**
- **Full Entropy**: We first generate a **SHA-256** hash of the URL + Salt.
- **Large Range Mapping**: We extract the first 8 Hex characters, providing a numeric range of **4.29 Billion** ($16^8$).
- **Deterministic Encoding**: We then pass this value through our custom **Base62 conversion** logic.

### 2. Why Base62 is the "Gold Standard"
By utilizing `0-9`, `A-Z`, and `a-z`, we achieve extreme character density:
- **Base 10 (Numeric)**: 6 characters = 1 Million combinations.
- **Base 16 (Hexadecimal)**: 6 characters = 16.7 Million combinations.
- **Base 62 (HardLink)**: 6 characters = **56,800,235,584 Combinations.** ($62^6$)
- **URL Safety**: Unlike Base64, Base62 is 100% alphanumeric, ensuring no "Reserved Characters" (like `/`, `+`, `=`) ever break a shared link.

### 3. Manual Sliding Window Rate Limiter
Most developers use `express-rate-limit`, but for **HardLink**, we engineered a custom **Sliding Window** middleware:
- **Resilience**: It tracks IP-based request bursts within a 10-minute window.
- **Stateless Efficiency**: It performs lightweight timestamp checks to ensure the system cannot be overwhelmed by bot traffic, returning a `429 Too Many Requests` when limits are breached.

### 4. Atomic Analytics & Concurrency
To ensure analytics accuracy, HardLink uses **Atomic Increments** (`$inc`) via Mongoose. This ensures that even if 10,000 people click a link at the exact same millisecond, every single click is recorded without race conditions destroying the count.

---

## ✨ Key Features
- **🚀 Deterministic Codes**: The same URL always generates the same short link, preventing database bloat.
- **🛡️ Cross-Domain Auth**: A robust **Bearer Token** system that bypasses modern browser cookie-blocking (Vercel deployment certified).
- **📊 User Dashboard**: Real-time tracking of links, click-through rates, and original destinations.
- **⚡ Custom Branding**: Support for custom aliases for high-conversion marketing links.

---

## 🏗️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Redux Toolkit, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose) |
| **Security** | JWT, HttpOnly Cookies, Bearer Auth, Bcrypt |
| **Deployment** | Vercel (Edge-Optimized) |

---

## 🚀 Installation & Usage

### Setup
1. Clone the repo: `git clone https://github.com/HardikMathur11/HardLink.git`
2. Backend: `cd Backend && npm install` (Add `.env` with `MONGODB_URI`, `JWT_SECRET`)
3. Frontend: `cd ../Frontend && npm install` (Add `.env` with `VITE_API_URL`)

### Development
```bash
# Production Build
npm run build

# Start Development
npm run dev
```

<p align="center">Designed & Engineered with by Hardik Mathur</p>
