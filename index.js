import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
dotenv.config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Define where to store the files and their naming convention
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the folder to store files
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Set the filename (original name in this case)
    cb(null, file.originalname);
  }
});

// Set up the Multer instance
const upload = multer({ storage: storage });

app.post('/api/fileanalyse', upload.single('upfile'),(req, res) => {
  const file = req.file;
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  }
  );
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
