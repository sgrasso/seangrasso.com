'use strict';

const http = require('http');

module.exports = (username) => {
	const repo_uri = `https://api.github.com/users/${username}/repos`;
	const gist_uri = `https://api.github.com/users/${username}/gists`;
	return getRepos([repo_uri, gist_uri]).then(resp => {
		return JSON.parse(resp);
	}).catch(e => {
		console.log(e);
	});
}

const getRepos = uris => {
	return Promise.all(uris.map(uri => {
		let parsedData = {};
		http.get(uri, (res) => {
			const statusCode = res.statusCode;
			const contentType = res.headers['content-type'];
			let rawData = '', error;

			if (statusCode !== 200) {
				error = new Error(`Request Failed.\n` +
					`Status Code: ${statusCode}`);
			} else if (!/^application\/json/.test(contentType)) {
				error = new Error(`Invalid content-type.\n` +
					`Expected application/json but received ${contentType}`);
			}
			
			if (error) {
				console.log(error.message);
				// consume response data to free up memory
				res.resume();
				throw error;
			}

			res.setEncoding('utf8');
			res.on('data', (chunk) => rawData += chunk);
			res.on('end', () => {
				try {
					parsedData += rawData;
					console.log(parsedData);
					return parsedData;
				} catch (e) {
					console.log(e.message);
					throw e.message;
				}
			});
		}).on('error', (e) => {
			console.log(`Got error: ${e.message}`);
			throw e;
		});
	}));
}