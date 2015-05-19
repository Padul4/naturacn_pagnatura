var gulp = require('gulp'),
	browserifyBundler = require('../utils/browserifyBundler');

gulp.task('scripts', browserifyBundler(false));