# User API Documentation

## User Model Schema
```json
{
    "firstname": "String (required)",
    "lastname": "String (required)",
    "email": "String (required)",
    "password": "String (hashed)",
    "skills": "String[]",
    "causedSupport": "String[]",
    "isEmailVerified": "Boolean (default: false)",
    "location": {
        "city": "String (required)",
        "address": "String (required)"
    },
    "points": "Number (default: 0)",
    "volunteerHistory": [{
        "eventId": "ObjectId",
        "taskDescription": "String",
        "role": "String",
        "date": "Date"
    }],
    "contributions": {
        "eventOrganised": "Number (default: 0)",
        "eventParticipated": "Number (default: 0)",
        "causesContributed": "String[]",
        "mileStoneAchived": "String[]"
    }
}
```

## Endpoints

### Update User Profile
**POST** `/user/update-profile`  
**Protected**: Yes  
**Authorization**: Bearer Token required

#### Input:
```json
{
    "firstname?": "String",
    "lastname?": "String",
    "skills?": "String[]",
    "causedSupport?": "String[]",
    "location?": {
        "city": "String",
        "address": "String"
    }
}
```

#### Output:
```json
{
    "success": true,
    "statusCode": 200,
    "message": "User profile updated successfully",
    "data": {
        // Updated user object
        // Password field excluded
    }
}
```

### Get Current User Profile
**GET** `/user/get-user-profile`  
**Protected**: Yes  
**Authorization**: Bearer Token required

#### Input: 
None (Uses authenticated user's ID)

#### Output:
```json
{
    "success": true,
    "statusCode": 200,
    "message": "User profile fetched successfully",
    "data": {
        // User object
        // Password field excluded
    }
}
```

### Get User By ID
**GET** `/user/get-user/:id`  
**Protected**: Yes  
**Authorization**: Bearer Token required

#### Input:
- id: User ID as URL parameter

#### Output:
```json
{
    "success": true,
    "statusCode": 200,
    "message": "User profile fetched successfully",
    "data": {
        // User object
        // Password field excluded
    }
}
```

## Error Responses
All endpoints return standardized error responses:

```json
{
    "success": false,
    "statusCode": 500,
    "message": "Error description",
    "data": "error"
}
```

## Security Features
- Password hashing using bcrypt
- Automatic password field exclusion in responses
- Protected routes requiring authentication
- Email verification tracking
- Points validation (non-negative values only)

The API provides comprehensive user profile management with secure authentication and data handling.