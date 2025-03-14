# Events API Documentation

## Create Event
Creates a new event and updates creator's contributions.

**Endpoint:** `POST /api/events/create`
**Auth:** Required

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "time": "string",
  "category": "string",
  "location": {
    "city": "string", 
    "address": "string"
  },
  "availability": {
    "date": "Date",
    "time": {
      "start": "string",
      "end": "string"
    },
    "capacity": {
      "totalSlots": "number",
      "filledSlots": "number"
    }
  }
}
```

**Success Response:**
- Status: 200
- Returns: Created event object

## Join Event 
Allows user to join an event.

**Endpoint:** `POST /api/events/join`
**Auth:** Required

**Request Body:**
```json
{
  "eventId": "string",
  "userId": "string"
}
```

**Success Response:**
- Status: 200
- Returns: Updated event with new attendee
- Updates user's participation metrics

## List Events
Get feed of available events.

**Endpoint:** `GET /api/events/list`
**Auth:** Required

**Query Parameters:**
- category (optional): string[]
- location (optional): string

**Success Response:**
- Status: 200
- Returns: Array of available events

## Filter Events
Filter events by specific criteria.

**Endpoint:** `GET /api/events/filter`
**Auth:** Required

**Query Parameters:**
- location: string
- category: string
- isEventAvailable: boolean

**Success Response:**
- Status: 200
- Returns: Filtered events array

## Search Events
Search events by title or description.

**Endpoint:** `GET /api/events/search`
**Auth:** Required

**Query Parameters:**
- q: string (search query)

**Success Response:**
- Status: 200
- Returns: Matching events array

## Authorization
All endpoints require valid JWT token in cookie for authentication.

## Event Model Fields
- title (required)
- description (required)
- date (default: now)
- time (required)
- category (required)
- creatorId (required, ref: User)
- location
  - city (required)
  - address (required)
- availability
  - date
  - time (start/end)
  - capacity (total/filled slots)
- attendees
- teamId (optional)
