# URL Shortener Microservice

A simple microservice that shortens long URLs and provides redirection to the original URLs. This project is part of the [freeCodeCamp Back End Development and APIs certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/).

## About

This microservice allows users to submit long URLs and receive shortened versions that redirect to the original URLs. The service validates URLs, stores them in a MongoDB database, and provides both shortening and redirection functionality through a RESTful API.

## API Endpoints

### **POST** `/api/shorturl`

Accepts a URL and returns a JSON object with the original URL and a shortened version.

**Request Body:**
```json
{
    "url": "https://www.example.com"
}
```

**Response Format:**
```json
{
    "original_url": "https://www.example.com",
    "short_url": 1
}
```


### **GET** `/api/shorturl/:short_url`

Redirects to the original URL associated with the provided short URL ID.

**Example:**
- Visit `/api/shorturl/1` → Redirects to `https://www.example.com`

## Features

- **URL Validation**: Only accepts properly formatted URLs with valid protocols (`http://` or `https://`)
- **Duplicate Prevention**: Returns existing short URL if the original URL has already been shortened
- **Error Handling**: Returns `{ error: "invalid url" }` for malformed or unreachable URLs
- **Database Storage**: Persists URL mappings using MongoDB with Mongoose
- **Automatic Redirection**: Short URLs automatically redirect users to the original destination

## Implementation Details

The microservice uses Express.js for routing and MongoDB for data persistence. URL validation is performed using the native `URL` constructor and DNS lookup to verify hostname accessibility. Each shortened URL receives a unique numeric identifier that serves as the short URL path.

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```
cp .env.example .env
```

Edit .env with your MongoDB connection string

3. **Start the server:**
```bash
npm start
```

4. **Visit:**
```
http://localhost:3000/
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database for URL storage
- **Mongoose** - MongoDB object modeling
