'use strict';

const Twitter = require('twitter');
const tweetToHTML = require('tweet-to-html');

module.exports = async (screen_name, credentials, cb) => {
	const api = new Twitter(credentials);
	const params = {screen_name: screen_name};
	
	let results = [];
	let tweets = [];

	try {
		tweets = await api.get('statuses/user_timeline', params);
	}
	catch (e) {
		console.log(e);
	}
	
	try {
		results = await formatImageURLs(tweets);
		results = tweetToHTML.parse(results);
	} catch (er) {
		console.log(er);
	};

	return results;
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