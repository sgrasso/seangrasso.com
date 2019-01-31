'use strict';

const fs = require('fs');
const pug = require('pug');
const twitterApi = require('../../models/tweets.js');

module.exports = async (request, reply) => {
	const partial = './server/templates/partials/mainNav.pug';
	const navHtml = (fs.existsSync(partial)) ? pug.renderFile(partial, {}) : '';
	let content = [];
	let i = 0;

	try {
		const tweets = await request.server.methods.getTweets(
			request.server.settings.app.twitter_screenName, 
			request.server.settings.app.twitter 
		);

		const tLen = (tweets) ? tweets.length : 0;
		
		for (i; i < tLen; i++) {
			content.push(tweets[i].html);
		}
	} catch (err) {
		throw new Error(err);
	}

	reply.view('home', {
		pageTitle: 'Home Page',
		nav: navHtml,
		tweets: content
	});
};