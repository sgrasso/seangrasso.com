module.exports = function (request, reply) {
	var context = {
		pageTitle: 'Home Page'
	};

	reply.view("home",context, {layout: "iso"})

	reply();
};