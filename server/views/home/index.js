'use strict';

exports.name = "Home Page";
exports.version = "1.0";

exports.register = (server, options) => {

	server.route({
		path: '/',
		method: 'GET',
		handler: require('./home')
	});

};
