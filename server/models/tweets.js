'use strict';

const Twitter = require('twitter');
const tweetToHTML = require('tweet-to-html');

module.exports = (screen_name, credentials) => {
	
	return new Promise((resolve, reject) => {
		const api = new Twitter(credentials);
		const params = {
			screen_name: screen_name
		};

		api.get('statuses/user_timeline', params, (e, tweets, resp) => {
			if (e) return reject(e);
	
			formatImageURLs(tweets).then(results => {
				return resolve(tweetToHTML.parse(results));
			}).catch(ee => {
				return reject(ee);
			});
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