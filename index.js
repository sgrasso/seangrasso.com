var Glue = require('glue');
var manifest = require('./config/manifest.json');
var options = {
  relativeTo: __dirname + '/app'
};

Glue.compose(manifest, options, function (err, server) {

	// server.views({
	//     engines: {
	//         hbs: require('handlebars')
	//     },
	//     relativeTo: __dirname,
	//     path: './app/templates',
	//     layoutPath: './app/templates/layouts',
	//     helpersPath: './app/templates/helpers'
	// });	

	server.start(function (err) {
		console.log('Server running at:', server.info.uri);
	});
});
