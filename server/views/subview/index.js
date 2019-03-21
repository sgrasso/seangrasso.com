'use strict';

exports.name = "SubView Page";
exports.version = "1.0";

exports.register = async server => {

	server.route({
		path: '/{subview}',
		method: 'GET',
		handler: require('./subview')
	});

};
