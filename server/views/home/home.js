'use strict';

const fs = require('fs');
const pug = require('pug');
const twitterApi = require('../../models/tweets.js');

module.exports = async (request, h) => {
	const partial = './server/templates/partials/mainNav.pug';
	const navHtml = (fs.existsSync(partial)) ? pug.renderFile(partial, {}) : '';

	let content = [];

	const tweets = await twitterApi(request.server.settings.app.twitter_screenName, request.server.settings.app.twitter);

	for (let i = 0; i < tweets.length; i++) {
		content.push(tweets[i].html);
	}

	return h.view('home', {
		pageTitle: 'Home Page',
		nav: navHtml,
		tweets: content
	});
};