#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

# Inserting data from 'games.csv'
# Inserting data to 'teams' table
while IFS="," read -r year round winner opponent winner_goals opponent_goals # defining the columns
do
  # Skip header row
  if [[ $opponent != "opponent" ]]
  then
    $PSQL "INSERT INTO teams(name) VALUES('$opponent') ON CONFLICT (name) DO NOTHING"
    $PSQL "INSERT INTO teams(name) VALUES('$winner') ON CONFLICT (name) DO NOTHING"
  fi
done < games.csv

echo -e "\nInserted all unique teams from columns 'opponent' and 'winner'.\n"

# Inserting data to 'games' table
while IFS="," read -r year round winner opponent winner_goals opponent_goals # defining the columns
do
  # Skip header row
  if [[ $opponent != "opponent" ]]
  then
    $PSQL "INSERT INTO games (year, round, winner_id, opponent_id, winner_goals, opponent_goals)
          VALUES ($year, '$round',
                  (SELECT team_id FROM teams WHERE name='$winner'),
                  (SELECT team_id FROM teams WHERE name='$opponent'),
                  $winner_goals, $opponent_goals);"
  fi
done < games.csv

echo -e "\nInserted all games.\n"