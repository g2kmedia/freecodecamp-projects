// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Timestamp API endpoint
app.get("/api/:date?", (req, res) => {
  const input = req.params.date;
  let inputToDate;

  // If no input provided, output the current time
  if (input === undefined) {
    return res.json({
      unix: Date.now(),
      utc: new Date().toUTCString()
    });
  }

    if (/^\d+$/.test(input)) {
      inputToDate = new Date(Number(input));
    } else {
      inputToDate = new Date(input);
    }

  if (isNaN(inputToDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  } else {
    return res.json({
      unix: inputToDate.getTime(),
      utc: inputToDate.toUTCString()
    });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
