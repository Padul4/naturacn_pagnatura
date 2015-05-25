// refazer
import Cards from './cards';

var Main = {
  init: function () {
    Cards.init();
    this.bind();
  },
  bind: function() {
    var _that = this;
    $('.pagnatura-modal-box .btn-close').on('click', function() {
      $('#pn-modal').fadeOut(function() {
        $('body').removeClass('modalOpened');
      });
    });
    $('.pagnatura-faixa-wrapper .pagnatura-cloud .btn-link').on('click', function() {
      $('#pn-modal').fadeIn(function() {
        $('body').addClass('modalOpened');
      });
    });
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