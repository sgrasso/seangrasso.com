const fs = require('fs');
const pug = require('pug');
const twitter = require('./server/models/tweets.js');

module.exports = (request, reply) => {
	const partial = './server/templates/partials/mainNav.pug';
	const tweets = twitter(server);
	const navHtml = (fs.existsSync(partial)) ? pug.renderFile(partial, {}) : '';

	reply.view('home', {
		pageTitle: 'Home Page',
		nav: navHtml,
		twitter: tweets
	});
};