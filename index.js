'use strict';

const path = require('path');
const glue = require('glue');

const twitterApi = require('./server/models/tweets.js');
const manifest = require('./server/config/manifest.json');
const options = {
	relativeTo: __dirname + '/server'
};
const port = process.env.PORT || 3500;

manifest.connections.push({port: port});

glue.compose(manifest, options, (err, server) => {
	
	if (err) throw err;

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

	server.method('getTweets', twitterApi, {
		cache: {
			expiresIn: 86399999,
			staleIn: 21599999,
			staleTimeout: 100,
			generateTimeout: 120000
		},
		generateKey: (screen_name, credentials) => {
			return screen_name;
		}
	});

	server.start(err => {
		if (err) throw err;
		console.log('Server running at:', port, 'as', process.env.NODE_ENV);
	});
});
