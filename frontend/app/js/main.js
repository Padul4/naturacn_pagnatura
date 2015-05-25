// refazer
import Cards from './cards';
//import Youtube from './Youtube';

var Main = {
  init: function () {
    Cards.init();
  }
};
$(document).ready(function() {
	Main.init();

  // Simular valor button
  $('.btn-simular-option').click(function (){
    event.preventDefault();
    $('.btn-simular-option').removeClass('selected');
    $(this).addClass('selected');
  });
  
});