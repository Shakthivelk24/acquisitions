# Acquisitions Backend API

A secure and scalable backend application built using Node.js and Express.js for practicing modern backend development, Docker containerization, CI/CD pipelines, PostgreSQL integration with Neon, and API security using Arcjet.

---

# 🚀 Features

## 🔐 Authentication & Authorization
- User Registration
- User Login
- JWT Authentication
- Password Hashing with bcrypt
- Protected Routes
- Cookie-based Authentication

## 👤 User Management
- Get User Details
- Update User Information
- Delete User Account

## 🛡 Security Features
- Arcjet Protection
- Bot Detection
- Rate Limiting
- Helmet Security Middleware
- CORS Configuration
- Request Logging using Morgan
- Winston Logger Support

## 🐳 DevOps & CI/CD
- Dockerized Backend
- Docker Compose Support
- GitHub Actions CI/CD
- ESLint + Prettier Setup
- Jest Testing Support

## 🗄 Database
- PostgreSQL Database
- Neon Serverless PostgreSQL
- Drizzle ORM
- Drizzle Migration Support

---

# 🛠 Tech Stack

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL
- Neon Database
- Drizzle ORM

## Authentication
- JWT
- bcrypt

## Validation
- Zod

## Security
- Arcjet
- Helmet
- CORS

## Logging
- Morgan
- Winston

## DevOps
- Docker
- GitHub Actions

## Testing
- Jest
- Supertest

---
# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Shakthivelk24/acquisitions.git

cd acquisitions
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

# 🌐 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DATABASE_URL=your_neon_database_url

JWT_SECRET=your_jwt_secret

ARCJET_KEY=your_arcjet_key
```

---

# ▶️ Running the Project

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

---

# 🐳 Docker Commands

## Run Development Docker

```bash
npm run dev:docker
```

## Run Production Docker

```bash
npm run prod:docker
```

## Build Docker Image

```bash
docker build -t acquisitions .
```

## Run Docker Container

```bash
docker run -p 5000:5000 acquisitions
```

---

# 🗄 Drizzle Database Commands

## Generate Migration

```bash
npm run db:generate
```

## Run Migration

```bash
npm run db:migrate
```

## Open Drizzle Studio

```bash
npm run db:studio
```

---

# 🧪 Testing

## Run Tests

```bash
npm dev test
```

Uses:
- Jest
- Supertest

---

# ✅ Linting & Formatting

## Run ESLint

```bash
npm run lint
```

## Fix ESLint Issues

```bash
npm run lint:fix
```

## Format Code

```bash
npm run format
```

## Check Formatting

```bash
npm run format:check
```

---

# 🔄 CI/CD Pipeline

This project uses GitHub Actions for:

- Automated Testing
- Lint Checking
- Docker Build Validation
- CI/CD Automation

Workflow File:

```bash
.github/workflows/docker-bulid-and-push.yml
.github/workflows/lint-and-format.yml
.github/workflows/test.yml
```

---

# 🔑 API Endpoints

## Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/sign-up` | Register User |
| POST | `/api/auth/sign-in` | Login User |

---

## User Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get All Users |
| GET | `/api/users/:id` | Get User By ID |
| PUT | `/api/users/:id` | Update User |
| DELETE | `/api/users/:id` | Delete User |

---

# 📦 Package Highlights

## Main Dependencies

| Package | Purpose |
|---|---|
| express | Backend Framework |
| drizzle-orm | ORM for PostgreSQL |
| @neondatabase/serverless | Neon PostgreSQL Driver |
| bcrypt | Password Hashing |
| jsonwebtoken | JWT Authentication |
| zod | Validation |
| helmet | Security Middleware |
| cors | Cross-Origin Support |
| morgan | HTTP Request Logging |
| winston | Logging |

---

# 🛡 Arcjet Integration

Arcjet is used for:
- Bot Protection
- API Shielding
- Request Validation
- Rate Limiting

Official Website:

https://arcjet.com

---

# ☁️ Neon PostgreSQL

The backend uses Neon Serverless PostgreSQL.

Features:
- Cloud PostgreSQL
- Serverless Architecture
- Fast Scaling
- Branch-based Development

Official Website:

https://neon.tech

---

# 📚 Learning Goals

This project was built to practice:

- Backend API Development
- Authentication Systems
- PostgreSQL Integration
- Drizzle ORM
- Docker & Containerization
- GitHub Actions CI/CD
- Secure API Development
- DevOps Workflow

---

# 👨‍💻 Author

## Shakthivel K

GitHub:
https://github.com/Shakthivelk24

---

# 📄 License

This project is created for educational and practice purposes.