#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=salon --tuples-only --no-align --quiet -c"

echo -e "\n~~~~~ BEST HAIR SALON ~~~~~\n"
echo -e "Welcome, how can I help you?\nPlease choose the number for the service you would like.\n"

# Fetch all services once and store them
SERVICES=$($PSQL "SELECT service_id, name FROM services")

# Display all of the options for services
MAIN_MENU() {
  echo "$SERVICES" | while IFS="|" read SERVICE_ID NAME
  do 
    echo "$SERVICE_ID) $NAME"
  done

  # Add extra space at the bottom
  echo ""
}

# Create an appointment for the customer
CREATE_APPOINTMENT() {
  echo -e "\nWhat time would you like your cut, $CUSTOMER_NAME?"

  read SERVICE_TIME
  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE' AND name = '$CUSTOMER_NAME'")
  $PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')"

  SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $SERVICE_ID_SELECTED")
  echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
}

# Check if the customer exists based on phone number and add the date in case of a new customer
GET_CUSTOMER_INFO() {
  echo -e "\nWhat's your phone number?"
  read CUSTOMER_PHONE

  if [[ ! "$CUSTOMER_PHONE" =~ ^[0-9-]+$ ]]; then
    echo -e "\nInvalid phone number. Please enter only numbers and dashes."

    echo -e "\nWhat's your phone number?"
    read CUSTOMER_PHONE
  fi

  CUSTOMER_EXISTS=$($PSQL "SELECT * FROM customers WHERE phone = '$CUSTOMER_PHONE'")

  if [[ "$CUSTOMER_EXISTS" ]]; then
    CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")
    CREATE_APPOINTMENT
  else
    echo -e "\nYou seem to be a new customer. What's your name?"
    
    read CUSTOMER_NAME
    $PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')"

    CREATE_APPOINTMENT
  fi
}

# Call MAIN_MENU upon launch and get the user's input
MAIN_MENU
read SERVICE_ID_SELECTED

# Check if the service exists
SERVICE_EXISTS=$($PSQL "SELECT service_id FROM services WHERE service_id = '$SERVICE_ID_SELECTED'")

if [[ "$SERVICE_EXISTS" ]]; then
  GET_CUSTOMER_INFO
else
  echo -e "\nCouldn't find that service.\n"
  MAIN_MENU
fi