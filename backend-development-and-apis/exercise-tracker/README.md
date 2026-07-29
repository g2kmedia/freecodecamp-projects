# Exercise Tracker

A RESTful API microservice for tracking exercises built as part of the [FreeCodeCamp Back End Development and APIs certification](https://www.freecodecamp.org/learn/back-end-development-and-apis). This project allows users to create accounts and log their exercise activities with detailed tracking capabilities.

## Features

- Create and manage user accounts
- Add exercise entries with description, duration, and optional date
- Retrieve complete exercise logs with filtering options
- View all registered users

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling

## API Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| POST | `/api/users` | Create new user | `username` (form data) |
| GET | `/api/users` | Get all users | - |
| POST | `/api/users/:_id/exercises` | Add exercise to user | `description`, `duration`, `date` (optional) |
| GET | `/api/users/:_id/logs` | Get user's exercise log | `from`, `to`, `limit` (all optional) |

## Installation & Setup
1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create .env file
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

3. Run the application:
```bash
npm start
```

## Project Requirements

This project fulfills all FreeCodeCamp user stories.
