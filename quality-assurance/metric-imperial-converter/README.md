# Metric-Imperial Converter

An application that converts between metric and imperial units. This project is part of the [freeCodeCamp Quality Assurance certification](https://www.freecodecamp.org/learn/quality-assurance/).

## Project Overview

This application provides a REST API for converting between different measurement systems:
- **Volume**: Gallons (gal) ↔ Liters (L)
- **Weight**: Pounds (lbs) ↔ Kilograms (kg)  
- **Distance**: Miles (mi) ↔ Kilometers (km)

## Features

- Convert between metric and imperial units
- Support for decimal numbers, fractions, and mixed fractions (e.g., `5`, `1/2`, `2.5/6`)
- Comprehensive unit and functional testing
- RESTful API design

## API Usage

| Endpoint | Method | Description | Example |
|----------|--------|-------------|---------|
| `/api/convert?input={number}{unit}` | GET | Converts the input value from one unit to another | `/api/convert?input=4gal` |

### Input Examples

| Input Type | Example | Description |
|------------|---------|-------------|
| Whole number | `input=5mi` | Converts 5 miles |
| Decimal | `input=3.5kg` | Converts 3.5 kilograms |
| Fraction | `input=1/2lbs` | Converts 0.5 pounds |
| Mixed fraction | `input=2.5/6gal` | Converts 2.5/6 gallons |
| Unit only | `input=L` | Defaults to 1 liter |

### Response Format

| Status | Response | Example |
|--------|----------|---------|
| Success | JSON with conversion data | `{"initNum": 4, "initUnit": "gal", "returnNum": 15.14164, "returnUnit": "L", "string": "4 gallons converts to 15.14164 liters"}` |
| Invalid number | Error message | `{"error": "invalid number"}` |
| Invalid unit | Error message | `{"error": "invalid unit"}` |
| Both invalid | Error message | `{"error": "invalid number and unit"}` |


## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework

### Testing
- **Mocha** - Testing framework
- **Chai** - Assertion library

## Getting Started

1. **Install dependencies**
```bash
npm install
```

2. **Start the application**
```bash
npm start
```

3. **Run tests**
```bash
npm test
```

OR

Setup the `.env` file with `NODE_ENV=test`, which will execute the tests automatically on app start.

## Testing

The project includes comprehensive testing:

**Unit Tests** (`tests/1_unit-tests.js`):
- Number parsing and validation
- Unit validation and conversion
- String formatting

**Functional Tests** (`tests/2_functional-tests.js`):
- API endpoint functionality
- Error handling
- Response format validation

## Project Requirements

This project fulfills all FreeCodeCamp user stories.
