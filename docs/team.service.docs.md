# Team API Documentation

## Team Management Endpoints

### Create Team
**POST** `/team/create`

**Input:**
- `name`: String (required)
- `description`: String (required)
- `membershipType`: String ("privet" or "public")

**Output:**
- Created team object with generated ID and default dashboard values

### Invite Users
**POST** `/team/invite`

**Input:**
- `teamId`: String
- `userIds`: Array of user IDs to invite

**Output:**
- Updated team object with new invitedMembers array

### Join Team
**POST** `/team/join`

**Input:**
- `teamId`: String

**Output:**
- Updated team object with user added to members array

### Leave Team
**POST** `/team/leave`

**Input:**
- `teamId`: String

**Output:**
- Updated team object with user removed from members array

### Delete Invitation
**DELETE** `/team/invitation`

**Input:**
- `teamId`: String
- `invitationId`: String

**Output:**
- Updated team object with invitation removed

## Team Events Endpoints

### Create Event
**POST** `/team/event/create`

**Input:**
- `teamId`: String
- `title`: String
- `description`: String
- `date`: Date
- `location`: String
- `category`: String

**Output:**
- Created event object and updated team with new event reference

### Join Event
**POST** `/team/event/join`

**Input:**
- `teamId`: String
- `eventId`: String
- `userId`: String

**Output:**
- Updated event object with new attendee
- Updated user contributions

### Search Events
**GET** `/team/event/search`

**Input:**
- `teamId`: String
- `searchQuery`: String (searches in title and description)

**Output:**
- Array of matching events

### Event Feed
**GET** `/team/event/feed`

**Input:**
- `teamId`: String
- `filters`: Object
  - `category`: String[]
  - `location`: String

**Output:**
- Array of filtered available events

### Filter Events
**GET** `/team/event/filter`

**Input:**
- `teamId`: String
- `filterQuery`: Object
  - `location`: String
  - `category`: String
  - `isEventAvailable`: Boolean

**Output:**
- Array of filtered events

## Team Help Posts Endpoints

### Create Help Post
**POST** `/team/help/create`

**Input:**
- `teamId`: String
- `title`: String
- `description`: String
- `tags`: Array of strings

**Output:**
- Created post object (public or private based on team type)

### Update Help Post
**PUT** `/team/help/update`

**Input:**
- `teamId`: String
- `postId`: String
- `updatedPostData`: Object

**Output:**
- Updated post object

### Delete Help Post
**DELETE** `/team/help/delete`

**Input:**
- `teamId`: String
- `postId`: String

**Output:**
- Deletion confirmation

### Get Help Post
**GET** `/team/help/get`

**Input:**
- `teamId`: String
- `postId`: String

**Output:**
- Single post object

### Search Help Posts
**GET** `/team/help/search`

**Input:**
- `teamId`: String
- `q`: String (search query for title and description)

**Output:**
- Array of matching posts

### Get User's Help Posts
**GET** `/team/help/user`

**Input:**
- `teamId`: String
- `userId`: String

**Output:**
- Array of posts created by specified user

## Authentication
All endpoints require a valid authentication token in the request header.

## Response Format
```json
{
  "success": boolean,
  "data": object | array,
  "message": string (optional)
}
```
