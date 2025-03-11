
## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Login
- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticate user and generate session token

#### Logout
- **URL:** `/auth/logout`
- **Method:** `POST`
- **Description:** Invalidate user session

#### Signup
- **URL:** `/auth/signup`
- **Method:** `POST`
- **Description:** Register new user account

#### Verify Email
- **URL:** `/auth/verify-email`
- **Method:** `POST`
- **Description:** Verify user email address

#### Session Verifier
- **URL:** `/auth/session-verifier`
- **Method:** `GET`
- **Description:** Validate current session status

### User Endpoints

#### Get User Profile
- **URL:** `/user/get-user-profile`
- **Method:** `GET`
- **Description:** Retrieve current user's profile

#### Update Profile
- **URL:** `/user/update-profile`
- **Method:** `PUT`
- **Description:** Update user profile information

#### Get User by ID
- **URL:** `/user/get-user/:id`
- **Method:** `GET`
- **Description:** Retrieve user profile by ID
- **Parameters:**
    - `id`: User ID

### Event Endpoints
- **Base Route:** `/event`
- **Description:** Endpoints for event management
