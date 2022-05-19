const lib = require("./lib");
require("dotenv").config()
const mongoose = require("mongoose");   
const express = require('express')
const app = express()
const cors = require("cors");
var userModel = require("./model");
var corsOptions = {
    origin: process.env.frontend
};

const uri = process.env.MONGO_URL;

async function main() {
  await mongoose.connect(uri);
}

main()
  .then(() => console.log("Connected to database successfully"))
  .catch((err) => console.log(err));

app.use(cors(corsOptions));

const bodyparser = require('body-parser')
const multer = require('multer')


app.use(express.static("./public"))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
extended: true
}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage});

app.post('/uploadfile', upload.single("file"), (req, res) =>{
    lib.xlsxToValue('./upload/' + req.file.filename);
    // console.log(res);
});

app.get('/uploadfile', (req, res) => {
    // res.send("GET Request Called")
    userModel.find({},(err, docs) => {
      if (!err) {
          res.send({
            data: docs
          }
          );
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  })
});

let server = app.listen(process.env.port, function () {
let port = server.address().port
console.log("App listening at %s", port) 
})