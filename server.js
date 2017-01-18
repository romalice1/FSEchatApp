/* Initial declarations */
var express = require("express");
var bodyParser = require("body-parser");
var path  = require('path');

var app = express();

/** connect to MySQL*/
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'fse',
  password: 'fse',
  database: 'fsechat'
})

connection.connect();

var logger = function(request, response, next){
	console.log('Logging...');
	next();
}
app.use(logger);

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

// chat window
app.post("/home", function(req, res){
	//set 'message' to null to be able to handle it
	res.render('chat', {
		'chat_name' : req.body.chat_name,
		'message' : null 
	});
});

// message is posted
app.post('/post', function(req, res){
	var timestamp = new Date();
	var timeString = timestamp.getHours()+':'+timestamp.getMinutes()+':'+timestamp.getSeconds();
	
	var messagejson = {
		'chat_name' : req.body.chat_name,
		'message' : req.body.message,
		'timestamp' : timeString
	};
	
	 var chat_name = req.body.chat_name;
	 var message = req.body.message;
	 var post = {name: chat_name, message: message};
	//save it to database
	connection.query("INSERT INTO chats SET ?", post, function (err, rows, fields) {
	  if (err){
	  }else{
	  	console.log('Rows inserted');
	  }
	  
	})

	res.render('chat', messagejson);
});

/** server listen **/
app.listen(3000, function(){
	console.log('Server started on port 3000...');
});

connection.end();