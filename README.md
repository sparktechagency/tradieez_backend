# 🚀 Tradiezz Backend with MVC pattern

A robust, scalable backend API for the Tradiezz platform - a comprehensive job marketplace and candidate management system built with **Express.js**, **TypeScript**, **MongoDB**, and **Socket.io**.

[![Node Version](https://img.shields.io/badge/Node-22-green?style=flat-square)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-goni715%2Ftradiezz--backend-black?style=flat-square&logo=github)](https://github.com/goni715/tradiezz-backend)

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Features](#api-features)
- [Key Components](#key-components)
- [Database Models](#database-models)
- [Error Handling](#error-handling)
- [Authentication](#authentication)
- [Contributing](#contributing)

---

## 🎯 Project Overview

Tradiezz is a full-featured job marketplace platform that connects employers and candidates. The backend provides comprehensive REST APIs for:

- **User Management** - Candidate and employer profiles with authentication
- **Job Management** - Create, update, search, and manage job postings
- **Application System** - Apply for jobs, manage applications with status tracking
- **Review System** - Employer and candidate reviews with ratings
- **Chat & Messaging** - Real-time messaging between users via Socket.io
- **Subscription Plans** - Manage subscription tiers and payment processing
- **Blog System** - Create and manage blog content with categories
- **Dashboard Analytics** - User statistics and income overview
- **Admin Panel** - Comprehensive admin controls and moderation
- **Favorites System** - Save favorite jobs and candidates
- **File Management** - CV uploads and image management via Cloudinary

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js v22 |
| **Language** | TypeScript |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose |
| **Validation** | Zod |
| **Real-time** | Socket.io |
| **Authentication** | JWT (JSON Web Tokens) |
| **Password Hashing** | Bcrypt |
| **Payment** | Stripe |
| **Email Service** | SMTP (Gmail) |
| **File Storage** | Cloudinary |
| **Package Manager** | Yarn |

---

## 📁 Project Structure

```
src/
├── config/              # Environment and configuration management
├── constant/            # Application constants and configurations
│   ├── admin.constant.ts
│   ├── job.constant.ts
│   ├── subscription.constant.ts
│   └── ...
├── controllers/         # Request handlers and business logic orchestration
├── db/                  # Database initialization and seeding
├── errors/              # Custom error classes
├── helper/              # Utility helpers
│   ├── QueryBuilder.ts  # Dynamic search and filter queries
│   ├── cloudinary.ts    # Image upload operations
│   └── upload.ts        # File upload middleware
├── interfaces/          # TypeScript interfaces and type definitions
├── middlewares/         # Express middlewares
│   ├── AuthMiddleware.ts      # JWT verification
│   ├── validationMiddleware.ts # Zod validation
│   ├── globalErrorHandler.ts
│   └── notFound.ts
├── models/              # MongoDB Mongoose schemas
├── routes/              # API route definitions
├── services/            # Business logic and data access layer
│   ├── admin/
│   ├── application/
│   ├── auth/
│   ├── blog/
│   ├── chat/
│   ├── job/
│   ├── subscription/
│   └── ...
├── types/               # Global TypeScript types
├── utils/               # Utility functions
│   ├── email/           # Email templates and sending
│   ├── asyncHandler.ts  # Express async wrapper
│   ├── createToken.ts   # JWT token generation
│   └── ...
├── validation/          # Zod validation schemas
├── app.ts               # Express app configuration
└── server.ts            # Server entry point
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** v22 or higher
- **MongoDB** (local or Atlas cloud database)
- **Yarn** package manager
- **Stripe Account** (for payment processing)
- **Cloudinary Account** (for file storage)
- **Gmail Account** (for SMTP email service)

### Clone Repository

```bash
git clone https://github.com/goni715/tradiezz-backend.git
cd tradiezz-backend
```

### Install Dependencies

```bash
yarn install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=8080

# Database
DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/tradiezz-backend?appName=Cluster0

# JWT Secrets (Change these in production!)
JWT_VERIFY_EMAIL_SECRET=verify_email_secret
JWT_ACCESS_SECRET=access_secret
JWT_REFRESH_SECRET=refresh_secret

# JWT Expiration Times
JWT_VERIFY_EMAIL_EXPIRES_IN=expires_time
JWT_ACCESS_EXPIRES_IN=access_expires_time
JWT_REFRESH_EXPIRES_IN=refresh_expires_time

# Password Hashing
BCRPYT_SALT_ROUNDS=salt_round_numbers

# SMTP Email Configuration (Gmail)
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_FROM=<your-email@gmail.com>

# Admin Default Credentials
SUPER_ADMIN_EMAIL=super_admin_email
SUPER_ADMIN_PASSWORD=super_admin_password
SUPER_ADMIN_REG_OTP=super_admin_reg_otp
ADMIN_DEFAULT_PASSWORD=admin_default_password

# Stripe Payment Gateway
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# Cloudinary File Storage
CLOUD_NAME=your-cloud-name
CLOUD_API_KEY=your-api-key
CLOUD_API_SECRET_KEY=your-secret-key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

> ⚠️ **Security Note**: Never commit `.env` file to version control. Use `.env.example` for documentation.

---

## ▶️ Running the Project

### Development Mode (with hot reload)

```bash
yarn dev
```

### Production Build

```bash
yarn build
```

### Start Production Server

```bash
yarn start
```

The server will be available at `http://localhost:8080`

---

## 🌟 API Features

### Authentication & Authorization
- ✅ User registration (Candidate & Employer)
- ✅ Email verification with OTP
- ✅ JWT-based authentication
- ✅ Password reset with email verification
- ✅ Token refresh mechanism
- ✅ Role-based access control (User, Admin, Super Admin)

### User Management
- ✅ Candidate profile management
- ✅ Employer profile management
- ✅ Profile search and filtering
- ✅ Account deletion
- ✅ Status change management

### Job Management
- ✅ Create, read, update, delete jobs
- ✅ Advanced search with filters (category, salary range, location)
- ✅ Job status management (Active, Stopped, Completed)
- ✅ Favorite jobs management
- ✅ Job application tracking

### Application System
- ✅ Apply for jobs
- ✅ View applications with status tracking
- ✅ Update application status (Pending, Shortlisted, Accepted, Rejected)
- ✅ Email notifications on status changes

### Review & Rating System
- ✅ Post reviews for employers (from candidates)
- ✅ Post reviews for candidates (from employers)
- ✅ View all reviews with filtering

### Chat & Messaging
- ✅ Real-time messaging via Socket.io
- ✅ Create chat rooms
- ✅ Message history retrieval
- ✅ User online/offline status

### Subscription Management
- ✅ Multiple subscription plans
- ✅ Stripe payment integration
- ✅ Subscription status verification
- ✅ Plan upgrade/downgrade

### Blog System
- ✅ Create and manage blog posts
- ✅ Blog categories and subcategories
- ✅ Search and filter posts
- ✅ User-specific blog management

### Admin Features
- ✅ User management and moderation
- ✅ Content management (jobs, blogs, FAQs)
- ✅ Payment and subscription oversight
- ✅ Dashboard analytics

---

## 🔧 Key Components

### QueryBuilder (Advanced Search & Filtering)

```typescript
// Search across multiple fields with regex support
const searchQuery = makeSearchQuery("tech", ["title", "description"]);

// Convert and filter query parameters
const filterQuery = makeFilterQuery({
  salary: "50000",
  isActive: "true"
});
```

**Features:**
- Case-insensitive search across multiple fields
- Automatic type conversion (string → number, boolean)
- MongoDB regex query generation

### Validation Middleware (Zod Integration)

```typescript
// Validates request body and cookies using Zod schemas
const validationMiddleware = (schema: ZodType) => {
  return async (req, res, next) => {
    // Parses and validates, returns formatted errors on failure
  };
};
```

**Features:**
- Schema validation with Zod
- Formatted error responses
- Supports body and cookie validation
- First error message prioritization

### Custom Error Handling

```typescript
class CustomError extends Error {
    public statusCode: number;
    
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
```

### Async Handler Wrapper

```typescript
const asyncHandler = (fn: RequestHandler) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
```

---

## 📊 Database Models

The application uses 20+ MongoDB models:

| Model | Purpose |
|-------|---------|
| **User** | Base user account with role (Candidate/Employer) |
| **Admin** | Admin accounts with permissions |
| **Candidate** | Extended candidate profile with skills, experience |
| **Employer** | Extended employer profile with company info |
| **Job** | Job postings with requirements and details |
| **Application** | Job applications with status tracking |
| **CandidateReview** | Reviews for candidates by employers |
| **EmployerReview** | Reviews for employers by candidates |
| **Chat** | Chat room model for conversations |
| **Message** | Individual messages in chats |
| **FavoriteCandidates** | Saved candidate profiles |
| **FavoriteJobs** | Saved job postings |
| **Blog** | Blog post content |
| **BlogCategory** | Blog categories and taxonomy |
| **Subscription** | User subscription records |
| **Plan** | Subscription plan definitions |
| **Contact** | Contact form submissions |
| **FAQ** | Frequently asked questions |
| **Policy** | Terms, privacy policies |

---

## ⚠️ Error Handling

All errors are caught and handled through a global error handler middleware:

```typescript
// Centralized error response format
{
  success: false,
  message: "Error message",
  error: {
    field1: "Validation error message",
    field2: "Another error message"
  }
}
```

---

## 🔐 Authentication Flow

1. **Registration** → User provides email and password
2. **Email Verification** → OTP sent to email, user verifies
3. **Login** → Returns `access_token` and `refresh_token`
4. **Protected Routes** → Bearer token in `Authorization` header
5. **Token Refresh** → Use refresh token to get new access token
6. **Password Reset** → Email verification → New password setup

---

## 📧 Email Templates

Pre-built email templates for:
- Account verification
- Password reset
- Job application status (Applied, Accepted, Rejected, Shortlisted)
- Job status updates (Running, Completed, Stopped)
- Contact form replies
- Connection requests

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- 📧 Email: [your-email@example.com]
- 🐛 GitHub Issues: [GitHub Issues Link](https://github.com/goni715/tradiezz-backend/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/goni715/tradiezz-backend/discussions)

---

## 🙏 Acknowledgments

- Express.js community
- MongoDB & Mongoose documentation
- Stripe & Cloudinary APIs
- Socket.io for real-time functionality
- TypeScript ecosystem

---

**Built with ❤️ by the Osman Goni**

Last Updated: January 2026
