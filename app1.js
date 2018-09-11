// var http = require("http");

// http.createServer(function(request, response) {
//     // Send the HTTP header 
//     // HTTP Status: 200 : OK
//     // Content Type: text/plain
//     response.writeHead(200, {'Content-Type': 'text/plain'});
   
//     // Send the response body as "Hello World"
//     response.end('Hello World\n');
// }).listen(8081);

// // Console will print the message
// console.log('Server running at http://127.0.0.1:8081/');


var express = require('express');
var path = require('path');
var app = express();
const bodyParser = require('body-parser')
var mysql= require('mysql');

var index = require('./routes/index');
var users = require('./routes/users');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// var admin = require('firebase-admin');

const books = require('./db')

app.get('/books', (req, res) => {
  res.json(books)
})
app.get('/books/:id', (req, res) => {
    res.json(books.find(book => book.id === req.params.id))
  })

app.post('/books', (req, res) => {
    books.push(req.body)
    res.status(201).json(req.body)
  })
  app.put('/books/:id', (req, res) => {
    const updateIndex = books.findIndex(book => book.id === req.params.id)
    res.json(Object.assign(books[updateIndex], req.body))
  })

  app.delete('/books/:id', (req, res) => {
    const deletedIndex = books.findIndex(book => book.id === req.params.id)
    books.splice(deletedIndex, 1)
    res.status(204).send()
 })

 var mysql = require("mysql");
 //Database connection
 app.use(function(req, res, next){
	global.connection = mysql.createConnection({
	  	host     : 'localhost',
          user     : 'admin',
          password:"1234",
  		database : 'donate'
	});
	connection.connect();
	next();
});
 app.use('/', index);
 app.use('/api/v1/users', users);
 
 
//  // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   });
  
  
  
//   // error handler
//   app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//   });


//import 
// var mysql = require('mysql');

//create connection
// var con = mysql.createConnection({
//     host:"localhost",
//     user:"admin",
//     password:"1234",
//     database:"donate"
// });

//connect DB
// con.connect(function(err){
//     if(err)throw err;
//     console.log("Connected!");
// });



// var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://vuejstutorial-9bc95.firebaseio.com"
// });


 
app.use(express.static(__dirname + '/input'));
// ฟังค์ชัน สำหรับรับ request จาก client และส่ง response กลับไปยัง client
// req คือ request และ res คือ response
// res.send('') คือการส่ง response กลับไป
// function getHomePage(req, res) {
//     res.send('<h1>This is homepage.</h1>');
// }

app.get('/',function(req, res){
    res.sendFile(path.join(__dirname,'/input/index.html'));

});



 
// รับ request จาก client เมื่อ access เข้าหน้า /about และส่ง response กลับ
function getAboutPage(req, res) {
    res.send('<h1>This is about page.</h1>');
}
 
// เมื่อ client เข้าถึงหน้า Home Page ของเว็บไซต์ http://localhost:5555/
// app.get(URL, getHomePage)
// URL - คือ PATH ของเว็บไซต์
// getHomePage คือ callback function ที่มี request และ response
// app.get('/', getHomePage);
 
// call ฟังค์ชัน getAboutPage เมื่อ client เข้าถึงหน้าเว็บ /about
app.get('/about', getAboutPage);
 
// start server ด้วย port 5555
var server = app.listen(8081, function() {
    console.log('Express is running on port 8081.');
});