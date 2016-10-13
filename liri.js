//VARIABLES==========================================
//grabs keys from keys.js file
var imported = require('./keys.js');


//require search dependencies & NPM
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
//var movie = require('movie');

//arguments 
var userSearch = process.argv[2];
var searchInfo = process.argv[3];

//grab .txt files
var ranFile = "random.txt";
var logFile = "log.text";

//SWITCH CASE
switch(userSearch) {
	case "my-tweets":
		twitSeearch();
	break;

	case "spotify-this-song":
		spotSearch();
	break;

	case "movie-this":
		omdbSearch();
	break;

	case "do-what-it-says":
		saysSearch();
	break;
} //END SWITCH

//=================FUNCTIONS=================================
//TWITTER FUNCTION============================================
function twitSeearch(){
	//define parameter with {screen name, tweet count}
	var params = {screen_name: 'taylor_rayee_'};
	var client = new Twitter(imported.twitterKeys)
	//calls Twitter API
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		//if no error, run for-loop (20 tweets)
		if (!error) {
			for(var i in tweets){
				console.log('taylor_rayee_' + tweets[i].text);
				console.log("----------------")
			}
		}
	});

} //END TWITTER FUNCTION

//SPOTIFY FUNCTION============================================
function spotSearch(argv2){
	var song = argv2;
	//if song error, play 
	if (!song === undefined) {
		//searchInfo = 'The Sign';
		spotify.search({ type: 'track', query: "The Sign"})
	}
	var params = {type:'track', query: song};
	spotify.search(params, function(err, data){
		if (err) {
			console.log('Spotify Error Occurred: ' + err);
			return;
		}
			else {
				//variable for song object
				var info = data.tracks.items[0];
				//name of artist
				console.log('Artist:',	info.artists[0].name);
				//name of song
				console.log('Song:',	info.name);
				//name of album
				console.log('Album:',	info.album.name);
				//preview link
				console.log('Preview:', info.preview_url.spotify);
			}
	});

} //END SPOTIFY FUNCTION

//OMDB FUNCTION===============================================
	// `movie-this`
function omdbSearch(){
	//change argv2 to movie
	var movie = 'mr+nobody';
		for (var i = 3; i<process.argv.length; i++) {
			var movie = '';
			var movie = movie + '+' + process.argv[i];
		}
	//movie parameters
	var queryURL = 'http://www.omdbapi.com/?t=' + movie +'&y=&plot=short&tomatoes=true&r=json'
	
	console.log(queryURL);
	// var queryURL ='http://www.omdbapi.com/?t=' + movie +'&y=&plot=short&tomatoes=true&r=json';
	

		request(queryURL, function(error, response, body){
			if(!error && response.statusCode == 200){
				//parse body of results into JSON
				var info = JSON.parse(body);

				console.log('Title: ', + info.Title);
				console.log('Release Year:',JSON.parse(body)['Released']);
				console.log('IMDB Rating: ', JSON.parse(body)['imdbRating']);
				console.log('Country of Production:', JSON.parse(body)["Country"]);
				console.log('Language:',JSON.parse(body)['Language']+'\n');
				console.log('Plot:',JSON.parse(body)['Plot']+'\n');
				console.log('Actors:',JSON.parse(body)['Actors']);
				console.log('Rotten Tomatoes Rating:',JSON.parse(body)['tomatoMeter']);
				console.log('Rotten tomatoes URL:', JSON.parse(body)['tomatoURL']);

		}
	});
} //END MOVIE COMMAND



