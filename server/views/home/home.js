var fs = require('fs');
var jade = require('jade');
var Path = require('path');

module.exports = function (request, reply) {
	var navHtml = '';
	var partial = './server/templates/partials/mainNav.jade';
	var exists = fs.existsSync(partial);

	if (exists){
		navHtml = jade.renderFile(partial, {});
	}

	var context = {
		pageTitle: 'Home Page',
		nav: navHtml
	};
	
	reply.view('home', context);

};