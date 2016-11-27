const Twitter = require('twitter');

module.exports = (server) => {

	const api = new Twitter(server.app.twitter);
	const params = {screen_name: server.app.twitter_screenName};

	api.get('statuses/user_timeline', params, (error, tweets, response) => {
		if (!error) {
			console.log(tweets);
		}
	});
}
