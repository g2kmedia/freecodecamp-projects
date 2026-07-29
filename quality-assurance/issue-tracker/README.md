# Issue Tracker

A web application that allows users to create, view, update, and delete issues for different projects. Build as part of the [freeCodeCamp Quality Assurance certification](https://www.freecodecamp.org/learn/quality-assurance/).

## Features

- **Create Issues**: Submit new issues with title, description, and assignee information
- **View Issues**: Browse all issues for a specific project with filtering capabilities
- **Update Issues**: Modify existing issues including status changes (open/closed)
- **Delete Issues**: Remove issues from the system
- **Project-based Organization**: Issues are organized by project name
- **RESTful API**: Full CRUD operations via API endpoints
- **Database Integration**: Persistent storage using MongoDB

## API Endpoints

- `POST /api/issues/{projectname}` - Create new issue
- `GET /api/issues/{projectname}` - Get all issues (with optional filtering)
- `PUT /api/issues/{projectname}` - Update issue by ID
- `DELETE /api/issues/{projectname}` - Delete issue by ID

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

Run the test suite using `npm test` OR set `NODE_ENV=test` in `.env` to run the test automatically on application start.

## freeCodeCamp Requirements

This project fulfills all freeCodeCamp requirements.
