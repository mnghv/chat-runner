# API Documentation

## Overview

Chat Runner API provides endpoints for real-time chat functionality and code execution.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, the API doesn't require authentication for basic functionality.

## Endpoints

### Messages

#### GET /api/messages
Get all messages for a chat session.

**Response:**
```json
{
  "messages": [
    {
      "id": "string",
      "text": "string",
      "sender": "user" | "system",
      "type": "text" | "code",
      "code": {
        "html": "string",
        "css": "string",
        "javascript": "string"
      },
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/messages
Send a new message.

**Request Body:**
```json
{
  "text": "string",
  "sender": "user" | "system",
  "type": "text" | "code",
  "code": {
    "html": "string",
    "css": "string",
    "javascript": "string"
  }
}
```

**Response:**
```json
{
  "id": "string",
  "text": "string",
  "sender": "user" | "system",
  "type": "text" | "code",
  "code": {
    "html": "string",
    "css": "string",
    "javascript": "string"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Code Execution

#### POST /api/execute-code
Execute code in a sandboxed environment.

**Request Body:**
```json
{
  "html": "string",
  "css": "string",
  "javascript": "string"
}
```

**Response:**
```json
{
  "success": true,
  "result": "string",
  "executionTime": "number"
}
```

## WebSocket Events

### Connection
```javascript
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
});
```

### Message Events

#### Send Message
```javascript
socket.emit('send-message', {
  text: 'Hello World',
  sender: 'user',
  type: 'text'
});
```

#### Receive Message
```javascript
socket.on('receive-message', (message) => {
  console.log('New message:', message);
});
```

#### Typing Indicator
```javascript
// Send typing indicator
socket.emit('typing', { isTyping: true });

// Receive typing indicator
socket.on('user-typing', (data) => {
  console.log('User is typing:', data);
});
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object"
  }
}
```

### Common Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

- **Messages**: 100 per minute per user
- **Code Execution**: 50 per minute per user

## Code Execution Limits

- **HTML**: Max 10KB
- **CSS**: Max 10KB
- **JavaScript**: Max 10KB
- **Execution Time**: Max 5 seconds

## Security Considerations

1. **Sandbox Environment**: All code is executed in a sandboxed iframe
2. **Input Validation**: All inputs are validated and sanitized
3. **Resource Limits**: Execution time and memory usage are limited
4. **CORS**: Cross-origin requests are properly configured

## Examples

### JavaScript Client Example
```javascript
// Send a text message
const sendTextMessage = async (text) => {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      sender: 'user',
      type: 'text'
    })
  });
  
  return response.json();
};

// Send a code message
const sendCodeMessage = async (html, css, javascript) => {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: `\`\`\`html\n${html}\n\`\`\`\n\`\`\`css\n${css}\n\`\`\`\n\`\`\`javascript\n${javascript}\n\`\`\``,
      sender: 'user',
      type: 'code',
      code: { html, css, javascript }
    })
  });
  
  return response.json();
};
```

### WebSocket Client Example
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// Send message
const sendMessage = (text) => {
  socket.emit('send-message', {
    text,
    sender: 'user',
    type: 'text'
  });
};

// Listen for messages
socket.on('receive-message', (message) => {
  console.log('New message:', message);
  // Update UI with new message
});

// Listen for typing indicators
socket.on('user-typing', (data) => {
  console.log('User typing:', data);
  // Show typing indicator
});
``` 