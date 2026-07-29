# 🎮 Number Guessing Game

A terminal-based number guessing game built with Bash scripting and PostgreSQL as part of the [**FreeCodeCamp Relational Database Certification**](https://www.freecodecamp.org/learn/relational-database/).

## About

The computer generates a random number between 1 and 1000, and you try to guess it. The computer provides hints whether your guess is too high or too low until you find the correct number. All game statistics and user data are stored in a PostgreSQL database.

## Features

- User registration and login system
- Game history tracking
- Best score recording

## Tech Stack
- PostgreSQL database
- Bash shell environment
  
## 🚀 How to Run

1. Ensure PostgreSQL is installed and running.
1. Create the database: `psql --username=freecodecamp --dbname=postgres < number_guess.sql`.
1. Make the script executable: `chmod +x number_guess.sh`.
1. Run the game: `./number_guess.sh`.

## freeCodeCamp Requirements

This project fulfills all freeCodeCamp requirements.
