'use strict';

const fs = require('fs');
const path = require('path');
const glue = require('glue');

const twitterApi = require('./models/tweets.js');
const manifest = require('../config/manifest.json');
const options = {
	relativeTo: __dirname + '/'
};
// const port = process.env.PORT || 3500;
const port = '/tmp/nginx.socket';

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
			assetdomain: '/public'
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
		if (process.env.DYNO) {
		 	console.log('This is on Heroku..!!');
			fs.openSync('/tmp/app-initialized', 'w');
		}
		console.log('Server running at:', port, 'as', process.env.NODE_ENV);
	});
});
