/**
 Tarefa que compila os estilos do projeto
 @task less
*/
var path = require('path'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	gulp = require('gulp'),
	handleErrors = require('../utils/handleErrors'),
	pkg = require('../../package.json'),
	srcPath = pkg['basePath']['application'],
	dstPath = pkg['basePath']['stage'],
	minifyCSS = require('gulp-minify-css');

gulp.task('less', function() {
	return gulp.src([
		path.join(srcPath, 'less', 'home.less')
	])
	.pipe(less({
		sourceMap: true,
		outputSourceFiles: true
	}))
	.on('error', handleErrors)
	//.pipe(autoprefixer('last 2 versions'))
	.pipe(minifyCSS())
	.pipe(gulp.dest(path.join(dstPath, 'css')));
});

// template fixo
gulp.task('less:static', function lessStatic() {
	return gulp.src(path.join(srcPath, 'less/template_fixed', 'header.less'))
				.pipe(less())
				.on('error', handleErrors)
				.pipe(minifyCSS())
				.pipe(gulp.dest(path.join(dstPath, 'css')));
});