var http = require("http");
var express = require("express");
var consolidate = require("consolidate");//1
var _ = require("underscore");
var bodyParser = require('body-parser');

var routes = require('./routes'); //File that contains our endpoints
var mongoClient = require("mongodb").MongoClient;

var app = express();
app.use(bodyParser.urlencoded({
   extended: true,
}));

app.use(bodyParser.json({limit: '5mb'}));

app.set('views', 'views'); //tells your app to look for HTML files inside the views folder whenever it gets a request for a particular page. Set the folder-name from where you serve the html page. 
app.use(express.static('./public')); //sets the folder from which static assets like stylesheets and JavaScripts will be served when a page loads on the browser 

app.set('view engine','html');
app.engine('html',consolidate.underscore); // these 2 lines tell our app to use underscore template engine to parse our html files
var portNumber = 8000; //for locahost:8000

http.createServer(app).listen(portNumber, function(){ //creating the server which is listening to the port number:8000, and calls a function within in which calls the initialize(app) function in the router module
	console.log('Server listening at port '+ portNumber);
	
	var url = 'mongodb://localhost:27017/myUberApp';
	mongoClient.connect(url, function(err, db) { //a connection with the mongodb is established here.
		console.log("Connected to Database");
		routes.initialize(app, db); //function defined in routes.js which is exported to be accessed by other modules

        app.get('/citizen.html', function(req, res){
            res.render('citizen.html',{
                userId: req.query.userId
            });
        });

        app.get('/cop.html', function(req, res){
            res.render('cop.html', {
                userId: req.query.userId
            });
        });
	});
});

/* 1. Not all the template engines work uniformly with express, hence this library in js, (consolidate), is used to make the template engines work uniformly. Altough it doesn't have any 
modules of its own and any template engine to be used should be seprately installed!*/