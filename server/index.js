'use strict';

const path = require('path');
const fs = require('fs');
const Glue = require('glue');

const manifest = require('../config/manifest.js');
const options = {
	relativeTo: __dirname + '/'
};

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

		console.log('Server running at:', manifest.server.port, 'as', process.env.NODE_ENV);

	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

startServer();
