'use strict';

const fs = require('fs');
const pug = require('pug');
const github = require('../../models/github.js');

module.exports = (request, reply) => {
	const partial = './server/templates/partials/mainNav.pug';
	const navHtml = (fs.existsSync(partial)) ? pug.renderFile(partial, {}) : '';

	github('sgrasso').then(data => {
		console.log(data)
		return data;
	});

	request.server.methods.getTweets(
		request.server.settings.app.twitter_screenName, 
		request.server.settings.app.twitter, 
		(e, tweets) => {
			let content = [], i = 0, tLen = (tweets) ? tweets.length : 0;
			
			if (e) console.log(e);

			for (i = 0; i < tLen; i++) {
				content.push(tweets[i].html);
			}

			return reply.view('home', {
				pageTitle: 'Home Page',
				nav: navHtml,
				tweets: content
			});
		}
	);
};