# Authentication API Documentation

## Login
Authenticates user and creates a session with JWT token.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Success Response:**
- Status: 200
- Sets HTTP-only cookie with JWT token
- Returns: User object with session token

**Error Responses:**
- 401: Invalid credentials
- 400: Bad request

## Sign Up (Two-Step Process)

### Step 1: Initial Registration
Sends OTP verification email to user.

**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "email": "string"
}
```

**Success Response:**
- Status: 200
- Sets HTTP-only cookie with OTP token
- Message: "Verification mail sent"

**Error Response:**
- 400: User already exists
- 500: Server error

### Step 2: OTP Verification
Verifies OTP and completes registration.

**Endpoint:** `POST /api/auth/verify`

**Request Body:**
```json
{
  "email": "string",
  "otp": "string",
  "firstname": "string",
  "lastname": "string",
  "password": "string",
  "skills": ["string"],
  "causedSupport": ["string"],
  "location": {
    "city": "string",
    "address": "string"
  }
}
```

**Success Response:**
- Status: 200
- Message: "OTP Verified"

**Error Response:**
- 401: Invalid OTP
- 400: Verification error

## Session Verification
Verifies active user session.

**Endpoint:** `GET /api/auth/verify-session`

**Success Response:**
- Status: 200
- Message: "Authorized"
- Returns: User data

**Error Response:**
- 401: Unauthorized

## Logout
Ends user session.

**Endpoint:** `POST /api/auth/logout`

**Success Response:**
- Status: 200
- Clears session cookie
- Message: "Logout successful"

## Security Features
- JWT-based authentication
- HTTP-only cookies
- OTP verification for registration
- Email verification system
- Password hashing with bcrypt
