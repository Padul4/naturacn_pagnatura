var Cards = {
	init: function() {
		this.setEls();
		this.build();
		this.bind();
		this.setPageProps();
		this.setPlayers();
	},
	setEls: function() {
		this.$btnLeft = $('.card-det .btn-arrow.left');
		this.$btnRight = $('.card-det .btn-arrow.right');
		this.$viewport = $('.card-det-viewport');
		this.$wrap = $('.card-det-wrap');
		this.$bulets = $('.bulets .bulet');
		this.$cards = $('.card-item');
		this.$listCards = $('.list-of-cards');
		this.$close = $('.card-det .btn-close');
		this.$father = $('.card-det');
		this.$section = $('.pagnatura-cards');
		this.$cdpTab = $('.cdp-tab');
		this.$comoConf = $('.card-item.como-configurar .media-holder-video');
		this.$comoUtil = $('.card-item.como-utilizar .media-holder-video');

		this.c_item = 0;
		this.itemSize = 980;
		this.totalItems = this.$cards.size();
		this.isOpened = false;
	},
	build: function() {
		this.$wrap.width(this.totalItems * this.itemSize);
	},
	bind: function() {
		var _that = this;
		this.$btnRight.on('click', function() {
			_that.next();
		});
		this.$btnLeft.on('click', function() {
			_that.prev();
		});
		$('.btn-card-saiba-mais').on('click', function(e) {
			e.preventDefault();
			var index = $(this).parents('.card-wrapper').index();
			if (_that.isOpened) {
				_that.goTo(index)
			} else {
				_that.$section.addClass('clr-margin');
				_that.$listCards.fadeOut();
				_that.showContent(index, function() {
					_that.$father.addClass('actived');
					_that.setHeight();
					_that.goTo(index);
				});
			}
		});
		$('.btn-print').on('click', function(e) {

		})
		this.$close.on('click', function() {
			_that.hideContent(function() {
				_that.clearHeight();
				_that.$section.removeClass('clr-margin');
				_that.$father.removeClass('actived');
				_that.$listCards.fadeIn();
			});
		});
		this.$cdpTab.on('click', function() {
			var tab = $(this).data('tab');
			_that.$cdpTab.removeClass('actived');
			$(this).addClass('actived');
			_that.changeTab(tab);
			ga('send', 'event', 'Vc_Conecta', 'Aba_' + tab, 'Botao');
		});
	},
	goTo: function(index) {
		var _that = this;
		var value = '-' + this.itemSize * index + 'px';
		var anima = TweenLite.to(this.$wrap, 1, {x: value});
		this.c_item = index;
		anima.eventCallback('onStart', function() {
			Pr.Youtube.pauseAllVideos();
		});
		anima.eventCallback('onComplete', function() {
			_that.setHeight();
			_that.changeBulet();
			_that.setPageProps();

			// track
			var data = _that.getPageProps();
			ga('send', 'pageview', {
			  'page': '/www/consultoria/apoio-ao-consultor/voce-conecta/light-box/' + data.titTrack,
			  'title': 'Voce conecta - Light Box - ' + data.title + ' | Natura'
			});
		});
	},
	next: function() {
		var target = this.c_item + 1;
		if (target >= this.totalItems) {
			this.c_item = this.totalItems;
			return false;
		}
		var data = this.getPageProps(target);
		ga('send', 'event', 'Vc_Conecta', data.titTrack, 'Botao');
		this.goTo(target);
	},
	prev: function() {
		var target = this.c_item - 1;
		if (target < 0) {
			this.c_item = 0;
			return false;
		}
		var data = this.getPageProps(target);
		ga('send', 'event', 'Vc_Conecta', data.titTrack, 'Botao');
		this.goTo(target);	
	},
	changeBulet: function() {
		this.$bulets.removeClass('actived');
		this.$bulets.eq(this.c_item).addClass('actived');
	},
	getPageProps: function(index) {
		var index = (typeof index !== "undefined") ? index : this.c_item;
		var $card = this.$cards.eq(index);
		return {
			title: $card.data('title'),
			pgSize: $card.data('pgsize'),
			titTrack: $card.data('tittrack') 
		}
	},
	setPageProps: function() {
		var data = this.getPageProps();
		$('.hd-content').html(data.title);
	},
	setPlayers: function() {
		var _that = this;
		Pr.Youtube.onReady(function () {
			_that.plrComoConf = Pr.Youtube.createPlayer(_that.$comoConf, {
				videoId: 'CYE6sl7RFxI'
			});
			_that.plrFrasco = Pr.Youtube.createPlayer(_that.$comoUtil, {
				videoId: 'Vjp8WpkTcEI'
			});
			
			_that.plrComoConf.addListener('playing', tagPlayVideo);
			_that.plrComoConf.addListener('progressGA', tagProgressVideo);
			_that.plrComoConf.addListener('ended', tagEndedVideo);

			// listeners
			_that.plrFrasco.addListener('playing', tagPlayVideo);
			_that.plrFrasco.addListener('progressGA', tagProgressVideo);
			_that.plrFrasco.addListener('ended', tagEndedVideo);
		});

	    function tagPlayVideo ($p) {
	      trackAnalytics('pagnatura', $p.data('name'), 'play');
	    };

	    function tagProgressVideo ($p, percent) {
	      trackAnalytics('pagnatura', $p.data('name'), percent.toString());
	    };

	    function tagEndedVideo ($p) {
	      trackAnalytics('pagnatura', $p.data('name'), '100');
	    };
	},
	showContent: function(index, callback) {
		var callback = callback || function() {};
		var anima = TweenLite.to(this.$father, 0.5, {top: '0px'});
		anima.eventCallback('onComplete', function() {
			callback();
		});
	},
	hideContent: function(callback) {
		var callback = callback || function() {};
		var anima = TweenLite.to(this.$father, 0.5, {top: '-2000px'});
		anima.eventCallback('onComplete', function() {
			callback();
		});
	},
	setHeight: function(size) {
		var size = size || null;
		var $els = [this.$section, this.$father];
		var data = this.getPageProps();
		var _heigth = size ? size : data.pgSize;
		var anima = TweenLite.to($els, 0.5, {height: _heigth});
		anima.eventCallback('onComplete', function() {
			//console.log('finalizou a funcao');
		});
	},
	clearHeight: function() {
		this.$section.height('auto');
		this.$father.height('auto');
	},
	changeTab: function(tab) {
		var $tabs = $('.cdp-tab-wrapcont');
		$tabs.hide();
		if (tab == "transferir") {
			this.setHeight(740);
		} else {
			this.setHeight();
		}
		$('.cdp-tab-wrapcont[data-tab="' + tab + '"]').show();
	}
};
export default Cards;