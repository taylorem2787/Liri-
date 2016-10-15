//Directories: 
	//npm install twiiter, npm install spotify, npm install require, 
//VARIABLES==========================================
//grabs keys from keys.js file
var imported = require('./keys.js');


//require node dependencies & NPM for functions
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

//3rd & 4th arguments from command line
var userSearch = process.argv[2];
var searchInfo = process.argv[3];

//SWITCH CASE
function liri(userSearch, searchInfo){
	switch(userSearch) {
		case "my-tweets":
			twitSeearch();
		break;

		case "spotify-this-song":
			spotSearch(searchInfo);
		break;

		case "this-movie":
			imdbSearch();
		break;

		case "do-what-it-says":
			saysSearch();
		break;
	}
} //END SWITCH

//=================FUNCTIONS=================================
//TWITTER FUNCTION============================================
	//MY-TWEETS
function twitSeearch(){
	//define parameter with {screen name, tweet count}
	var params = {screen_name: 'taylor_rayee_', count: 20};
	var client = new Twitter(imported.twitterKeys)
	//calls Twitter API & retrieves info
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		//if no error, run for-loop (20 tweets)
		if (!error) {
			for(var i in tweets){
			//for (var i = 0; i < 20; i++){

				//push tweets to log.txt
				fs.appendFile('log.txt', 'My Tweets: ' + tweets[i].text + '\n----------------------------------\n');
				console.log('---------------------Start------------------------');
				console.log('taylor_rayee_' + tweets[i].text);
				console.log('-----------------------End----------------------')
			}
		}
	});

} //END TWITTER FUNCTION

//SPOTIFY FUNCTION============================================
	//spotify-this-song terminal command line
function spotSearch(song){
//var userSearch = 'song';
	//if song error, play 
	if (!song) {
		song = 'The Sign';
		//spotify.search({ type: 'track', query: "The Sign"})
	};
	var params = {type:'track', query: song};
	spotify.search(params, function(err, data){
		if (err) {
			console.log('Spotify Error Occurred: ' + err);
			return;
		}
			else {
				//created object of track info for log.txt
				var info = data.tracks.items[0];
				spotData = {
					'Artist: ' : info.artists[0].name + ('\n'),
					'Song: '   : info.name,
					'Album: '  : info.album.name,
					'Preview: ': info.preview_url.spotify
				};
				//pushes spotData into log.txt
				fs.appendFile('log.txt',JSON.stringify(spotData)+'\n----------------------------------\n');
				
				console.log('---------------------Start------------------------');
				console.log('Artist: '	,info.artists[0].name +'\n');
				console.log('Song: '	,info.name 			  +'\n');
				console.log('Album: '	,info.album.name 	  +'\n');
				console.log('Preview: '	,info.preview_url 	  +'\n');
				console.log('-----------------------End----------------------')
			}
	});

} //END SPOTIFY FUNCTION

//OMDB FUNCTION===============================================
	//movie-this terminal command line
function imdbSearch(){
	var movie = 'mr+nobody';
		for (var i = 3; i<process.argv.length; i++) {
			var movie = '';
			var movie = movie + '+' + process.argv[i];
		}
	//movie parameters
	var queryURL = 'http://www.omdbapi.com/?t=' + movie +'&y=&plot=short&tomatoes=true&r=json'
	//console.log(queryURL);
		request(queryURL, function(error, response, body){
			if(!error && response.statusCode == 200){
				//parse body of results into JSON
				var info = JSON.parse(body);
				imdbData = {
					'Title:' 				  : info.Title, 
					'Release Date:'			  : info.Release,
					'IMDB Rating:'  		  : info.imdbRating,
					'Actors:'				  : info.Actors,
					'Plot:'					  : info.Plot,
					'Country of Production:'  : info.Country,
					'Language:' 			  : info.Language,
					'Rotten Tomatoes Rating:' : info.tomatoMeter,
					'Rotten Tomatoes URL:'	  : info.tomatoeURL 
				};
				//pushes imdbData into log.txt
				fs.appendFile('log.txt',JSON.stringify(imdbData)+'\n----------------------------------\n');

				console.log('---------------------Start------------------------');
				console.log('Title: ' 				  + info.Title		+'\n');
				console.log('Release Date: '		  + info.Release	+'\n');
				console.log('IMDB Rating: '			  + info.imdbRating +'\n');
				console.log('Actors: '				  + info.Actors		+'\n');
				console.log('Plot: '				  + info.Plot 		+'\n');
				console.log('Country of Production: ' + info.Country 	+'\n');
				console.log('Language: ' 			  + info.Language 	+'\n');
				console.log('Rotten Tomatoes Rating: '+ info.tomatoMeter+'\n');
				console.log('Rotten Tomatoes URL: '	  + info.tomatoURL 	+'\n');
				console.log('-----------------------End----------------------');
		}
	});
} //END MOVIE FUNCTION

//DO WHAT IT SAYS FUNCTION====================================
	//do-what-i-say terminal command line
function doThis(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (!error) {
			ranArray = data.split(',');
			liri(ranArray[0], ranArray[1]);
		}
		else{
			console.log('Error Occured' + error)
		}
	});
};	//END DO WHAT IT SAYS FUNCTION

//FUNCTION LOG=================================================
// function log(data){
// 	console.log(data);
// 	fs.append('log.txt', data, 'utf8', function(error) {
// 		if (error) {
// 			console.log('Error Occurred ' + error);
// 		}
// 	})
// }; //END LOG FUNCTION

//Calling Liri Function
liri(process.argv[2], process.argv[3]);