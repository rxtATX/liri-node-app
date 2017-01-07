//All the NPM requirements for the program to work.
var request = require("request");
var fs = require("fs");
var twitter = require("twitter");
var spotify = require("spotify");

// Create the variable to read which of the functions should run based on user input in Git Bash.
var action = process.argv[2];

//Switch statements for which conditions to run when an action is passed.
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

//Function which uses OMDB to pull information about title passed in by user.
function findMovie() {
	//Takes the value of the array in the [3] position.
	var movieName = process.argv[3];
	//Loop which will filter through user input and replace any spaces with + to pass into query URL.
	for (var i = 0; i < movieName.length; i++) {
		if (movieName.charAt(i) === " ") {
			movieName = movieName.substring(0, i) + "+" + movieName.substring(i + 1);
		}
	}

	// Then run a request to the OMDB API with the movie specified.
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

	// Then create a request to the queryUrl.
	request(queryUrl, function(error, response, body) {

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

//Function which will pull the 20 more recent tweets.
function pullTweets() {
	//Needs to be done
}

//Function will process song input through Spotify API and return details.
function songInfo() {
	//Takes the value of the array in the [3] position.	
	var songName = process.argv[3];
	//Loop which will filter through user input and replace any spaces with + to pass into query URL.
	for (var i = 0; i < songName.length; i++) {
		if (songName.charAt(i) === " ") {
			songName = songName.substring(0, i) + "+" + songName.substring(i + 1);
		}
	}

	// Then create a request to the queryUrl.
    spotify.search({ type: 'track', query: songName }, 
    function(err, data) {
		// If the request is successful.
		if (!error && response.statusCode === 200) {
		 	var results = data.tracks.items[0];
		 	// Filter through the JSON object and recover pertinent information.
		    console.log("Artist: " + results.artists[0].name);
		    console.log("Song name: " + results.name);
		    console.log("Listen here: " + results.preview_url);
		    console.log("Found on album: " + results.album.name);
	    } else {
	    	//If there is an error:
            console.log('Error occurred: ' + err);
            return;
	    }
    });
};

//Function will pull text from other file and perform whatever action is present based on previous three functions.
function runRandomTxt() {
	//File system to read random.txt file.
	fs.readFile("random.txt", "utf8", function(err, data) {
		//Separating the action portion from the search term portion of input in the txt file.
		var newAction = data;
		if (newAction.charAt(i) === ",") {
			newAction = newAction.substring(0, i);
			var newSearch = newAction.substring(i + 1);
		}
		console.log(data);
		console.log(newAction);
		console.log(newSearch);
	})
}