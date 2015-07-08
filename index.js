var Glue = require('glue');
var manifest = require('./server/config/manifest.json');
var options = {
  relativeTo: __dirname + '/server'
};

Glue.compose(manifest, options, function (err, server) {

	server.views({
	    engines: {
	        dust: require('dust')
	    },
	    relativeTo: __dirname,
	    path: './server/templates',
	    layout: 'default.dust',
	    layoutPath: './server/templates/layouts'
	    // helpersPath: './server/templates/helpers'
	});	

	server.start(function (err) {
		console.log('Server running at:', server.info.uri);
	});
});
