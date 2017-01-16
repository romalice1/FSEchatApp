/*
	server	
*/

var express = require("express");
var bodyParser = require("body-parser");
var path  = require('path');

var app = express();

/*
var logger = function(request, response, next){
	console.log('Logging...');
	next();
}

app.use(logger);
*/

//set static path
app.use(express.static(path.join(__dirname, 'public')));

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
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

//Routes
app.get("/", function(request, response){
	//response.send('Hello world');
	//response.json(people);
	response.render('index');
});

app.post('/', function(req, res){
	res.render('chat');
});

app.listen(3000, function(){
	console.log('Server started on port 3000...');
});