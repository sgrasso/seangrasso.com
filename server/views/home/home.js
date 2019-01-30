'use strict';

const fs = require('fs');
const pug = require('pug');
const twitterApi = require('../../models/tweets.js');

module.exports = async (request, reply) => {
	const partial = './server/templates/partials/mainNav.pug';
	const navHtml = (fs.existsSync(partial)) ? pug.renderFile(partial, {}) : '';
	let tweets = [];

	try {
		tweets = await twitterApi(
			request.server.settings.app.twitter_screenName,
			request.server.settings.app.twitter);
	} catch (e) {
		console.log(e);
	}

	let content = [],
		i = 0,
		tLen = (tweets) ? tweets.length : 0;

	for (i = 0; i < tLen; i++) {
		content.push(tweets[i].html);
	}

	reply.view('home', {
		pageTitle: 'Home Page',
		nav: navHtml,
		tweets: content
	});
};