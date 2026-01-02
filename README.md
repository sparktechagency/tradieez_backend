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
PORT=5000

# Database
DATABASE_URL=your_database_url

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
CLIENT_URL=http://localhost:3000
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
