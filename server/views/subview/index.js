'use strict';

exports.register = (server, options, next) => {
 
  server.route({
    path: '/{subview}',
    method: 'GET',
    handler: require('./subview')
  });
 
  next();
};
 
exports.register.attributes = {
  pkg: {
  	name: "SubView Page",
  	version: "1.0"
  }
};