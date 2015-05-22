// refazer
import Cards from './cards';
var Main = {
	init: function () {
		Cards.init();
	}
};
$(document).ready(function() {
	Main.init();
});