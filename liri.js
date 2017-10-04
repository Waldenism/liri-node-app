var keys = require("./keys.js");
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');

function myTweets() {
	var client = new twitter(keys.twitter);
	var params = { screen_name: 'SeaWx2', count: 20 };

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
		  var data = []; //empty array to hold data
		  for (var i = 0; i < tweets.length; i++) {
		    data.push({
		        'created at: ' : tweets[i].created_at,
		        'Tweets: ' : tweets[i].text
		    });
		  }
		  console.log(data);
		}
	});
}

function spotifyThis(song) {
	//handle multiple word songs
	var spotify_client = new spotify({
		id: keys.spotify.client_id,
		secret: keys.spotify.client_secret
	});
	if (song === undefined) {
		song = "The Sign";
	};

	spotify_client.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
	    if (err) {
	      console.log('Error occurred: ' + err);
	      return;
	    }
	    
	    var result = data.tracks.items[0];

	    if (!result) {
	    	console.log("no result found");
	    } else {
	    	console.log("Artist: " + result.artists[0].name);

	    	var songTitle = result.name;
	    	console.log("Song: " + songTitle);

	    	var preview = result.preview_url;
	    	if (!preview) {
	    		preview = "No preview listed";
	    	}
	    	console.log("Preview link " + preview);

	    	var album = result.album.name;
	    	if(!album) {
	    		album = "No album listed"
	    	}
	    	console.log("Album: " + album);
	    }
  });
}

function movieThis(movie) {
	if (movie === undefined) {
		movie = "Mr Nobody";
	}
	//HANDLE multiple word movies
	console.log(movie);
	
	var queryUrl = 'http://www.omdbapi.com/?t=' + movie + "&apikey=40e9cece";
	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {
	    if (error) {
	    	console.log("Error: " + error.message);
	    } else {
	    	var data = [];
	    	// body = JSON.parse(body);

			data.push({
				'Title: ' : JSON.parse(body).Title,
				'Year: ' : JSON.parse(body).Year,
				'Rated: ' : JSON.parse(body).Rated,
				'IMDB Rating: ' : JSON.parse(body).imdbRating,
				'Country: ' : JSON.parse(body).Country,
				'Language: ' : JSON.parse(body).Language,
				'Plot: ' : JSON.parse(body).Plot,
				'Actors: ' : JSON.parse(body).Actors,
				'Rotten Tomatoes Rating: ' : JSON.parse(body).tomatoRating,
				'Rotton Tomatoes URL: ' : JSON.parse(body).tomatoURL,
			});
			console.log(data);
		}
  	});
}

function doIt() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    var dataArr = data.split(',')

    if (dataArr.length == 2) {
      run(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      run(dataArr[0]);
    }

  });
}

function run(instruction, arg) {
	switch (instruction) {
		case "my-tweets":
			myTweets();
			break;
		case "spotify-this-song":
			//handle multiple word queries
			spotifyThis(arg);
			break;
		case "movie-this":
			//handle multiple word queries
			movieThis(arg);
			break;
		case "do-what-it-says":
			doIt();
			break;
		default:
			console.log("I'm sorry I do not know how to do that");
	}
}

//Handle multiple word search arguments

var command = process.argv[2];
var searchTerm = "";
var args = process.argv;
for (var i = 3; i < args.length; i++) {
	if (i > 3 && i < args.length) {
		searchTerm = searchTerm + " " + args[i];
	} else {
		searchTerm += args[i];
	}
}

console.log(searchTerm);

run(command, searchTerm);
