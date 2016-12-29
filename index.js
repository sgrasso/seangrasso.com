'use strict';

const path = require('path');
const glue = require('glue');
const manifest = require('./server/config/manifest.json');
const options = {
	relativeTo: __dirname + '/server'
};
const port = process.env.PORT || 3500;

manifest.connections.push({port: port});

glue.compose(manifest, options, (err, server) => {
	
	if (err)
		throw err;

	server.views({
		engines: {
			pug: require('pug')
		},
		isCached: false,
		path: path.join(__dirname, 'server/templates'),
		compileOptions: {
			pretty: true
		}
	});	

	server.start(err => {
		if (err) throw err;
		console.log('Server running at:', port, 'as', process.env.NODE_ENV);
	});
});
