module.exports = {
	"server": {
		"port": (process.env.NODE_ENV === 'production') ? '/tmp/nginx.socket' : 4500,
		"app": {
			"twitter_screenName": "spgrasso",
			"twitter": {
				consumer_key: process.env.twitter_consumer_key,
				consumer_secret: process.env.twitter_consumer_secret,
				access_token_key: process.env.twitter_access_token,
				access_token_secret: process.env.twitter_access_token_secret
			}
		},
		"router": {
			"stripTrailingSlash": true
		},
		"debug": {
			"request": ["error", "debug", "info"],
			"log": ["error", "debug", "info"]
		}
	},
	"register": {
		"plugins": [
		{
			"plugin": "inert"
		},
		{
			"plugin": "vision"
		},
		{
			"plugin": "./views/home"
		},
		{
			"plugin": "./views/subview"
		},
		{
			"plugin": "good",
			"options": {
				"reporters": {
					"request": [{
						"module": "good-squeeze",
						"name": "Squeeze",
						"args": [{
							"request": ["error"],
							"log": ["error"],
							"error": "*"
						}]
					}, {
						"module": "good-file",
						"args": ["logs/error.log"]
					}],
					"server": [{
						"module": "good-squeeze",
						"name": "Squeeze",
						"args": [{
							"request": ["debug", "info"],
							"log": ["debug", "info"]
						}]
					}, {
						"module": "good-file",
						"args": ["logs/debug.log"]
					}]
				}
			}
		}
	]}
}
