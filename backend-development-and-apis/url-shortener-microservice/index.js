require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
//
// Add more requirements
//
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dns = require("dns");



// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

//
// URL Shortener API endpoint
//
// Set up middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Define schema & model
const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: {
    type: Number,
    required: true
  }
});

const Url = mongoose.model("Url", urlSchema);

async function getNextShortUrl() {
  // Find the URL with the highest short_url value
  const highestUrl = await Url.findOne().sort('-short_url');
  
  // If no URLs exist yet, start with 1, otherwise increment the highest value
  const nextShortUrl = highestUrl ? highestUrl.short_url + 1 : 1;
  
  return nextShortUrl;
}

app.post("/api/shorturl", (req, res) => {
  try {
    let urlString = req.body.url;

    const userUrl = new URL(urlString);
    const hostname = userUrl.hostname;

    // Check if URL is valid
    dns.lookup(hostname, async (err) => {
      if (err) {
        return res.json({ error: "invalid url" });
      }

      // Add URL to DB if necessary and return results
      const existingUrl = await Url.findOne({ original_url: urlString });
      
      if (existingUrl) {
        res.json({
          original_url: existingUrl.original_url,
          short_url: existingUrl.short_url
        });
      } else {
        const newUrl = await Url.create({
          original_url: urlString,
          short_url: await getNextShortUrl()
        });

        return res.json({
          original_url: newUrl.original_url,
          short_url: newUrl.short_url
        });
      }
    });
  } catch (err) {
    return res.json({ error: "invalid url" });
  }
});

// Open short URL aka redirect short to normal URL
app.get("/api/shorturl/:id", async (req, res) => {
  const id = req.params.id;

  // Look up ID (short_url) in DB and display results
  const existingUrl = await Url.findOne({ short_url: id });

  if (existingUrl) {
    return res.redirect(existingUrl.original_url);
  } else {
    return res.json({ error: "No short URL found" });
  }

})