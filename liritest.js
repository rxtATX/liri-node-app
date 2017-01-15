//All the NPM requirements for the program to work.
var request = require("request");
var fs = require("fs");
var twitter = require("twitter");
var spotify = require("spotify");
var inquirer = require("inquirer");
// var client = new twitter(require("keys.js").twitterKeys);

var queryInput;

// Create the variable to read which of the functions should run based on user input in Git Bash.
inquirer.prompt([
	{
		type: "list",
		name: "action",
		message: "What type of search would you like to do?",
		choices: ["movie-this", "spotify-this-song", "my-tweets", "do-what-it-says"]
	}
]).then(function(info) {
	//Conditions to change prompt input text based on user's previous selection.
	if (info.action === "movie-this") {
		inquirer.prompt([
			{
				type: "input",
				name: "queryInput",
				message: "What movie would you like to search for?"
			} 
		]).then(function(info) {
			findMovie(info.queryInput);
		});
	} else if (info.action === "spotify-this-song") {
		inquirer.prompt([
			{
				type: "input",
				name: "queryInput",
				message: "What song would you like to search for?"
			} 
		]).then(function(info) {
			songInfo(info.queryInput);
		});
	} else if (info.action === "my-tweets") {
		inquirer.prompt([
			{
				type: "input",
				name: "queryInput",
				message: "Which user's tweets would you like to search for?"
			} 
		]).then(function(info) {
			pullTweets(info.queryInput);
		});	
	} else if (info.action === "do-what-it-says") {
		//Skip input prompt and proceed to function call.
		runRandomTxt();
	}
});

// .then(function(info) {
// 	console.log(info);
	// var queryInput = info.queryInput;
	//Switch statements for which conditions to run when an action is passed.
	// switch (info.action) {
	// 	case "movie-this":
	// 		findMovie(queryInput);
	// 		break;

	// 	case "my-tweets":
	// 		pullTweets(queryInput);
	// 		break;

	// 	case "spotify-this-song":
	// 		songInfo(queryInput);
	// 		break;
	// }
// });

//Function which uses OMDB to pull information about title passed in by user.
function findMovie() {
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
}

//Function will pull text from other file and perform whatever action is present based on previous three functions.
function runRandomTxt() {
	//File system to read random.txt file.
	fs.readFile("random.txt", "utf8", function(err, data) {
	    var newStuff = data.split(",");
	    queryInput = newStuff[1].substring(1, newStuff[1].length-1);

		switch (newStuff){
		    case "movie-this":
		        findMovies(queryInput);
		        break;

			case "my-tweets":
				pullTweets(queryInput);
				break;

		    case "spotify-this-song":
		        songInfo(queryInput);
		        break;
		}
	});
}