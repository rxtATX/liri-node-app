# liri-node-app
Language Interpretation Recognition Interface

This is a NODE app wherein the user make make selections on what types of searches they would like to perform, and input the information on which they'd like details.

Options include:
	
	movie-this
This is a movie search using OMDB to return information like:
	Title of the movie.
	Year the movie came out.
	IMDB Rating of the movie.
	Country where the movie was produced.
	Language of the movie.
	Plot of the movie.
	Actors in the movie.
	The movie's Metascore.

	spotify-this-song
This is a song search using the Spotify API to return information like:
	Artist(s).
	The song's name.
	A preview link of the song from Spotify.
	The album that the song is from.

	my-tweets
This is a user search using the Twitter API to return up to 20 of the most recent tweets by whichever user. Includes:
	Iteration of the tweet.
	User name.
	Timestamp for the tweet.
	Text content of the tweet.

	do-what-it-says
This is a simple function which does not accept user input, but rather reads from an external file to perform its own, automatic search.

The app is validated to display errors and protects the user agains spelling errors and has default searches for when the input fields are mistakenly left blank.

A record of all previous queries is stored in the partner document "log.txt"

Thank you for using LIRI!
