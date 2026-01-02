# Tradiezz Service Backend

A production-ready Node.js/Express TypeScript backend with authentication, user management, file uploads, and advanced search/filtering.

## 📋 Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start development server
npm run dev
```

## 🛠 Tech Stack

- **Language**: TypeScript
- **Framework**: Express.js
- **Validation**: Zod
- **Authentication**: JWT
- **File Storage**: Cloudinary
- **Package Manager**: npm / yarn

## 📁 Project Structure

```
src/
├── config/
│   └── index.ts                    # Environment variables & configuration
│
├── controllers/
│   ├── AdminController.ts          # Admin added, deleted, updated by Super Admin
│   ├── ApplicationController.ts    # Job Applications Management
│   └── AuthController.ts           # Login, Register, Password reset
│   └── BlogCategoryController.ts   # Blog Category CRUD operations
│   ├── UserController.ts           # Employer & Candidate management
│
├── helper/
│   ├── cloudinary.ts               # Cloudinary integration
│   ├── QueryBuilder.ts             # Search & Filter query builders
│   └── upload.ts                   # File upload handler
│
├── interfaces/
│   ├── auth.interface.ts           # Auth type definitions
│   └── user.interface.ts           # User type definitions
│
├── middlewares/
│   ├── AuthMiddleware.ts           # JWT verification & authorization
│   ├── validationMiddleware.ts     # Zod validation
│   ├── globalErrorHandler.ts       # Centralized error handling
│   └── notFound.ts                 # 404 handler
│
├── models/
│   ├── AdminModel.ts               # Admin schema/model
│   └── UserModel.ts                # User schema/model
│
└── server.ts                         # Application entry point
```

## ⚙️ Environment Variables

Create a `.env` file:

```env
# Server
NODE_ENV=development
PORT=8080
DATABASE_URL=your_database_url
BCRYPT_SALT_ROUNDS=number_of_salt_rounds

# JWT
JWT_VERIFY_EMAIL_SECRET=your_jwt_verify_email_secret
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_VERIFY_EMAIL_EXPIRES_IN=10m
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=15d

# SMTP (Email)
SMTP_USERNAME=your_smtp_email -- example@gmail.com
SMTP_PASSWORD=your_smtp_password -- app password
SMTP_FROM=your_smtp_from_email -- <example@gmail.com>

# Admin
SUPER_ADMIN_EMAIL=your_super_admin_email
SUPER_ADMIN_PASSWORD=your_super_admin_password
SUPER_ADMIN_REG_OTP=your_admin_registration_otp
ADMIN_DEFAULT_PASSWORD=your_default_admin_password

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET_KEY=your_cloudinary_api_secret

# Frontend
FRONTEND_URL=http://localhost:3000

```

## 🔐 Authentication

### Register
```bash
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Login
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

## 👥 User Endpoints

```bash
# Get all users (with search & filters)
GET /api/users?search=john&role=user&limit=10&page=1
Authorization: Bearer <token>

# Get user by ID
GET /api/users/:id
Authorization: Bearer <token>

# Update user
PUT /api/users/:id
Authorization: Bearer <token>

# Delete user
DELETE /api/users/:id
Authorization: Bearer <token>
```

## 📤 File Upload

```bash
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <your-file>
```

## 🔧 Middleware

| Middleware | Purpose |
|------------|---------|
| **AuthMiddleware** | Verify JWT tokens & authorize requests |
| **validationMiddleware** | Validate request data with Zod schemas |
| **globalErrorHandler** | Centralized error handling & formatting |
| **notFound** | Handle 404 requests |

### Usage Example
```typescript
router.post(
  '/login', 
  validationMiddleware(loginSchema),
  authController.login
);
```

## 🔍 Query Builder

Build dynamic search and filter queries:

```typescript
// Search across multiple fields
makeSearchQuery({
  searchTerm: 'john',
  fields: ['name', 'email']
});

// Filter by criteria
makeFilterQuery({
  role: 'user',
  isActive: true
});
```

## 📊 Database Models

### User
- `id`: Unique identifier
- `name`: Full name
- `email`: Email (unique)
- `password`: Hashed password
- `role`: User role
- `isActive`: Account status
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Admin
- `id`: Unique identifier
- `name`: Admin name
- `email`: Email (unique)
- `role`: Admin role
- `permissions`: Array of permissions
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## 🚀 Development

```bash
# Install
npm install

# Dev mode (with auto-reload)
npm run dev

# Build
npm run build

# Production
npm start
```

## 📝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

MIT License - See LICENSE file for details

---

**Last Updated**: January 2026
