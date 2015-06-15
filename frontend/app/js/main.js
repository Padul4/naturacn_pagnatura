// refazer
import Cards from './cards';


var Main = {
  init: function () {
    var _that = this;
    Cards.init();
    this.bind();
    $(window).scroll(function() {
      _that.trackScroll();
    });;
  },
  bind: function() {
    var _that = this;
    $('.pagnatura-modal-box .btn-close, .pagnatura-modal-box .btn-nao-aceito').unbind('click').bind('click', function() {
      $('.pagnatura-modal').fadeOut(function() {
        $('body').removeClass('modalOpened');
      });
    });

    $('.card-details-1 .btn-compre-agora .btn-link').unbind('click').bind('click', function(e) {
      e.preventDefault();
      var namekit = Helper.strings.formatSlug($(this).data('namekit')),
          idModal = $(this).data('idmodal'),
          $modal = $('#pn-modal-' + idModal);

      trackAnalytics('voce-conecta', 'card_adquirir-um-leitor', 'compre-agora_' + namekit);
      $modal.fadeIn(function() {
        trackPageviewGA('/www/consultoria/apoio-ao-consultor/voce-conecta/termos-de-uso/adquirir-um-leitor/' + namekit, 'Voce_Conecta - Termos - Adquirir - ' + namekit + ' | Natura');
        var $btnNao = $modal.find('.btn-nao-aceito .btn-link'),
            $btnYes = $modal.find('.btn-li-aceito .btn-link');

        $('body').addClass('modalOpened');
        var flagHasAttrData = false;
        if (!$btnYes.attr('data-ga')) {
          $btnYes.attr('data-ga', 'voce-conecta|termos_' + namekit + '|aceito');
          flagHasAttrData = true;
        }
        if (!$btnNao.attr('data-ga')) {
          $btnNao.attr('data-ga', 'voce-conecta|termos_' + namekit + '|nao-aceito');
          flagHasAttrData = true;
        }
        if (flagHasAttrData) {
          _that.bind();
        }
      });
    });

    $('.pagnatura-cloud .btn-cadastro .btn-link').unbind('click').bind('click', function() {
      $('#pn-modal-cloud').fadeIn(function() {
        trackPageviewGA('/www/consultoria/apoio-ao-consultor/voce-conecta/termos-de-uso/faca-seu-cadastro', 'Voce_Conecta - Termos - Faca Seu Cadastro | Natura');
        $('body').addClass('modalOpened');
      });
    });

    $('[data-ga]').unbind('clik').bind('click', function(event) {
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
    var _that = this;
    if (this.scrollControl) {
      clearTimeout(this.scrollControl);
    }

    this.scrollControl = setTimeout(function() {
      _that.trackScrollBytag();
    }, 300);
  },
  trackScrollBytag: function() {
    var scrollTop = $(window).scrollTop(),
        $els = $('[data-trackscroll]');

    if ($els.length) {
      $.each($els, function() {
        var y = $(this).offset().top;
        if ($(this).is(':visible')) {
          if (scrollTop >= y && scrollTop <= (y + $(this).height())) {
            var data = $(this).data('trackscroll').split('|');
            if ($(this).data('trackscrollend')) {
              var full = (75 / 100) * $(this).height();
              if (scrollTop >= (y + full)) {
                trackAnalytics(data[0], data[1], data[2]);
              }
            } else {
              trackAnalytics(data[0], data[1], data[2]);
            }
          }
        }
      });
    }
  }
};

$(document).ready(function() {
	Main.init();

  // Simular valor button
  $('.btn-simular-option').on('click', function (e){
    var $valorPocentagem = $('.valor-porcentagem');
    var $valorPocentagemReal= $('.valor-porcentagem.real');


    $('.btn-simular-option').removeClass('selected');
    $(this).addClass('selected');
    $valorPocentagem.text($(this).attr('data-porcentagem'));
    $valorPocentagemReal.text($(this).attr('data-real'));
    //return false;
  });

  // Simular valor button list-of-cards
  $('.pagnatura-beneficios .btn-saiba-mais, .pagnatura-beneficios btn-compre-agora').on('click', function (e){
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