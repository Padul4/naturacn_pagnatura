var gulp = require('gulp');

gulp.task('default', [
	'vendor',
	'templates',
	'less:static',
	'browser-sync',
	'watch'
]);