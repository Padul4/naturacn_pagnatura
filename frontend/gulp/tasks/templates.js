/**
 Tarefa de geracao de templates pre-compiados.
 Para dar manutencao no conteudo pre-compilado, acessar o diretorio /app/templates/pre-compile-info
 O arquivo default.js contem as informacoes de caminho, titulo, descricao, etc. Caso se caso o projeto
 possuir mais sessoes, e necessario adaptar o codigo abaixo.

 @todo: Criar logica para alterar os dados pre-compilados em multiplas sessoes
 @task templates
*/
var gulp = require('gulp'),
	path = require('path'),
	appPath = path.resolve('app'),
	resourcesPath = path.resolve('../resources'),
	handlebars = require('gulp-compile-handlebars'),
	rename = require('gulp-rename'),
	pkg = require('../../package.json'),
	srcPath = pkg['basePath']['application'],
	dstPath = pkg['basePath']['stage'],
	preCompDataPath = pkg['basePath']['preCompile'],
	preCompData = require(preCompDataPath + '/default'),
	options = {
		ignorePartials: true,
		batch: [srcPath + '/templates/partials']
	};

gulp.task('templates', function() {

	gulp.src(srcPath + '/templates/*.hbs')
		.pipe(handlebars(preCompData, options))
		.pipe(rename(function(path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest(dstPath));
});

/**
 Compila arquivos para ambiente de QA
*/
gulp.task('templates:salveqa', function salveqa() {
	var envPath = path.join(resourcesPath, 'profiles/salveqa/frontend/app');

	var preCompData = require(path.join(envPath, 'templates/pre-compile-info', 'default'));

	 gulp.src(path.join(appPath, 'templates', '*.hbs'))
		.pipe(handlebars(preCompData, options))
		.pipe(rename(function(path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest(path.join(envPath, 'public')));
});

/**
 Compila arquivos para ambiente de Stage
*/
gulp.task('templates:stage', function stage() {
	var envPath = path.join(resourcesPath, 'profiles/stage/frontend/app');

	var preCompData = require(path.join(envPath, 'templates/pre-compile-info', 'default'));

	 gulp.src(path.join(appPath, 'templates', '*.hbs'))
		.pipe(handlebars(preCompData, options))
		.pipe(rename(function(path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest(path.join(envPath, 'public')));
});

/**
 Compila arquivos para ambiente de Producao
*/
gulp.task('templates:prod', function prod() {
	var envPath = path.join(resourcesPath, 'profiles/prod/frontend/app');

	var preCompData = require(path.join(envPath, 'templates/pre-compile-info', 'default'));

	 gulp.src(path.join(appPath, 'templates', '*.hbs'))
		.pipe(handlebars(preCompData, options))
		.pipe(rename(function(path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest(path.join(envPath, 'public')));
});