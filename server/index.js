'use strict';

const path = require('path');
const glue = require('glue');

const twitterApi = require('./models/tweets.js');
const manifest = require('./config/manifest.json');
const options = {
	relativeTo: __dirname + '/'
};
const port = process.env.OPENSHIFT_NODEJS_PORT || 3500;

manifest.connections.push({port: port});

glue.compose(manifest, options, (err, server) => {
	
	if (err) throw err;

	server.views({
		engines: {
			pug: require('pug')
		},
		isCached: false,
		path: path.join(__dirname, 'templates'),
		compileOptions: {
			pretty: true
		},
		context: {
			assetdomain: (process.NPM_CONFIG_PRODUCTION === 'production') ? 'http://assets.seangrasso.com' : '/public'
		}
	});	

	server.route({
		path: '/health',
		method: 'GET',
		handler: (request, reply) => {
			reply('').code(200);
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
