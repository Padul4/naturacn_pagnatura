var pkg = require('../../package.json'),
	dstPath = pkg['basePath']['stage'];

module.exports = {
	files: [
		dstPath + '/json/**/*.json',
		dstPath + '/css/**/*.css',
		dstPath + '/js/**/*.js',
		dstPath + '/**.html',
		dstPath + '/img/**/*.{jpg,jpeg,png,gif,svg}',
		dstPath + '/fonts/**/*.{ttf,eot,otf,woff,svg}'
	],
	server: {
		baseDir: dstPath,
	},
	reloadDelay: 0,
	online: false,

	exclude: false,
	startPath: null,
	ghostMode: {
		clicks: true,
		links: true,
		forms: true,
		scroll: true
	},
	open: true,
	xip: false,
	timestamps: true,
	fileTimeout: 1000,
	injectChanges: true,
	scrollProportionally: true,
	scrollThrottle: 0,
	notify: true,
	host: null,
	excludedFileTypes: [],
	reloadDelay: 0,
	online: true,
	browser: 'chrome'
};