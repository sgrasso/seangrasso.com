'use strict';

exports.register = (server, options) => {

	server.route({
		path: '/{subview}',
		method: 'GET',
		handler: require('./subview')
	});

};

exports.name = "SubView Page";
exports.version = "1.0";