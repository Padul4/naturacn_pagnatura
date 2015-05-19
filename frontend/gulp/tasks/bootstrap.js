var gulp = require('gulp'),
	path = require('path'),
	bowerPath = path.resolve('bower_components'),
	appPath = path.resolve('app'),
	tmpPath = path.resolve('tmp'),
	less = require('gulp-less'),
	handleErrors = require('../utils/handleErrors'),
	minifyCSS = require('gulp-minify-css'),
	pkg = require('../../package.json'),
	srcPath = pkg['basePath']['application'],
	dstPath = pkg['basePath']['stage'],
	rename = require('gulp-rename');

gulp.task('bootstrap:copyOriginalFiles', function copyOriginalFiles() {
	return gulp.src(path.join(bowerPath, 'bootstrap/less/**/*.less'))
		   		.pipe(gulp.dest(path.join(tmpPath, 'bootstrap')));
});

gulp.task('bootstrap:prepareLess', ['bootstrap:copyOriginalFiles'], function bootstrapPrepareLess() {
	return 	gulp.src(path.join(appPath, 'less/bootstrap-vars.less'))
				.pipe(rename('variables.less'))
				.pipe(gulp.dest(path.join(tmpPath, 'bootstrap')));
});

gulp.task('bootstrap:compileLess', ['bootstrap:prepareLess'], function bootstrapCompileLess() {
	return gulp.src(path.join(tmpPath, 'bootstrap/bootstrap.less'))
				.pipe(less({
					sourceMap: true,
					outputSourceFiles: true
				}))
				.on('error', handleErrors)
				.pipe(minifyCSS())
				.pipe(gulp.dest(path.join(dstPath, 'css')));
});

