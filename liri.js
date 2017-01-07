//All the NPM requirements for the program to work.
var request = require("request");
var fs = require("fs");
var twitter = require("twitter");
var spotify = require("spotify");

// Grab or assemble the movie name and store it in a variable called "movieName".
var action = process.argv[2];

switch (action) {
	case "movie-this":
		findMovie();
		break;

	case "my-tweets":
		pullTweets();
		break;

	case "spotify-this-song":
		songInfo();
		break;

	case "do-what-it-says":
		runRandomTxt();
		break;
}

function findMovie() {
	var movieName = process.argv[3];
	for (var i = 0; i < movieName.length; i++) {
		if (movieName.charAt(i) === " ") {
			movieName = movieName.substring(0, i) + "+" + movieName.substring(i + 1);
		}
	}

	// Then run a request to the OMDB API with the movie specified.
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

	// Then create a request to the queryUrl.
	request(queryUrl, function(error, response, body) {
	// console.log(queryUrl);

	// If the request is successful.
	  if (!error && response.statusCode === 200) {
	  	var returned = JSON.parse(body);
	    // Parse the body of the site and recover pertinent information.
	    console.log("Movie title: " + returned.Title);
	    console.log("Year produced: " + returned.Year);
	    console.log("Rated: " + returned.Rated);
	    console.log("Made in: " + returned.Country);
	    console.log(returned.Language);
	    console.log("Story: " + returned.Plot);
	    console.log("Cast: " + returned.Actors);
	    console.log("Rotten Tomatoes Metascore: " + returned.Metascore);
	  }
	});
}

function pullTweets() {

}

function songInfo() {
	var songName = process.argv[3];
	for (var i = 0; i < songName.length; i++) {
		if (songName.charAt(i) === " ") {
			songName = songName.substring(0, i) + "+" + songName.substring(i + 1);
		}
	}
}

function runRandomTxt() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		data = data.split(", ");
		var result = data[i];

		for (i = 0; i < data.length; i++) {
			console.log(result);
		}
	})
}