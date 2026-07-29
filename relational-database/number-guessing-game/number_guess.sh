#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -q -c"

# Add new user to DB
add_new_user() {
  local username="$1"
  
  if [[ ${#username} -le 22 && "$username" =~ ^[^[:space:]]+$ ]]; then
    $PSQL "INSERT INTO users(username) VALUES('$username')"
    $PSQL "INSERT INTO best_games(username) VALUES('$username')"
    echo -e "\nWelcome, $username! It looks like this is your first time here."
    return 0
  else
    echo -e "\nPlease enter a username that does not contain empty spaces and is no longer than 22 characters."
    return 1
  fi
}

# Check if the user exists
get_user() {
  local username
  local selected_username
  local user
  local games_played
  local best_game
  
  echo "Enter your username:"
  read username
  
  selected_username=$($PSQL "SELECT users.username, games_played, best_game FROM users JOIN best_games ON users.username=best_games.username WHERE users.username='$username'")
  
  if [[ -z $selected_username ]]; then
    add_new_user "$username"
    if [[ $? -eq 0 ]]; then
      USERNAME="$username"
      return 0
    else
      get_user  # Try again if username was invalid
    fi
  else
    IFS="|" read user games_played best_game <<< "$selected_username"
    echo -e "\nWelcome back, $user! You have played $games_played games, and your best game took $best_game guesses."
    USERNAME="$user"
    return 0
  fi
}

# Update user stats after game
update_user_stats() {
  local username="$1"
  local guesses="$2"
  
  # Update games played
  $PSQL "UPDATE users SET games_played = games_played + 1 WHERE username='$username'"
  
  # Get current best game
  local current_best=$($PSQL "SELECT best_game FROM best_games WHERE username='$username'")
  
  # Update best game if this game was better or it's their first game
  if [[ $current_best -eq 0 || $guesses -lt $current_best ]]; then
    $PSQL "UPDATE best_games SET best_game=$guesses WHERE username='$username'"
  fi
}

# Validate if input is a valid integer
is_valid_number() {
  if [[ "$1" =~ ^[0-9]+$ ]]; then
    return 0
  else
    return 1
  fi
}

# Main game function
play_game() {
  local number_to_guess=$(( RANDOM % 1000 + 1 ))
  local number_of_guesses=0
  local user_guess
  
  echo -e "\nGuess the secret number between 1 and 1000:"
  
  while true; do
    read user_guess
    
    if ! is_valid_number "$user_guess"; then
      echo "That is not an integer, guess again:"
      continue
    fi
    
    ((number_of_guesses++))
    
    if [[ $user_guess -eq $number_to_guess ]]; then
      echo "You guessed it in $number_of_guesses tries. The secret number was $number_to_guess. Nice job!"
      update_user_stats "$USERNAME" $number_of_guesses
      break
    elif [[ $user_guess -gt $number_to_guess ]]; then
      echo "It's lower than that, guess again:"
    elif [[ $user_guess -lt $number_to_guess ]]; then
      echo "It's higher than that, guess again:"
    fi
  done
}

# Main program
main() {
  get_user
  play_game
}

# Start the program
main
