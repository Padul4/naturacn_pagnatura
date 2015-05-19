var notify = require('gulp-notify');

module.exports = function() {
	var args = Array.prototype.slice.call(arguments);

	// Send error to notification center
	notify.onError({
		title: "Compile Error",
		message: "<%= error.message %>"
	}).apply(this, args);

	// Keep gulp from handing on this task
	this.emit('end');
};