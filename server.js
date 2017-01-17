var express = require("express");
var bodyParser = require("body-parser");
var path  = require('path');

var app = express();
/*
	DATABASE INFO
	--------------
	host: 'localhost'
	user : 'fse'
	password : 'fse'
	database : 'fsechat'
	tables : 'users, chats'
*/

/*
var logger = function(request, response, next){
	console.log('Logging...');
	next();
}

app.use(logger);
*/

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set static path
app.use(express.static(path.join(__dirname, 'public')));

/*
var people = [
	{
		name : 'Peter',
		age : 22
	},
	{
		name : 'Romalice',
		age : 25
	},
	{
		name : 'Sarah',
		age : 30
	}
]
*/
// Routes
app.get("/", function(req, res){
	//response.send('Hello world');
	//response.json(people);
	res.render('index');
});
app.post("/home", function(req, res){
	res.render('chat', {
		'chat_name' : req.body.chat_name
	});
});


app.listen(3000, function(){
	console.log('Server started on port 3000...');
});