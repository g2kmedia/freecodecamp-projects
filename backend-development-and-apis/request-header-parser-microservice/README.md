# Request Header Parser Microservice

A simple microservice that parses HTTP request headers and returns client information in JSON format. This project is part of the [freeCodeCamp Back End Development and APIs certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/).

## About

This microservice extracts and returns key information from incoming HTTP requests, including the client's IP address, preferred language, and user agent (software) information. The service provides a single endpoint that analyzes request headers and responds with a structured JSON object containing this data.

## API Endpoint

**GET** `/api/whoami`

Returns a JSON object containing the client's request header information.

### Response Format

```json
{
    "ipaddress": "159.20.14.100",
    "language": "en-US,en;q=0.5",
    "software": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"
}
```

### Response Fields

- **ipaddress**: The client's IP address extracted from the request
- **language**: The client's preferred language from the `Accept-Language` header
- **software**: The client's user agent string from the `User-Agent` header

## Implementation Details

The microservice uses Express.js to handle HTTP requests and extracts information using.

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Start the server:**
```bash
npm start
```

3. **Visit:**
```
http://localhost:3000/
```
