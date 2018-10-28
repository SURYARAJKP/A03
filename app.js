const path = require("path")
const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser") // simplifies access to request body
const fs = require('fs')  // NEW - this is required
const app = express()  // make express app
const http = require('http').Server(app)  // inject app into the server

// ADD THESE COMMENTS AND IMPLEMENTATION HERE 
// 1 set up the view engine
// 2 manage our entries
// 3 set up the logger
// 4 handle valid GET requests
// 5 handle valid POST request (not required to fully work)
// 6 respond with 404 if a bad URI is requested

// Listen for an application request on port 8081

// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")) // path to views
app.set("view engine", "ejs") // specify our view

// 2 include public assets and use bodyParser
// Node uses __dirname for the The directory name of the current module.

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// 3 set up the logger
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));


// 4 handle valid GET requests
app.get("/", function (req, res) {
 //res.sendFile(path.join(__dirname + '/assets/index.html'))
 res.render("Index.ejs")
})
app.get("/index", function (req, res) {
  res.render("Index.ejs")
 })
 
// 4 http GET /calculator
app.get("/calculator", function (req, res) {
 res.render("calculator.ejs")
})

// 4 http GET /ContactUs
app.get("/ContactUs", function (req, res) {
 res.render("ContactUs.ejs")
})

app.get("/aboutus", function (req, res) {
 res.render("about-us.ejs")
})



 



// 5 handle valid POST request
app.post("/ContactUs.html", function (req, res) {
  var api_key = '9dc39d3715386b89dc8aead0e6adaaa9-4836d8f5-c394ac64';
  var domain = 'sandbox0d2aa3be8dde4182aff8f494e27085a0.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
   
  var data = {
    from: 'cal App user<postmaster@sandbox1efc7e9a2bb247e89ea29eaaa62ff931.mailgun.org>',
    to: 'suryarajkp@gmail.com',
    subject: req.body.firstname + " Sent you a message",
    text: req.body.subject
  };
   
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if(!error){
      res.send("Mail sent");
    }
    else{
      res.send("Not send");
    }
  });


 })



app.listen(port, function () {
 console.log('Web app started and listening on http://localhost:' + port)
})

// Listen for an application request on designated port
app.listen(process.env.PORT, function () {
 console.log('Web app started and listening on http://localhost:' + port)
})

