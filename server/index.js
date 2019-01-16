'use strict';

const path = require('path');
const fs = require('fs');
const Glue = require('glue');

const twitterApi = require('./models/tweets.js');
const manifest = require('../config/manifest.js');
const options = {
	relativeTo: __dirname + '/'
};
const port = (process.env.NODE_ENV === 'production') ? '/tmp/nginx.socket' : 3500;

manifest.server.port = 3500;

const startServer = async function () {
	try {
		const server = await Glue.compose(manifest, options);
		
		await server.start();
		
		if (process.env.DYNO) {
			console.log('Heroku Deploy..!!');
			fs.openSync('/tmp/app-initialized', 'w');
		}

		server.views({
			engines: {
				pug: require('pug')
			},
			isCached: (process.env.NODE_ENV === 'production'),
			path: path.join(__dirname, 'templates'),
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

		console.log('Server running at:', port, 'as', process.env.NODE_ENV);

	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

startServer();
