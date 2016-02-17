var fs = require('fs');
var jade = require('jade');
var Path = require('path');

module.exports = function (request, reply) {
	var html = '';
	var partial = Path.join('./server/templates/partials', request.params.subview + '.jade');
	var exists = fs.existsSync(partial);

	if (exists){
		html = jade.renderFile(partial, {});
	}
	
	var context = {
		pageTitle: request.params.subview + ' Page',
		partial: html
	};
	
	reply.view('subview', context);

};