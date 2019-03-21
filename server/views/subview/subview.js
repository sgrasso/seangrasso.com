'use strict';

const fs = require('fs');
const pug = require('pug');
const path = require('path');

module.exports = async (request, h) => {
	const viewPartial = path.join('./server/templates/partials', request.params.subview + '.pug');
	const navPartial = './server/templates/partials/subNav.pug';

	let view = (fs.existsSync(viewPartial)) ? pug.renderFile(viewPartial, {}) : '';
	let nav = (fs.existsSync(navPartial)) ? pug.renderFile(navPartial, {}) : '';

	return h.view('subview', {
		pageTitle: request.params.subview + ' Page',
		partial: view,
		nav: nav
	});
};