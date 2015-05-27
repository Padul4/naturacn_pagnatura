// refazer
import Cards from './cards';

var Main = {
  init: function () {
    Cards.init();
    this.bind();
  },
  bind: function() {
    var _that = this;
    $('.pagnatura-modal-box .btn-close, .pagnatura-modal-box .btn-nao-aceito').on('click', function() {
      $('#pn-modal').fadeOut(function() {
        $('body').removeClass('modalOpened');
      });
    });
    $('.pagnatura-faixa-wrapper .pagnatura-cloud .btn-link, .pagnatura-beneficios .btn-compre-agora, .card-details-1 .btn-compre-agora').on('click', function() {
      $('#pn-modal').fadeIn(function() {
        $('body').addClass('modalOpened');
      });
    });
    $('[data-ga]').click(function(event) {
      var data = $(this).data('ga').split('|');
      if (data[3] && data[3] === "waitredirect") {
        event.preventDefault();
        trackGARedirect($(this), data[0], data[1], data[2]);
      } else {
        trackAnalytics(data[0], data[1], data[2]);
      }
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