'use strict';

const Twitter = require('twitter');
const tweetToHTML = require('tweet-to-html');

module.exports = (server, done) => {

	const api = new Twitter(server.settings.app.twitter);
	const params = {screen_name: server.settings.app.twitter_screenName};

	api.get('statuses/user_timeline', params, (e, tweets, resp) => {
		if (e) return done(e, null);

		formatImageURLs(tweets).then(results => {
			return done(null, tweetToHTML.parse(results));
		}).catch(e => {
			return done(e, null);
		});
	});
}

const formatImageURLs = tweets => {
	// tweet-to-html converts photo links to img tags... don't really want that in the UI. Lets stop that and make links.
	return Promise.all(tweets.map(tweet => {
		if (tweet.extended_entities && tweet.extended_entities.media) {
			for (let i = 0; i < tweet.extended_entities.media.length; i++) {
				let url = tweet.extended_entities.media[i].url;
				tweet.text = tweet.text.replace(url, '<a href="' + url + '">' + url + '</a> ');
			}
			tweet.extended_entities.media = [];
		}
		return tweet;
	}));
} 