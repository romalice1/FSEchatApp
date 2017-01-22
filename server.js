/* Initial declarations */
var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var bodyParser = require("body-parser");
var path  = require('path');

/** connect to MySQL*/
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'fse',
  password: 'fse',
  database: 'fsechat'
})
connection.connect();

// var logger = function(request, response, next){
// 	console.log('Logging...');
// 	next();
// }
// app.use(logger);

/** view engine **/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/** Body parser middleware **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/** set static path **/
app.use(express.static(path.join(__dirname, 'public')));

/** Routes **/
// welcome page
app.get("/", function(req, res){
	//response.send('Hello world');
	//response.json(people);
	res.render('index');
});

// user lands on homepage
app.post("/home", function(req, res){
	//Query from the db and display messages
	connection.query("SELECT name, message, time FROM chats ORDER BY chats.time DESC", function (err, rows, fields) {
	  if (err){
	  	console.log(err);
	  }else{
	  	//send to client's browser
	  	res.render('chat', { 
	  		items: rows,  
	  		'chat_name' : req.body.chat_name,
	  	});
	  	console.log('Results available from mysql');
	  }
	  
	});
});

/**** Socket.io *************************/
//Whenever anyone connects
io.on('connection', function(socket){

  console.log('User connected');

  //disconnect
  socket.on('disconnect', function () {
    console.log('User disconnected');
  });

  //send message
  socket.on('send message', function(data){
  	io.sockets.emit('new message', data);
  	console.log(data.name);

  	//save to db
  	//data = {name: 'name', message:'message', time: 'time'};
  	connection.query('INSERT INTO chats SET ?', data, function (err, rows, fields) {
	  if (err){
	  	console.log(err);
	  }else{
	  	console.log('Rows inserted');
	  	console.log(rows);
	  }
	});
  });



});
/*****************************************/

server.listen(4000, function(){
	console.log('Server started on port 3000...');
});