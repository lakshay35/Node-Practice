var express = require('express');
var app = express();
var things = require('./things.js');
var  bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var mongoose = require('mongoose');

mongoose.connect('mongodb:://localhost/customers');

var personSchema = mongoose.Schema({
	name: String,
	age: Number,
	nationality: String
});

var person = mongoose.model("Person", personSchema);

//Use the public directory for static files
app.use(express.static('public'));

//Parse url encoded data
app.use(bodyParser.urlencoded({extended: false}));
//Parse json
app.use(bodyParser.json());
//Parse cookies

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/first', (req, res) => {
	res.render('first_view', {
		name: 'Lakshay Sharma',
		url: 'http://sharmalakshay.com'
	});
});

app.use('/things', things);
//app.use(upload.array());

app.get('/', (req, res) => {
	res.render('form');
});

app.post('/', (req, res) => {
	console.log(req.body);
	res.send('received your request');
});

app.get('/person', (req, res) => {
	res.render('person');
});

app.post('/person', (req, res) => {
	var personInfo = req.body; //get Parsed Information

	if(!personInfo.name || !personInfo.age || !personInfo.nationality) {
		res.render('show_message', {
			message: 'Sorry, you provided wrong info', type: 'Error'
		});
	} else {
		var newPerson = new Person({
			name: personInfo.name,
			age: personInfo.age,
			nationality: personInfo.nationality
		});

		newPerson.save((err, Person) => {
			if(err)
				res.render('show_message', {message: 'Database error', type: 'error'});
			else
				res.render('show_message', {message: 'New Person Added', type: 'success', person: personInfo});
		});
	}
});

app.listen(3000);
