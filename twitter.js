const express = require('express');//express is a module
const app = express();
const router = express.Router();
const port = 4000;

var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);
//Set up your search parameters
var params = {
	q = '#MLB'
	count : 5;
	result_type : 'recent';
	lang: 'en'
}

//all routes prefixed with /api
app.use('./api', router);

//using router.get() to prefix our path
//url: httl://localhost:4000/api/
router.get('/', (request, response) => {
	T.get('search/tweets', params, function(err, data, responses) {
		if(!err) {
			response.set({'Access-Control-Allow-Origin': '*'});
			response.json(data);
		}else{
			console.log("Error:" + err);
		}

	})
});

//set the server to listen on port 4000
app.listen(port, () => console.log('Listening on port ${port}'));
