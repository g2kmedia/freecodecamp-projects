# 🪐 Celestial Bodies Database

A comprehensive PostgreSQL database modeling our universe's celestial objects and their relationships, built as part of the [**FreeCodeCamp Relational Database Certification**](https://www.freecodecamp.org/learn/relational-database/).

## About

This project creates a normalized relational database to catalog galaxies, stars, planets, moons, and other celestial bodies. The database demonstrates proper table relationships, constraints, and data organization principles while exploring the fascinating structure of our universe.

## 🛠️ Tech Stack

- **Database**: PostgreSQL

## 🚀 How to Run

1. **Set up PostgreSQL database:** `psql --username=freecodecamp --dbname=postgres < universe.sql`.
1. **Explore the database:** `psql --username=freecodecamp --dbname=universe`.
1. **Run sample queries:**
```sql
SELECT * FROM galaxy;
SELECT * FROM star WHERE galaxy_id = 1;
SELECT * FROM planet WHERE has_life = true;
```

## freeCodeCamp Requirements

This project fulfills all freeCodeCamp requirements.
