var debug = require('debug')('main:index');
var Path = require('path');
var Glue = require('glue');
var manifest = require('./server/config/manifest.json');
var options = {
	relativeTo: __dirname + '/server'
};
var port = process.env.PORT || 3500;
manifest.connections.push({port: port});

Glue.compose(manifest, options, function (err, server) {
	
	if (err) {
        throw err;
    }

	server.views({
		engines: {
			jade: require('jade')
		},
		isCached: false,
		path: Path.join(__dirname, 'server/templates'),
		compileOptions: {
			pretty: true
		}
		// compileMode: 'async'
	});	

	server.on('request-error', (request, e) =>{
		debug('Error response (500) sent for request: ' + request.id + ' because: ' + err.message);
	});

	server.start(function (err) {
		console.log('Server running at:', port, 'as', process.env.NODE_ENV);
	});
});
