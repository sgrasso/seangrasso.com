module.exports = {
	"server": {
		"port": (process.env.NODE_ENV === 'production') ? '/tmp/nginx.socket' : 4500,
		"app": {
			"twitter_screenName": "spgrasso",
			"twitter": {
				consumer_key: '334411907-eUFgG3msJ2GygvSyX0YblqoTaGcJ28Dp4XZtcKES',
				consumer_secret: '36BurXoAG3nEtg9inEONgz2vy5FKOXsyzyRR0Tw2KJy59',
				access_token_key: '8jRdW2atXziHvudGnkkymvi6I',
				access_token_secret: 'h7qZWpzOj59JSSrKY3demY31GUjj8dwEXKZ08Vk7oFWqykOKAM'
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
