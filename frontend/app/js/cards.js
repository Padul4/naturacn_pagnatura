var Cards = {
	init: function() {
		this.setEls();
		this.build();
		this.bind();
		this.setPageProps();
		console.log(this.isOpened);
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
				_that.$listCards.fadeOut();
				_that.showContent(index, function() {
					_that.$father.addClass('actived');
					_that.goTo(index);
				});
			}
		});
		this.$close.on('click', function() {
			_that.hideContent(function() {
				_that.$father.removeClass('actived');
				_that.$listCards.fadeIn();
			});
		});
	},
	goTo: function(index) {
		var _that = this;
		var value = '-' + this.itemSize * index + 'px';
		var anima = TweenLite.to(this.$wrap, 1, {x: value});
		console.log(this.isOpened);
		this.c_item = index;
		anima.eventCallback('onComplete', function() {
			_that.changeBulet();
			_that.setPageProps();
		});
	},
	next: function() {
		var target = this.c_item + 1;
		if (target >= this.totalItems) {
			this.c_item = this.totalItems;
			return false;
		}
		this.goTo(target);
	},
	prev: function() {
		var target = this.c_item - 1;
		if (target < 0) {
			this.c_item = 0;
			return false;
		}
		this.goTo(target);	
	},
	changeBulet: function() {
		this.$bulets.removeClass('actived');
		this.$bulets.eq(this.c_item).addClass('actived');
	},
	getPageProps: function() {
		var $card = this.$cards.eq(this.c_item);
		return {
			title: $card.data('title'),
			pgSize: $card.data('size') 
		}
	},
	setPageProps: function() {
		var data = this.getPageProps();
		$('.hd-content').html(data.title);
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
		var anima = TweenLite.to(this.$father, 0.5, {top: '-1000px'});
		anima.eventCallback('onComplete', function() {
			callback();
		});
	}
};
export default Cards;