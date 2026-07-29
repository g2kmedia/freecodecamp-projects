# File Metadata Microservice

A simple microservice that analyzes uploaded files and returns their metadata built as part of the [FreeCodeCamp Back End Development and APIs certification](https://www.freecodecamp.org/learn/back-end-development-and-apis). This project allows users to upload files and receive detailed information about the file's properties.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - Middleware for handling file uploads
- **HTML/CSS** - Frontend interface

## API Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/` | Main upload page | - |
| POST | `/api/fileanalyse` | Analyze uploaded file | `upfile` (file upload) |

## Usage

1. Navigate to the main page.
1. Click "Choose File" to select a file from your device.
1. Click "Upload" to submit the file for analysis.
1. Receive JSON response with file metadata.

## Response Format

**Successful file upload:**
```json
{
    "name": "example.jpg",
    "type": "image/jpeg",
    "size": 2398029
}
```

**Error response (no file uploaded):**
```json
{
     "error": "No file uploaded"
}
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Run the application:
```bash
npm start
```

## Implementation Details

The microservice uses **Multer** middleware to handle multipart/form-data file uploads. When a file is uploaded via POST to `/api/fileanalyse`, the service extracts:

- **name**: Original filename
- **type**: MIME type of the file
- **size**: File size in bytes

## Project Requirements

This project fulfills all FreeCodeCamp user stories.
