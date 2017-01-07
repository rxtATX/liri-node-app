console.log('this is loaded');

exports.twitterKeys = {
  consumer_key: '79Fv120N0SmKH3xZvwlRzAfBe',
  consumer_secret: '5WKbz8LWjP3qvJgGWffzBzYAyx4NwYxH1FGsMLaptHGZS1gAg9',
  access_token_key: '817836419116830724-7XUF7viBojlxWpTV127VxQfr7D54yK5',
  access_token_secret: 'oSOieESLlMnyeHAxLjS9aliGZOZwBJzMrWEssZcq2A1CM',
}

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});