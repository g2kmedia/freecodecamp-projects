# Salon Appointment Scheduler

An interactive Bash program that uses PostgreSQL to manage salon services, customers, and appointments, built as part of the [**FreeCodeCamp Relational Database Certification**](https://www.freecodecamp.org/learn/relational-database/).

## About

This command-line application allows customers to book appointments at a salon by selecting from available services, providing their contact information, and choosing their preferred appointment time. The system automatically manages customer records and tracks all appointments in a PostgreSQL database.

## Features

- **Interactive service selection**: Browse numbered list of available salon services
- **Customer management**: Automatic customer registration for new clients
- **Appointment booking**: Schedule appointments with preferred times
- **Data persistence**: All customer and appointment data stored in PostgreSQL

## Tech Stack

- **Database**: PostgreSQL
- **Scripting**: Bash

## 🚀 How to Run
1. **Set up PostgreSQL database:** `psql --username=freecodecamp --dbname=postgres < salon.sql`.
1. **Make the script executable:** `chmod +x salon.sh`.
1. **Run the appointment scheduler:** `./salon.sh`.

## freeCodeCamp Requirements

This project fulfills all freeCodeCamp requirements.
