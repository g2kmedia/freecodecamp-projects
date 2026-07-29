# Personal Library

A web application that allows users to manage a collection of books with commenting functionality. Built as part of the [freeCodeCamp Quality Assurance certification](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/personal-library).

## Features

- **Add Books**: Submit new books with titles to the library collection
- **View All Books**: Browse the complete library with book titles, IDs, and comment counts
- **View Individual Books**: Access detailed book information including all comments
- **Add Comments**: Post comments on specific books
- **Delete Books**: Remove individual books or clear the entire library
- **RESTful API**: Full CRUD operations via API endpoints
- **Database Integration**: Persistent storage using MongoDB

## API Endpoints

- `POST /api/books` - Add a new book with title
- `GET /api/books` - Get all books with comment counts
- `GET /api/books/{id}` - Get specific book with all comments
- `POST /api/books/{id}` - Add comment to a specific book
- `DELETE /api/books/{id}` - Delete a specific book
- `DELETE /api/books` - Delete all books

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Chai, Mocha
- **Environment**: dotenv for configuration management

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- MongoDB database
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```
Create a ".env" file in the root directory. Refer to "sample.env"
```

3. Start the application:
```bash
npm start
```

## Testing

Run the test suite using `npm test` OR set `NODE_ENV=test` in `.env` to run tests automatically on application start.

## freeCodeCamp Requirements

This project fulfills all freeCodeCamp requirements.
