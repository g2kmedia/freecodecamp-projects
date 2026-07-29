const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
//
// Add more requirements
//
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const req = require('express/lib/request');
const { query } = require('express');

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

//
// Exercise Tracker API endpoint
//

// Set up middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Define schema & model
const exerciseSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
const User = mongoose.model("User", userSchema);

// Create new user API endpoint
app.post("/api/users", async (req, res) => {
  const userInput = req.body.username;

  // Check if user exists
  const existingUser = await User.findOne({ username: userInput });

  if (existingUser) {
    return res.json({
      username: existingUser.username,
      _id: existingUser._id
    });
  }

  // Create new user
  const newUser = await User.create({ username: userInput });

  return res.json({
    username: newUser.username,
    _id: newUser._id
  });
});

// GET all users API endpoint
app.get("/api/users", async (req, res) => {
  const users = await User.find({}).select("username _id");
  
  const userObjects = users.map(user => ({
    username: user.username,
    _id: user._id
  }));

  return res.json(userObjects);
});

// Create exercise data API endpoint
app.post("/api/users/:_id/exercises", async (req, res) => {
  const request = req.body;

  try {
    // Check if user/_id exists
    const dbUser = await User.findById(req.params._id);

    if (!dbUser) {
      console.log("no user")
      return res.json({
        error: "User not found."
      });
    }

    const newExercise = await Exercise.create({
      username: dbUser._id,
      description: request.description,
      duration: parseInt(request.duration),
      date: request.date ? new Date(request.date) : new Date()
    });

    return res.json({
      _id: dbUser._id,
      username: dbUser.username,
      date: new Date(newExercise.date).toDateString(),
      duration: newExercise.duration,
      description: newExercise.description
    });

  } catch (error) {
    console.error("Error with POST")
    console.log(error, error.message)
    return res.json({
      error: "An error occurred while processing your request."
    });
  }

});

// Get all logs for a user
app.get("/api/users/:_id/logs", async (req, res) => {
  const userId = req.params._id;
  const { from, to, limit } = req.query;

  try {
    const selectedUser = await User.findById(userId);

    // Check if user exists
    if (!selectedUser) {
      return res.json({
        error: "User not found"
      });
    }

    // MongoDB Query
    let dbQuery = { username: userId }

    // Check if queries are available and add to db query
    if (from || to) {
      dbQuery.date = {};

      if (from) {
        dbQuery.date.$gte = new Date(from);
      }

      if (to) {
        dbQuery.date.$lte = new Date(to);
      }
    }

    // Get all tracked exercises for the user
    let getUserExercisesQuery = Exercise.find(dbQuery);

    // Limit the results if the query available
    if (limit) {
      getUserExercisesQuery = getUserExercisesQuery.limit(Number(limit));
    }

    // Execute query
    const userExercisesResults = await getUserExercisesQuery;

    // Format the resulst for the final output
    const exercisesLogOutput = userExercisesResults.map(exercise => ({
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString()
    }));

    return res.json({
      username: selectedUser.username,
      count: exercisesLogOutput.length,
      _id: selectedUser._id,
      log: exercisesLogOutput
    });

  } catch (error) {
    return res.json({
      error: "An error occurred while processing your request."
    });
  }

});