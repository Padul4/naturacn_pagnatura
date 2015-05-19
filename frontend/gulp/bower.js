/**
 Gerencia configuracao Bower
*/
var gulp = require('gulp'),
	bower = require('gulp-bower');

module.exports = function() {
	return bower()
			.pipe(gulp.dest('../bower_components'));
}