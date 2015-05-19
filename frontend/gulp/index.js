/**
 Aplica as tarefas do diretorio ./gulp/tasks
 ao projeto
*/
var fs = require('fs'),
	onlyScripts = require('./utils/scriptFilter'),
	tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasks.forEach(function(task) {
	require('./tasks/' + task);
});