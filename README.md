<div align="center">
  <img src="./hardlink_banner_1776273267384.png" alt="HardLink Banner" width="100%" />

  # 🔗 HardLink
  ### Advanced URL Shortening with Custom Analytics & System Design Logic

  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
  [![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=flat-square)](https://www.mongodb.com/mern-stack)
  [![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?ロゴ=vercel&logoColor=white)](https://vercel.com)
  [![Safety Check](https://img.shields.io/badge/State-Production--Ready-red)](https://hardlink.vercel.app)
</div>

---

## 📖 Introduction
**HardLink** is a high-performance URL shortening SaaS built with the MERN stack. It goes beyond simple redirection by incorporating a custom **Base62 encoding engine** and a manual **Sliding Window Rate Limiter**. It is designed for developers who appreciate clean architecture and robust security.

## ✨ Key Features
- **🚀 Ultra-Fast Shortening**: Convert long URLs into 6-character unique codes instantly.
- **🛡️ JWT Bearer Auth**: Cross-domain session persistence using `localStorage` and `Authorization` headers.
- **📊 Real-time Analytics**: Track click counts and monitor link performance per user.
- **⚡ Custom Aliases**: Set professional, branding-focused custom URLs.
- **🛑 In-House Rate Limiter**: custom-built Sliding Window algorithm to prevent DDoS and spam.

---

## 🛠️ Engineering Behind this

### 1. Deterministic Base62 Algorithm
HardLink uses an industry-standard **Base62 encoding** (`0-9`, `A-Z`, `a-z`) to maximize code density.
- **The Concept**: By converting a 32-bit integer derived from a SHA-256 hash into Base62, we achieve **56.8 Billion** unique combinations with only 6 characters.
- **Why?**: Base62 is 100% URL-safe and avoids special characters like `+` or `/` that can break in browsers.

### 2. Manual Sliding Window Rate Limiter
Unlike generic libraries, HardLink uses a custom-built middleware to track user requests.
- Maintains an in-memory state of client IPs.
- Dynamically calculates time differences to enforce strict request limits.
- Prevents server overload by returning a `429 Too Many Requests` status during bursts.

---

## 🏗️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Redux Toolkit, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose) |
| **Security** | JWT, HttpOnly Cookies, Bcrypt |
| **Deployment** | Vercel (Frontend & Backend) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account

### Installation
```bash
# Clone the repository
git clone https://github.com/HardikMathur11/HardLink.git

# Setup Backend
cd Backend
npm install
# Create .env with MONGODB_URI, JWT_SECRET, FRONTEND_URL

# Setup Frontend
cd ../Frontend
npm install
# Create .env with VITE_API_URL
```

### Running Locally
```bash
# In Backend folder
npm start

# In Frontend folder
npm run dev
```

---

## 📡 API Reference

#### Authentication
- `POST /auth/register` : Create new account.
- `POST /auth/login` : Authenticate user & receive Bearer Token.
- `GET /auth/me` : Get current authenticated user details.

#### Link Management
- `POST /short` : Shorten a URL (Supports Custom Aliases).
- `GET /fetchdata` : Fetch analytics for all user links.
- `GET /:shortCode` : Redirect to original long URL (Atomic click tracking).

---

<p align="center">Made with ❤️ by Hardik Mathur</p>
