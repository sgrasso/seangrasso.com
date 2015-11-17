var Glue = require('glue');
var Hoek = require('hoek');
var manifest = require('./server/config/manifest.json');
var options = {
  relativeTo: __dirname + '/server',
};

Glue.compose(manifest, options, function (err, server) {
	Hoek.assert(!err, err);

	server.views({
	    engines: {
	        jade: require('jade')
	    },
	    relativeTo: __dirname,
	    path: './server/templates',
	    layoutPath: './server/templates/layouts',
	    partialsPath: './server/templates/partials'
	});	

	server.route({
	    method: 'GET',
	    path: '/public/{param*}',
	    handler: {
	        directory: {
	            path: 'public'
	        }
	    }
	});

	server.start(function (err) {
		console.log('Server running at:', server.info.uri);
	});
});
