var fs = require('fs');
var jade = require('jade');
var Path = require('path');

module.exports = function (request, reply) {
	var view = '';
	var nav = '';
	var viewPartial = Path.join('./server/templates/partials', request.params.subview + '.jade');
	var navPartial = './server/templates/partials/subNav.jade';

	if (fs.existsSync(viewPartial)){
		view = jade.renderFile(viewPartial, {});
	}

	if (fs.existsSync(navPartial)){
		nav = jade.renderFile(navPartial, {});
	}
	
	var context = {
		pageTitle: request.params.subview + ' Page',
		partial: view,
		nav: nav
	};
	
	reply.view('subview', context);

};