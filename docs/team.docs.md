# Teams API Documentation

## Team Management

### Create Team
Creates a new team.

**Endpoint:** `POST /api/teams/create`
**Auth:** Required

**Request Body:**
```json
{
  "name": "string",
  "membershipType": "public" | "private",
  "members": ["userId"],
  "description": "string"
}
```

**Success Response:**
- Status: 201
- Returns: Created team object

### Invite Users
Invite users to join a team.

**Endpoint:** `POST /api/teams/invite`
**Auth:** Required

**Request Body:**
```json
{
  "teamId": "string",
  "invitedUsers": ["userId"]
}
```

**Success Response:**
- Status: 200
- Returns: Updated team with invited members

### Join Team
Join a team (public or with invitation).

**Endpoint:** `POST /api/teams/join`
**Auth:** Required

**Request Body:**
```json
{
  "teamId": "string",
  "userId": "string"
}
```

**Success Response:**
- Status: 200
- Returns: Updated team members list

### Leave Team
Leave a team.

**Endpoint:** `POST /api/teams/leave`
**Auth:** Required

**Request Body:**
```json
{
  "teamId": "string",
  "userId": "string"
}
```

### Delete Invitation
Remove pending team invitation.

**Endpoint:** `DELETE /api/teams/invitation`
**Auth:** Required
