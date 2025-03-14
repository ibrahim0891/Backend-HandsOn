# Help Posts API Documentation

## Create Post
Creates a new help post.

**Endpoint:** `POST /api/posts/create`
**Auth:** Required

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "urgencyLevel": "Low" | "Medium" | "Urgent",
  "userId": "string",
  "teamId": "string" 
}
```

**Success Response:**
- Status: 200
- Returns: Created post object

## Update Post
Updates an existing post.

**Endpoint:** `PUT /api/posts/update/:postId`
**Auth:** Required

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "urgencyLevel": "string"
}
```

**Success Response:**
- Status: 200
- Returns: Updated post

## Delete Post
Deletes a post.

**Endpoint:** `DELETE /api/posts/delete/:postId`
**Auth:** Required

**Success Response:**
- Status: 200
- Returns: Deleted post details

## Get Single Post
Retrieves a specific post.

**Endpoint:** `GET /api/posts/get/:postId`
**Auth:** Required

**Success Response:**
- Status: 200
- Returns: Post object with comments

## Search Posts
Search through posts.

**Endpoint:** `GET /api/posts/search`
**Auth:** Required

**Query Parameters:**
- q: string (search query)

**Success Response:**
- Status: 200
- Returns: Matching posts array

## Get User Posts
Get all posts by a specific user.

**Endpoint:** `GET /api/posts/get/user/:userId`
**Auth:** Required

**Success Response:**
- Status: 200
- Returns: Array of user's posts

## Add Comment
Add a comment to a post.

**Endpoint:** `POST /api/posts/comment/:postId`
**Auth:** Required

**Request Body:**
```json
{
  "comment": "string"
}
```

**Success Response:**
- Status: 200
- Returns: Updated post with new comment

## Add Reply
Add a reply to a comment.

**Endpoint:** `POST /api/posts/reply/:commentId`
**Auth:** Required

**Request Body:**
```json
{
  "reply": "string"
}
```

**Success Response:**
- Status: 200
- Returns: Updated comment with reply

## Models

### Help Post Schema
- title (required)
- description (required)
- createdAt
- updatedAt
- urgencyLevel (Low/Medium/Urgent)
- comments (array)
- userId (ref: User)
- teamId (ref: Team)

### Comment Schema
- text
- postId (ref: HelpPost)
- createdAt
- userId (ref: User)
- replies (array)
