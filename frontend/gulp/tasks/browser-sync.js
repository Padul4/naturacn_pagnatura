var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	browserSyncProps = require('../utils/browserSync-props');

gulp.task('browser-sync', ['preprocessors'], function() {
	browserSync(browserSyncProps);
});