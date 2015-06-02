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
      $('#pn-modal, #pn-modal-2').fadeOut(function() {
        $('body').removeClass('modalOpened');
      });
    });

    $('.card-details-1 .btn-compre-agora .btn-link').on('click', function(e) {
      e.preventDefault();
      var namekit = $(this).data('namekit');
      trackAnalytics('voce-conecta', 'card_adquirir-um-leitor', 'compre-agora_' + namekit);
      $('#pn-modal').fadeIn(function() {
        trackPageviewGA('/www/consultoria/apoio-ao-consultor/voce-conecta/termos-de-uso/adquirir-um-leitor/' + namekit, 'Voce_Conecta - Termos - Adquirir - ' + namekit + ' | Natura');
        $('body').addClass('modalOpened');
        $('#pn-modal').find('.btn-nao-aceito .btn-link').data('ga', 'voce-conecta|termos_' + namekit + '|nao-aceito');
        $('#pn-modal').find('.btn-li-aceito .btn-link').data('ga', 'voce-conecta|termos_' + namekit + '|aceito');
        _that.bind();
      });
    });

    $('.pagnatura-cloud .btn-cadastro .btn-link').on('click', function() {
      $('#pn-modal-2').fadeIn(function() {
        trackPageviewGA('/www/consultoria/apoio-ao-consultor/voce-conecta/termos-de-uso/faca-seu-cadastro', 'Voce_Conecta - Termos - Faca Seu Cadastro | Natura');
        $('body').addClass('modalOpened');
      });
    });

    $('[data-ga]').on('click', function(event) {
      var data = $(this).data('ga').split('|');
      if (data[3] && data[3] === "waitredirect") {
        event.preventDefault();
        trackGARedirect($(this), data[0], data[1], data[2]);
      } else {
        trackAnalytics(data[0], data[1], data[2]);
      }
    });
  },
  trackScroll: function() {
    // $(window).scroll(function() {
    //   var height = $(window).scrollTop();
    //   console.log(height);
    // });
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
  $('.pagnatura-beneficios .btn-saiba-mais, .pagnatura-beneficios btn-compre-agora').click(function (e){
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
      TweenLite.to($labelConecta, 0.5, {right: -40, ease:Quad.easeInOut});
      TweenLite.to($textHover, 0.5, {alpha:1, ease:Quad.easeInOut});
    });
    $holder.on('mouseout', function() {
      TweenLite.to($labelConecta, 0.5, {right: -130, ease:Quad.easeInOut});
      TweenLite.to($textHover, 0.5, {alpha:0, ease:Quad.easeInOut});
    });
  }

  animaLabel();

});