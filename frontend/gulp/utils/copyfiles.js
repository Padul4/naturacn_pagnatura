var gulp = require('gulp'),
	changed = require('gulp-changed'),
	path = require('path'),
	pkg = require('../../package.json'),
	srcPath = pkg['basePath']['application'],
	dstPath = pkg['basePath']['stage'];

module.exports = function(from, to) {
	return function() {
		var src = path.join(srcPath, from),
			mirror = path.dirname(from).replace(/\*/g, ''),
			dst = path.join(dstPath, to || mirror);

		console.log('copyfiles from: ' + src);
		console.log('copyfiles to: ' + dst);

		return gulp.src(src)
				   .pipe(changed(dst))
				   .pipe(gulp.dest(dst));
	};
};