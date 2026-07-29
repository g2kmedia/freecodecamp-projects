# Sudoku Solver

A web application that validates and solves Sudoku puzzles using a recursive backtracking algorithm. Built as part of the [freeCodeCamp Quality Assurance certification](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/sudoku-solver).

## Features

- **Puzzle Validation**: Validates Sudoku puzzle strings for correct length and valid characters
- **Automatic Solving**: Solves valid Sudoku puzzles using recursive backtracking algorithm
- **Placement Checking**: Validates number placement according to Sudoku rules
- **RESTful API**: Complete API for puzzle validation, solving, and placement checking

## API Endpoints

- `POST /api/solve` - Solve a complete Sudoku puzzle
- `POST /api/check` - Check if a number placement is valid

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS
- **Testing**: Chai, Mocha
- **Environment**: dotenv for configuration management

## Sudoku Rules

The solver implements standard Sudoku rules:
- Each row must contain digits 1-9 without repetition
- Each column must contain digits 1-9 without repetition  
- Each 3x3 region must contain digits 1-9 without repetition
- Empty cells are represented by periods (.)

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
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

The project includes:
- **12 Unit Tests**: Testing puzzle validation, placement checking, and solving logic
- **14 Functional Tests**: Testing API endpoints and error handling

## Algorithm Details

The solver uses a **recursive backtracking algorithm**:
1. Find the first empty cell in the puzzle
1. Try placing digits 1-9 in the empty cell
1. For each digit, check if placement follows Sudoku rules
1. If valid, recursively solve the remaining puzzle
1. If no valid solution found, backtrack and try next digit
1. Continue until puzzle is solved or determined unsolvable

## freeCodeCamp Requirements

This project fulfills all freeCodeCamp requirements.
