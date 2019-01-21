'use strict';

const https = require('https');

module.exports = (username) => {
	const repo_uri = `https://api.github.com/users/${username}/repos`;
	const gist_uri = `https://api.github.com/users/${username}/gists`;
	return getRepos([repo_uri, gist_uri]).then(resp => {
		return resp;
	}).catch(e => {
		console.log(e);
	});
}

const getRepos = uris => {
	return Promise.all(uris.map(uri => {
		let parsedData = {};
		// let options = {
		// 	url: 'https://api.github.com/users/sgrasso/repos?access_token=c70c3c398737fd5588482cd68817463822647197',
		// 	headers: {
		// 		Accept: 'application/vnd.github.v3+json'
		// 	},
		// 	token: 'c70c3c398737fd5588482cd68817463822647197'
		// }
		https.get('https://api.github.com/users/sgrasso/repos?access_token=c70c3c398737fd5588482cd68817463822647197', res => {
			const statusCode = res.statusCode;
			const contentType = res.headers['content-type'];
			let rawData = '';
			let error = null;

			if (statusCode !== 200) {
				error = new Error(`Request Failed.\n` +
					`Status Code: ${statusCode}`);
			} else if (!/^application\/json/.test(contentType)) {
				error = new Error(`Invalid content-type.\n` +
					`Expected application/json but received ${contentType}`);
			}
			
			if (error) {
				// consume response data to free up memory
				res.resume();
				throw error;
			}

			res.setEncoding('utf8');
			res.on('data', chunk => rawData += chunk);
			res.on('end', () => {
				console.log(rawData)
				try {
					parsedData += rawData;
					return parsedData;
				} catch (e) {
					throw e.message;
				}
			});
		}).on('error', (e) => {
			console.log(`Got error: ${e.message}`);
			throw e;
		});
	}));
}