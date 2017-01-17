'use strict';

const fs = require('fs');
const pug = require('pug');
const path = require('path');

module.exports = (request, reply) => {
	const viewPartial = path.join('./templates/partials', request.params.subview + '.pug');
	const navPartial = './templates/partials/subNav.pug';

	let view = (fs.existsSync(viewPartial)) ? pug.renderFile(viewPartial, {}) : '';
	let nav = (fs.existsSync(navPartial)) ? pug.renderFile(navPartial, {}) : '';

	reply.view('subview', {
		pageTitle: request.params.subview + ' Page',
		partial: view,
		nav: nav
	});
};