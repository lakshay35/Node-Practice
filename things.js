var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
	res.send('GET route on things');    
});

router.post('/', (req, res) => {
	res.send('POST route on things');
});

router.get('/:id/:name', (req, res) => {
	res.send('The id you requested is ' + req.params.id + ' and the name is ' + req.params.name);
});

//export this router to use in our index.js
module.exports = router;