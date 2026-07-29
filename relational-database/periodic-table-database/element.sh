#/bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"
USER_INPUT=$1 # Store user's input

# Check if an argument was provided
if [[ -z "$USER_INPUT" ]]; then
  echo "Please provide an element as an argument."
  exit
fi

# Display the results for the element
displayResults () {
  if [[ -z $1 ]]; then
    echo "I could not find that element in the database."
    exit
  else
    echo "$1" | while IFS="|" read ATOMIC_NUMBER SYMBOL NAME TYPE ATOMIC_MASS MELTING_POINT BOILING_POINT
    do
      echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
    done
    exit
  fi
}

# Look up if the element is in the DB and display the output

# In case of element's atomic number as input
if [[ "$USER_INPUT" =~ ^[0-9]+$ ]]; then 
  RESULT=$($PSQL "SELECT elements.atomic_number, symbol, name, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM elements JOIN properties ON elements.atomic_number=properties.atomic_number JOIN types ON properties.type_id=types.type_id WHERE elements.atomic_number=$USER_INPUT")
  displayResults $RESULT
fi

# In case of element's symbol as input
if [[ "$USER_INPUT" =~ ^[a-zA-Z]{1,2}$ ]]; then
  RESULT=$($PSQL "SELECT elements.atomic_number, symbol, name, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM elements JOIN properties ON elements.atomic_number=properties.atomic_number JOIN types ON properties.type_id=types.type_id WHERE elements.symbol='$USER_INPUT'")
  displayResults $RESULT
fi

# In case of element's name as input
if [[ "$USER_INPUT" =~ ^[a-zA-Z]{3,}$ ]]; then
  RESULT=$($PSQL "SELECT elements.atomic_number, symbol, name, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM elements JOIN properties ON elements.atomic_number=properties.atomic_number JOIN types ON properties.type_id=types.type_id WHERE elements.name='$USER_INPUT'")
  displayResults $RESULT
fi