//All the NPM requirements for the program to work.
var request = require("request");
var fs = require("fs");
var Twitter = require("twitter");
var spotify = require("spotify");
var inquirer = require("inquirer");
var action;
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
	action = info.action;
	//Conditions to change prompt input text based on user's previous selection.
	if (action === "movie-this") {
		inquirer.prompt([
			{
				type: "input",
				name: "queryInput",
				message: "What movie would you like to search for?"
			} 
		]).then(function(info) {
			queryInput = info.queryInput;
			if (queryInput === "" || queryInput === undefined) {
				console.log("You left the search term blank; check out this movie!")
	  			queryInput = "Mr Nobody";
			}
			findMovie(queryInput);
		});
	} else if (action === "spotify-this-song") {
		inquirer.prompt([
			{
				type: "input",
				name: "queryInput",
				message: "What song would you like to search for?"
			} 
		]).then(function(info) {
			queryInput = info.queryInput;
			if (queryInput === "" || queryInput === undefined) {
				console.log("You left the search term blank; check out this song!");
	    		queryInput = "I saw the sign";
	    	} 
			songInfo(queryInput);
		});
	} else if (action === "my-tweets") {
		inquirer.prompt([
			{
				type: "input",
				name: "queryInput",
				message: "Which user's tweets would you like to search for?"
			} 
		]).then(function(info) {
			queryInput = info.queryInput;
			if (queryInput === "" || queryInput === undefined) {
				console.log("You left the search term blank; check out this twitter account!")
				queryInput = "BarackObama";
			}
			pullTweets(queryInput);
		});	
	} else if (action === "do-what-it-says") {
		//Skip input prompt and proceed to function call.
		runRandomTxt();
	}
});

//Function which uses OMDB to pull information about title passed in by user.
function findMovie() {
	// Then run a request to the OMDB API with the movie specified.
	var queryUrl = "http://www.omdbapi.com/?t=" + queryInput + "&y=&plot=short&r=json";

	// Then create a request to the queryUrl.
	request(queryUrl, function(error, response, body) {

	// If the request is successful.
	  if (!error && response.statusCode === 200) {
	  	var returned = JSON.parse(body);
	  	//Validation for misspelled input.
	  	if (returned.Title === undefined) {
	  		tryAgain();
	  	} else {
	    // Parse the body of the site and recover pertinent information.
	    console.log("Movie title: " + returned.Title);
	    console.log("Year produced: " + returned.Year);
	    console.log("Rated: " + returned.Rated);
	    console.log("Made in: " + returned.Country);
	    console.log(returned.Language);
	    console.log("Story: " + returned.Plot);
	    console.log("Cast: " + returned.Actors);
	    console.log("Rotten Tomatoes Metascore: " + returned.Metascore);

	    fs.appendFile("log.txt", "\n" + "Movie title: " + returned.Title + "\n" +
			"Year produced: " + returned.Year + "\n" + "Rated: " + returned.Rated + "\n" + "Made in: " + returned.Country + "\n" + returned.Language + "\n" + "Story: " + returned.Plot + "\n" + "Cast: " + returned.Actors + "\n" + "Rotten Tomatoes Metascore: " + returned.Metascore + "\n" + "-----------------------------------------------" + "\n" + "-----------------------------------------------" + "\n");
	}
	  } else {
	  	//If request is unsuccessful.
	  	console.log(error);
	  }
	});
}

//Function which will pull the 20 more recent tweets.
function pullTweets() {
	//Declares that the twitterKeys object in keys.js are necessary to provide Authorization to use API.
	var client = new Twitter(require("./keys.js").twitterKeys);
	//Runs the search for the time of post and text of post based on username and returns up to 20 tweets.
	client.get('statuses/user_timeline', {screen_name: queryInput, count: 20}, function(error, tweets, response) {

		if(error) {
			console.log(error);
			tryAgain();
			return;
		} else {
			for(var i = 0; i < tweets.length; i++) {
				console.log("\n");
				console.log("Tweet #" + [i + 1] + " from user @" + queryInput + ":");
				console.log(tweets[i].created_at.substring(0, 19));
				console.log(tweets[i].text);

			    fs.appendFile("log.txt", "\n" + "Tweet #" + [i + 1] + " from user @" + queryInput + ":" + "\n" + tweets[i].created_at.substring(0, 19) + "\n" + tweets[i].text + "\n" + "-----------------------------------------------" + "\n" + "-----------------------------------------------" + "\n");
			}
		}
	});
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
		 	var results = data.tracks.items[0];
			//Validation for misspelled input
			if (results === undefined) {
				tryAgain();
			} else {
			 	//If the request is successful filter through the JSON object and recover pertinent information.
			    console.log("Artist: " + results.artists[0].name);
			    console.log("Song name: " + results.name);
			    console.log("Listen here: " + results.preview_url);
			    console.log("Found on album: " + results.album.name);

			    fs.appendFile("log.txt", "\n" + "Artist(s): " + results.artists[0].name + "\n" +
					"Song Name: " + results.name + "\n" + "Preview Link: " + results.preview_url + "\n" + "Album: " + results.album.name + "\n" + "-----------------------------------------------" + "\n" + "-----------------------------------------------" + "\n");
			}
	    }
    });
}

//Function will pull text from other file and perform whatever action is present based on previous three functions.
function runRandomTxt() {
	//File system to read random.txt file.
	fs.readFile("random.txt", "utf8", function(err, data) {
		//Seperates the data in random.txt and assigns to useful variables.
	    var newStuff = data.split(",");
	    var newAction = newStuff[0];
	    queryInput = newStuff[1].substring(1, newStuff[1].length-3);
	    //New switch case to process text present in random.txt file.
		switch (newAction){
		    case "movie-this":
		        findMovie(queryInput);
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

function tryAgain() {
	console.log("You might have spelled something wrong. Try again.");
		inquirer.prompt([
		{
			type: "input",
			name: "queryInput",
			message: "What did you mean to type?"
		} 
	]).then(function(info) {
		queryInput = info.queryInput;

		switch (action){
		    case "movie-this":
		        findMovie(queryInput);
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