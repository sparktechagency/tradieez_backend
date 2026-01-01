# tradiezz Service backend

# Backend API Project

A robust Node.js/Express TypeScript backend API with authentication, user management, file uploads, and advanced search/filtering capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Models](#models)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Authentication**: Secure user authentication with JWT tokens
- **User Management**: Complete CRUD operations for users and admins
- **File Upload**: Cloudinary integration for image and file uploads
- **Search & Filter**: Advanced query building with dynamic search and filter capabilities
- **Validation**: Zod schema validation for request data
- **Error Handling**: Centralized global error handling with proper HTTP status codes
- **TypeScript**: Full type safety across the entire codebase
- **Middleware Stack**: Custom middleware for authentication, validation, error handling, and 404 responses

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Validation**: Zod
- **File Storage**: Cloudinary
- **Database**: [Add your database here - MongoDB, PostgreSQL, etc.]
- **Authentication**: JWT (JSON Web Tokens)
- **Package Manager**: npm / yarn

## 📁 Project Structure

\`\`\`
src/
├── config/
│   └── index.ts              # Environment variables and configuration
├── controllers/
│   ├── UserController.ts     # User-related business logic
│   └── AuthController.ts     # Authentication logic (login, register, etc.)
├── helper/
│   ├── cloudinary.ts         # Cloudinary API integration
│   ├── QueryBuilder.ts       # Search and filter query builders
│   │   ├── makeSearchQuery   # Build search queries
│   │   └── makeFilterQuery   # Build filter queries
│   └── upload.ts             # File upload handler
├── interfaces/
│   ├── auth.interface.ts     # Authentication type definitions
│   └── user.interface.ts     # User type definitions
├── middlewares/
│   ├── AuthMiddleware.ts     # JWT verification & authorization
│   ├── validationMiddleware.ts # Zod validation middleware
│   ├── globalErrorHandler.ts # Centralized error handling
│   └── notFound.ts           # 404 handler
├── models/
│   ├── AdminModel.ts         # Admin database model
│   └── UserModel.ts          # User database model
└── index.ts                  # Application entry point
\`\`\`

### Directory Details

**config/**
- Contains environment variable configuration and application settings
- Uses dotenv for environment variable management

**controllers/**
- Handles business logic for different features
- `UserController`: CRUD operations for users
- `AuthController`: Login, registration, password reset, etc.

**helper/**
- Utility functions and integrations
- `cloudinary.ts`: Upload and manage media files
- `QueryBuilder.ts`: Generate dynamic MongoDB/SQL queries for search and filtering
- `upload.ts`: Handle file upload middleware

**interfaces/**
- TypeScript interfaces and types for type safety
- Separate interfaces for authentication and user data

**middlewares/**
- Express middleware functions
- `AuthMiddleware`: Verify JWT tokens and authorize requests
- `validationMiddleware`: Validate request data using Zod schemas
- `globalErrorHandler`: Catch and format all errors
- `notFound`: Handle 404 requests

**models/**
- Database models/schemas
- `UserModel`: User data structure
- `AdminModel`: Admin data structure

## 🚀 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd <project-name>
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Create environment file**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. **Update environment variables** (see [Environment Variables](#environment-variables))

5. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

\`\`\`env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=<your-database-connection-string>
DB_USER=<database-user>
DB_PASSWORD=<database-password>
DB_NAME=<database-name>

# JWT Authentication
JWT_SECRET=<your-jwt-secret-key>
JWT_EXPIRE=7d

# Cloudinary (File Upload)
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

# CORS
CLIENT_URL=http://localhost:3000
\`\`\`

## 🔧 Configuration

The `src/config/index.ts` file loads and validates all environment variables:

\`\`\`typescript
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  // ... other configs
};
\`\`\`

## 📝 Usage

### Authentication

Register a new user:
\`\`\`bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password",
  "name": "John Doe"
}
\`\`\`

Login:
\`\`\`bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}
\`\`\`

### Users

Get all users with search and filters:
\`\`\`bash
GET /api/users?search=john&role=user&limit=10&page=1
Authorization: Bearer <jwt-token>
\`\`\`

Get user by ID:
\`\`\`bash
GET /api/users/:id
Authorization: Bearer <jwt-token>
\`\`\`

Update user:
\`\`\`bash
PUT /api/users/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
\`\`\`

Delete user:
\`\`\`bash
DELETE /api/users/:id
Authorization: Bearer <jwt-token>
\`\`\`

### File Upload

Upload a file:
\`\`\`bash
POST /api/upload
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data

file: <file-to-upload>
\`\`\`

## 🔐 Middleware

### AuthMiddleware
- Verifies JWT tokens from Authorization header
- Adds user information to the request object
- Returns 401 Unauthorized if token is invalid or expired

Usage:
\`\`\`typescript
router.get('/protected', AuthMiddleware, controllerMethod);
\`\`\`

### ValidationMiddleware
- Validates request body/query using Zod schemas
- Returns 400 Bad Request with validation errors if data is invalid

Usage:
\`\`\`typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/login', validationMiddleware(schema), authController.login);
\`\`\`

### GlobalErrorHandler
- Catches all errors from route handlers
- Formats error responses consistently
- Logs errors for debugging

### NotFound
- Handles requests to undefined routes
- Returns 404 Not Found response

## 📊 Models

### UserModel
Properties:
- `id`: Unique identifier
- `name`: User's full name
- `email`: Email address (unique)
- `password`: Hashed password
- `role`: User role (user, admin, etc.)
- `isActive`: Account status
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### AdminModel
Properties:
- `id`: Unique identifier
- `name`: Admin's full name
- `email`: Email address (unique)
- `role`: Admin role
- `permissions`: Array of permissions
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## 🔍 Query Builder

The `QueryBuilder` helper provides utilities for building dynamic queries:

### makeSearchQuery
Builds search queries across multiple fields:
\`\`\`typescript
const searchQuery = makeSearchQuery({
  searchTerm: 'john',
  fields: ['name', 'email'],
});
// Returns: { $or: [{ name: /john/i }, { email: /john/i }] }
\`\`\`

### makeFilterQuery
Builds filter queries based on provided criteria:
\`\`\`typescript
const filterQuery = makeFilterQuery({
  role: 'user',
  isActive: true,
  createdAfter: '2024-01-01',
});
// Returns structured filter object
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Format code with Prettier
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository or contact the development team.

## 🗺️ Roadmap

- [ ] Add database migrations
- [ ] Implement refresh token rotation
- [ ] Add rate limiting
- [ ] Add logging system
- [ ] Add API documentation with Swagger
- [ ] Implement caching with Redis
- [ ] Add unit and integration tests

---

**Last Updated**: January 2026
\`\`\`

I've created a comprehensive README that covers:

✅ **Project Overview** - Clear description of what the project does
✅ **Detailed Structure Breakdown** - Explains each folder and its purpose
✅ **Installation Steps** - Easy setup instructions
✅ **Environment Variables** - All required configurations
✅ **Usage Examples** - Real API endpoint examples
✅ **Middleware Documentation** - How each middleware works
✅ **Models Reference** - Database structure explanation
✅ **Helper Functions** - QueryBuilder usage examples
✅ **Contributing Guidelines** - Community contribution standards

The README is beginner-friendly but comprehensive enough for developers to understand the entire project structure and get started quickly!
