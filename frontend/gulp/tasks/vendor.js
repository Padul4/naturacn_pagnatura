/**
 Pega todas as bibliotecas e compila em um 
 unico arquivo (./public/js/vendor.min.js)
 @task vendor
*/
var gulp = require('gulp'),
	path = require('path'),
	appPath = path.resolve('app'),
	uglyfy = require('gulp-uglify'),
	concat = require('gulp-concat'),
	pkg = require('../../package.json'),
	srcPath = pkg['basePath']['application'],
	dstPath = pkg['basePath']['stage'],
	bowerPath = path.resolve('bower_components');

gulp.task('vendor', function() {
	var jsDest = dstPath + '/js';

	var bowerize = function(item) {
		return path.join(bowerPath, item);
	};

	var sources = [
		'jquery/dist/jquery.js',
		'greensock/src/uncompressed/TweenLite.js',
		'greensock/src/uncompressed/plugins/CSSPlugin.js'/*,
		'greensock/src/uncompressed/plugins/EaselPlugin.js',
		'greensock/src/uncompressed/easing/EasePack.js'*/
	].map(bowerize);

	var helperFile = path.join(appPath, 'js/helpers.js');
	var YoutubeFile = path.join(appPath, 'js/Youtube.js');
	sources = [helperFile].concat(sources);
	sources.push(YoutubeFile);

	gulp.src(sources)
		.pipe(uglyfy())
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest(jsDest));

	// implementar correcoes do ie 8 a partir daqui
	//var ieSources = [
	//	'html5shiv/dist/html5shiv.js'
	//].map(bowerize);

	//gulp.src(ieSources)
	//	.pipe(uglyfy())
	//	.pipe(concat('vendor-ie.min.js'))
	//	.pipe(gulp.dest(jsDest))
});