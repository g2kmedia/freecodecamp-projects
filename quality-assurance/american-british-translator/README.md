# American British Translator

A web application that translates text between American and British English using predefined dictionaries. Built as part of the [freeCodeCamp Quality Assurance certification](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/american-british-translator).

## Features

- **Bidirectional Translation**: Translate between American and British English
- **Comprehensive Dictionary**: Covers 2,131 words and phrases across multiple categories
- **Spelling Differences**: Handles common spelling variations (color/colour, favorite/favourite)
- **Title Translations**: Converts titles and honorifics (Mr./Mr, Dr./Dr)
- **Time Format Conversion**: Translates time formats (12:30 ↔ 12.30)
- **Phrase Translation**: Handles multi-word expressions and idioms
- **Highlight Changes**: Visual highlighting of translated words in output
- **RESTful API**: Complete translation API

## API Endpoint

- `POST /api/translate` - Translate text between American and British English

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS
- **Testing**: Chai, Mocha
- **Environment**: dotenv for configuration management

## Translation Categories

The translator uses four specialized dictionaries:

- **american-only.js** (183 words/phrases) - Terms unique to American English
- **british-only.js** (243 words/phrases) - Terms unique to British English  
- **american-to-british-spelling.js** (1,699 words) - Common spelling differences
- **american-to-british-titles.js** (6 titles) - Honorifics and titles

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
- **Unit Tests**: Testing translation logic and dictionary functions
- **Functional Tests**: Testing API endpoints and error handling

## Translation Examples

| American English | British English |
|------------------|-----------------|
| color, favorite | colour, favourite |
| Mr., Dr. | Mr, Dr |
| 12:30, 3:15 | 12.30, 3.15 |
| trash can | rubbish bin |
| apartment | flat |

## Error Handling

The API handles various error cases:

- **Missing fields**: `{ error: 'Required field(s) missing' }`
- **Empty text**: `{ error: 'No text to translate' }`
- **Invalid locale**: `{ error: 'Invalid value for locale field' }`
- **No translation needed**: `"Everything looks good to me!"`

## freeCodeCamp Requirements

This project fulfills all freeCodeCamp requirements.
