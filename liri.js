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

function spotifyThis() {

}

function movieThis() {

}

function doIt() {

}

switch (process.argv[2]) {
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		spotifyThis(process.argv[3]);
		break;
	case "movie-this":
		movieThis(process.argv[3]);
		break;
	case "do-what-it-says":
		doIt();
		break;
	default:
		console.log("I'm sorry I do not know how to do that");
}