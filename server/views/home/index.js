exports.register = function (server, options, next) {
 
  server.route({
    path: '/',
    method: 'GET',
    handler: require('./home')
  });
 
  next();
 
};
 
exports.register.attributes = {
  pkg: {
  	name: "Home page",
  	version: "1.0"
  }
};