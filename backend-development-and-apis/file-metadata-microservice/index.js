const express = require('express');
var cors = require('cors');
require('dotenv').config()
//
// Add dependencies
//
const multer  = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

//
// File Metadata API endpoint
//

// Use memory storage instead of disk storage
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// POST a file
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file

  return res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});