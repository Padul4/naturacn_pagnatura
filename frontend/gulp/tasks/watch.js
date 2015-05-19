var gulp = require('gulp'),
	pkg = require('../../package.json'),
	srcPath = pkg['basePath']['application'],
	dstPath = pkg['basePath']['stage'],
	browserifyBundler = require('../utils/browserifyBundler');

gulp.task('watch', ['preprocessors'],function() {
	gulp.watch(srcPath + '/less/**/*.less', ['less']);
	gulp.watch(srcPath + '/less/template_fixed/*.less', ['less:static']);
	gulp.watch(srcPath + '/js/**/*.js', ['scripts']);
	gulp.watch(srcPath + '/templates/**/*.hbs', ['templates']);
	gulp.watch(srcPath + '/less/bootstrap-vars.less', ['bootstrap:compileLess']);
	browserifyBundler(true)();
});