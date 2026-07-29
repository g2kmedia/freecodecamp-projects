# World Cup Database

A comprehensive PostgreSQL database system for analyzing FIFA World Cup match data, built as part of the [**FreeCodeCamp Relational Database Certification**](https://www.freecodecamp.org/learn/relational-database/).

## About

This project involves creating a normalized database to store and analyze World Cup match results, then using SQL queries to extract meaningful statistics about teams, games, and tournament outcomes. The system processes CSV data and provides insights into World Cup history through queries.

## Features

- **Data Import System**: Automated script to populate database from the provided CSV files
- **Normalized Database Design**: Separate tables for teams and games with proper relationships
- **Comprehensive Queries**: Pre-built SQL queries for tournament analysis
- **Statistical Analysis**: Winner/opponent tracking, goal statistics, and match outcomes
- **Bash Automation**: Scripts for both data insertion and querying

## Tech Stack

- **Database**: PostgreSQL
- **Scripting/Data Processing**: Bash

## 🚀 How to Run

1. **Set up PostgreSQL database:** `psql --username=freecodecamp --dbname=postgres < worldcup.sql`.
1. **Make scripts executable:** `chmod +x insert_data.sh queries.sh`.
1. **Populate database (if needed):** `./insert_data.sh`.
1. **Run queries:** `./queries.sh`.

## 📊 Database Schema

The database consists of two main tables with a one-to-many relationship:

**Teams Table:**
- `team_id` (Primary Key, SERIAL)
- `name` (VARCHAR, UNIQUE, NOT NULL) - Team names like "France", "Croatia"

**Games Table:**
- `game_id` (Primary Key, SERIAL)
- `year` (INTEGER, NOT NULL) - Tournament year
- `round` (VARCHAR, NOT NULL) - Match round (Final, Semi-Final, etc.)
- `winner_id` (Foreign Key → teams.team_id)
- `opponent_id` (Foreign Key → teams.team_id)
- `winner_goals` (INTEGER, NOT NULL) - Goals scored by winning team
- `opponent_goals` (INTEGER, NOT NULL) - Goals scored by losing team

## freeCodeCamp Requirements

This project fulfills all freeCodeCamp requirements.
