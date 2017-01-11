console.log('this is loaded');

exports.twitterKeys = {
  consumer_key: 'eKZvocgWfY9eXtea7ELfOGp0c',
  consumer_secret: 'cx4mLzrfipWl0zMqEMZw9rWPlvwwKKDWXZX71wQd3avs6724Pp',
  access_token_key: '	817836419116830724-7XUF7viBojlxWpTV127VxQfr7D54yK5',
  access_token_secret: 'oSOieESLlMnyeHAxLjS9aliGZOZwBJzMrWEssZcq2A1CM',
}

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});