//All the NPM requirements for the program to work.
var request = require("request");
var fs = require("fs");
var twitter = require("twitter");
var spotify = require("spotify");

// Create the variable to read which of the functions should run based on user input in Git Bash.
var action = process.argv[2];

//Switch statements for which conditions to run when an action is passed.
if (action === "movie-this" || "spotify-this-song" || "my-tweets") {
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
} else {
	console.log("no.")
	// console.log("Please use one of the appropriate commands.\nYou may type: \"spotify-this-song\", \"movie-this\", or \"my-tweets\"");
}

//Function which uses OMDB to pull information about title passed in by user.
function findMovie() {
	//Takes the value of the array in the [3] position.
	var queryInput = process.argv[3];
	//Loop which will filter through user input and replace any spaces with + to pass into query URL.
	for (var i = 0; i < queryInput.length; i++) {
		if (queryInput.charAt(i) === " ") {
			queryInput = queryInput.substring(0, i) + "+" + queryInput.substring(i + 1);
		}
	}

	// Then run a request to the OMDB API with the movie specified.
	var queryUrl = "http://www.omdbapi.com/?t=" + queryInput + "&y=&plot=short&r=json";

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
	var queryInput = process.argv[3];
	//Loop which will filter through user input and replace any spaces with + to pass into query URL.
	for (var i = 0; i < queryInput.length; i++) {
		if (queryInput.charAt(i) === " ") {
			queryInput = queryInput.substring(0, i) + "+" + queryInput.substring(i + 1);
		}
	}

	// Then create a request to the queryUrl.
    spotify.search({ type: 'track', query: queryInput }, 
    function(err, data) {
	    	//If there is an error:
	    if (err) {
            console.log('Error occurred: ' + err);
            return;
	    } else {
		// If the request is successful.
		 	var results = data.tracks.items[0];
		 	// Filter through the JSON object and recover pertinent information.
		    console.log("Artist: " + results.artists[0].name);
		    console.log("Song name: " + results.name);
		    console.log("Listen here: " + results.preview_url);
		    console.log("Found on album: " + results.album.name);
	    }
    });
};

//Function will pull text from other file and perform whatever action is present based on previous three functions.
function runRandomTxt() {
	//File system to read random.txt file.
    fs.readFile("random.txt", "utf8", function(err, data) {
        var newStuff = data.split(",");
        action = newStuff[0];
        queryInput = newStuff[1].substring(1, newStuff[1].length-1);

        if (action === "movie-this" || "spotify-this-song" || "my-tweets") {
	        switch (action){
	            case "movie-this":
	                findMovies(queryInput);
	                break;

				case "my-tweets":
					pullTweets();
					break;

	            case "spotify-this-song":
	                songInfo(queryInput);
	                break;
	        }
	    } else {
	    	console.log("Please use one of the appropriate commands. \n You may type: \"spotify-this-song\", \"movie-this\", or \"my-tweets\"");
	    }
    });
}