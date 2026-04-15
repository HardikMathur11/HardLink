# 🔗 HardLink | Advanced URL Shortening SaaS

```bash
$ neofetch --system "HardLink System Architecture"
```
```text
       .---.            USER        : Hardik Mathur
      /     \           SYSTEM      : MERN Stack + System Design Logic
      |() ()|           SECURITY    : JWT Bearer Authorization 
       \  -  /          ALGORITHM   : Base62 Deterministic Encoding
        `---'           LIMITER     : Custom Sliding Window
```

## 🛠️ System Design Overview

HardLink is not just a URL shortener; it's a study in efficient system design, focus on scalability, security, and manual implementation of core infrastructure.

### 1. The Base62 Encoding Engine
Instead of using generic IDs, HardLink implements a **Base62** algorithm to generate short, clean, and highly unique URL codes.
- **Character Set**: `0-9`, `A-Z`, `a-z` (62 unique characters).
- **Process**: 
  1. We take the `LongURL` and `UserID` and generate a **SHA-256 Hash**.
  2. The hash is converted into a large integer.
  3. We perform **Modulo 62** repeatedly to map that integer to our character set.
- **Result**: A 6-character string providing over **56,800,000,000** unique combinations.

### 2. Custom Sliding Window Rate Limiter
Implemented from scratch without external libraries (`express-rate-limit`), our middleware ensures system stability and prevents DDoS attacks.
- **Logic**: It maintains a per-IP state tracking `maxRequest`, `windowMs`, and `lastRequest`.
- **Sliding Behavior**: It dynamically resets the counter once the window timeframe expires, ensuring fair usage for all users.

### 3. Cross-Domain Bearer Authentication
To solve the "Third-Party Cookie" blocking issues modern browsers (Chrome/Safari) impose on separate frontend/backend deployments:
- **Fallback Logic**: Implemented a **Bearer Token** system.
- **Interceptor**: A custom Axios interceptor automatically injects the JWT into the `Authorization` header, keeping users logged in even across different apex domains (`.vercel.app`).

### 4. Advanced Analytics & Tracking
Every link shortened via HardLink is monitored in real-time.
- **Click Tracking**: Every visit increments the click counter in the database via atomic updates.
- **Dashboard**: Users get a personalized view of all their links, analytics, and original URLs.

---

## 🏗️ Tech Stack

- **Frontend**: React.js 19 + Redux Toolkit (State Management)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Security**: JWT + Bcrypt + CORS Proxy
- **Styling**: Vanilla CSS + Tailwind Core

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/HardikMathur11/HardLink.git

# Install Backend Dependencies
cd Backend && npm install

# Install Frontend Dependencies
cd ../Frontend && npm install

# Start the Dev Environment
npm run dev
```

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/auth/register` | User Registration | 🔓 |
| POST | `/auth/login` | User Login (Returns Bearer Token) | 🔓 |
| GET | `/auth/me` | Fetch Authenticated User | 🛡️ |
| POST | `/short` | Create Deterministic Short URL | 🛡️ |
| GET | `/fetchdata` | Get User Analytics | 🛡️ |
| GET | `/:shortCode` | Redirection Logic | 🔓 |

---

> **Note**: This project was built with a focus on **manual implementation** of core features to understand the underlying mechanics of backend infrastructure and security.
