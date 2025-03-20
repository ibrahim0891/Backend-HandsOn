# Backend-HandsOn API Documentation

A robust backend API service built with TypeScript and Express.js for handling services, users, teams, events, and interactions.

## Features

- User Authentication and Authorization
- Team Management
- Event Organization
- Post Management (Create, Read, Delete)
- Comment System
- Reply System
- Error Handling
- Response Standardization

## Tech Stack

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Bcrypt

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ibrahim0891/Backend-HandsOn.git
```

2. Navigate to the project directory:
```bash
cd Backend-HandsOn
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:
```bash
NODE_ENV=development
PORT=5000

# MongoDB Connection
DATABASE_URL=mongodb://localhost:27017/handson_db 

# Security
BCRYPT_SALT_ROUNDS=10
JWT_SECRET=your_jwt_secret

# OTP Configuration
OTP_EXPIRE=120
OTP_LENGTH=6

# Email Configuration
EMAIL_USER="your_email@example.com"
EMAIL_PASS="your_email_password"
```

## API Documentation

For detailed API documentation, please refer to the following module-specific documentation:

- [Authentication API Documentation](./docs/auth.docs.md)
- [User API Documentation](./docs/user.docs.md)
- [Team API Documentation](./docs/team.docs.md)
- [Team Event and Post API Documentation](./docs/team.service.docs.md)
- [Public Events API Documentation](./docs/event.docs.md) 
- [Community Help Post API Documentation](./docs/post.docs.md)

## Project Structure

```
dist/
docs/
src/
├── app/
│   ├── config/
│   ├── lib/ 
│   ├── router/
│   ├── modules/
│   │   └── Post_CHR/
│   │       ├── post.controller.ts
│   │       ├── post.service.ts
│   │       └── post.route.ts
│   ├── middleware/
│   └── utils/
├── app.ts
├── index.ts
├── server.ts
└── constants/
```

## Response Format

All API responses follow a consistent format:

```json
{
  "statusCode": number,
  "success": boolean,
  "message": string,
  "data": object | array | null
}
```

## Error Handling

The API implements a standardized error handling mechanism with appropriate HTTP status codes and descriptive messages.

