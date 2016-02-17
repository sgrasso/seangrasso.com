var Path = require('path');
var Glue = require('glue');
var Hoek = require('hoek');
var manifest = require('./server/config/manifest.json');
var options = {
	relativeTo: __dirname + '/server'
};

Glue.compose(manifest, options, function (err, server) {
	Hoek.assert(!err, err);

	server.views({
		engines: {
			jade: require('jade')
		},
		isCached: false,
		path: Path.join(__dirname, 'server/templates'),
		compileOptions: {
			pretty: true
		},
		compileMode: 'async'
	});	

	server.route({
		method: 'GET',
		path: '/public/{param*}',
		handler: {
			directory: {
				path: 'public',
				listing: false,
				index: false
			}
		}
	});

	// server.on("log", function(event, tags) {
	//     var tagsJoined = Object.keys(tags).join();
	//     var message = event.data;
	//     console.log("Log entry [" + tagsJoined + "] (" + (message || "") + ")");
	// });

	server.start(function (err) {
		console.log('Server running at:', server.info.uri);
	});
});
