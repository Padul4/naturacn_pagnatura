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
    $('.pagnatura-faixa-wrapper .pagnatura-cloud .btn-link, .card-details-1 .btn-compre-agora').on('click', function() {
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

  $('.scrollpane').jScrollPane();
  
  // Simular valor button
  $('.btn-simular-option').click(function (e){
    var $valorPocentagem = $('.valor-porcentagem');
    var $valorPocentagemReal= $('.valor-porcentagem.real');


    $('.btn-simular-option').removeClass('selected');
    $(this).addClass('selected');
    $valorPocentagem.text($(this).attr('data-porcentagem'));
    $valorPocentagemReal.text($(this).attr('data-real'));
    //return false;
  });

  // Simular valor button list-of-cards
  $('.pagnatura-beneficios .btn-saiba-mais').click(function (e){
    e.preventDefault();
    $('html,body').animate({scrollTop: $('.pagnatura-cards').offset().top},'slow');
  });

  $('.btn-imprimir-tabela .btn-print').click(function (e) {
    e.preventDefault();
    window.open($(this).attr('href'), "", "width=1024, height=900");
  });
  
  // Anima Label "Você_Conect@"
  function animaLabel(){
    var $holder = $('.voce-conecta-label-holder'),
        $labelConecta = $('.label-vc-conecta'),
        $textHover = $('.text-hover');

    $holder.on('mouseover', function() {
      TweenLite.to($labelConecta, 1, {right: -40, ease:Quad.easeInOut});
      TweenLite.to($textHover, 1, {alpha:1, ease:Quad.easeInOut});
    });
    $holder.on('mouseout', function() {
      TweenLite.to($labelConecta, 1, {right: -130, ease:Quad.easeInOut});
      TweenLite.to($textHover, 0.5, {alpha:0, ease:Quad.easeInOut});
    });
  }

  animaLabel();

});