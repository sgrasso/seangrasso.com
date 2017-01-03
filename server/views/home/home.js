'use strict';

const fs = require('fs');
const pug = require('pug');
const twitter = require('../../models/tweets.js');

module.exports = (request, reply) => {
	const partial = './server/templates/partials/mainNav.pug';
	const navHtml = (fs.existsSync(partial)) ? pug.renderFile(partial, {}) : '';

	twitter(request.server, (e, tweets) => {
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
	});
};