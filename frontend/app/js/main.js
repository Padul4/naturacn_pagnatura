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

  $('.scroll-pane').jScrollPane();
  
  // Simular valor button

  $('.btn-simular-option').click(function (){
    var $valorPocentagem = $('.valor-porcentagem');
    var $valorPocentagemReal= $('.valor-porcentagem.real');
    event.preventDefault();
    $('.btn-simular-option').removeClass('selected');
    $(this).addClass('selected');
    $valorPocentagem.text($(this).attr('data-porcentagem'));
    $valorPocentagemReal.text($(this).attr('data-real'));
  });

  // Simular valor button list-of-cards
  $('.pagnatura-beneficios .btn-saiba-mais').click(function (){
    event.preventDefault();
    $('html,body').animate({scrollTop: $('.list-of-cards').offset().top},'slow');
  });

  $('.btn-imprimir-tabela .btn-print').click(function() {
    event.preventDefault();
    window.open($(this).attr('href'), "", "width=1024, height=900");
  });
  
});