var Pr = window.Pr || {};

// Youtube API
//-------------------------------------------------------------
(function () {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}());

// Youtube
//-------------------------------------------------------------
Pr.Youtube = (function () {
	
	var players = [],
		defaults = {
			width: false,
			height: false,
			pauseOthers: true,
			playerVars: {
		        rel: 0,
		        showinfo: 0,
		        wmode: 'opaque'
		    }
		},
		publicObj = {};

	// Public Methods
	//----------------------------------------------
	publicObj.onReady = function (callback) {
		var listener = setInterval(function () {
		    if(typeof(YT) !== 'undefined' && typeof(YT.Player) !== 'undefined') {
		        clearInterval(listener);
		        if(callback) callback();
		    }
		}, 200);
	};

	publicObj.createPlayer = function ($wrapper, options) {

		var ytOptions = $.extend(true, {}, defaults, options),
			ytPlayer,
			ytControls;

		// set defaults dimensions
		ytOptions.width = ytOptions.width || $wrapper.width();
		ytOptions.height = ytOptions.height || $wrapper.height();

		// set controls and create player
		if(typeof ytOptions.playerVars.controls === 'object') {
			var $controls = ytOptions.playerVars.controls;
			ytOptions.playerVars.controls = 0;
			ytPlayer = Pr.YTPlayer($wrapper, ytOptions);
			ytControls = Pr.YTControls($controls, ytPlayer);
		} else {
			ytPlayer = Pr.YTPlayer($wrapper, ytOptions);
		};

		// pause others players
		if(ytOptions.pauseOthers) {
			ytPlayer.addListener('playing', function () {
				Pr.Youtube.pauseAllVideos(ytPlayer);
			});
		}

		// save on players list
		players.push(ytPlayer);
		
		// return player
		return ytPlayer;
	};

	publicObj.pauseAllVideos = function (videoToAvoidPause) {
		
		var pauseFn = (function () {
				if(videoToAvoidPause) {
					return function (currentPlayer) {
						if(currentPlayer != videoToAvoidPause) {
							currentPlayer.pauseVideo();
						}
					}
				};
				return function (currentPlayer) {
					currentPlayer.pauseVideo();
				}
			}());

		for(var i = 0; i < players.length; i++) {
			pauseFn(players[i]);
		}
	};

	return publicObj;

}());

Pr.YTPlayer = function ($wrapper, options) {

	var listeners = {},
		player,
		progress,
		currentVideoId,
		bool25 = false,
		bool50 = false,
		bool75 = false;

	// Constructor
	//----------------------------------------------
	// set events
	options.events = {
		'onReady': onPlayerReady
	};

	// create player
	player = new YT.Player($wrapper[0], options);

	// save current video Id
	currentVideoId = options.videoId;

	// Public
	//----------------------------------------------
	player.addListener = function (event, fn) {
		if(!listeners.hasOwnProperty(event)) {
			listeners[event] = [];
		}
		listeners[event].push(fn);
	};

	player.changeVideo = function (href) {
		bool25 = false;
		bool50 = false;
		bool75 = false;
		player.loadVideoById(href);
	};

	// Private
	//----------------------------------------------
	function dispatchEvent (event, params) {
		if(typeof(listeners[event]) === 'object') {
			$.each(listeners[event], function (i, callback) {
				callback($wrapper, params);
			});
		};
	};

	function onPlayerReady (event) {
		dispatchEvent('ready');
		player.addEventListener('onStateChange', onPlayerStateChange);
	};

	function onPlayerStateChange (event) {
		switch (event.data) {
			case YT.PlayerState.ENDED:
				stopVideoProgress();
				dispatchEvent('ended');
				break;
			case YT.PlayerState.PLAYING:
				startVideoProgress();
				dispatchEvent('playing');
				break;
			case YT.PlayerState.PAUSED:
				stopVideoProgress();
				dispatchEvent('paused');
				break;
			case YT.PlayerState.BUFFERING:
				dispatchEvent('buffering');
				break;
			case YT.PlayerState.CUED:
				dispatchEvent('cued');
				break;
		};
	};
	
	function startVideoProgress () {
		
		var testGA = listeners.hasOwnProperty('progressGA'),
			testProgress = listeners.hasOwnProperty('progress'),
			duration = player.getDuration(),
			percent;
		
		if(testGA || testProgress) {
			progress = setInterval(function () {
				
				// calculate percent
				percent = player.getCurrentTime() / duration;
				
				// dispatch analytics
				if(testGA) {
					if(!bool25 && percent > 0.25) {
						bool25 = true;
						dispatchEvent('progressGA', 25);
					} else if(!bool50 && percent > 0.50) {
						bool50 = true;
						dispatchEvent('progressGA', 50);
					} else if(!bool75 && percent > 0.75) {
						bool75 = true;
						dispatchEvent('progressGA', 75);
					}
				};

				// dispatch progress
				if(testProgress) dispatchEvent('progress', percent);

			}, 200);
		}
	};

	function stopVideoProgress () {
		if(progress) clearInterval(progress);
	};

	return player;
};

Pr.YTControls = function ($wrapper, player) {

	var $btTogglePlay = $wrapper.find('.bt-play-pause-art'),
		$btToggleMute = $wrapper.find('.bt-mute-unmute-art');

	// Constructor
	//----------------------------------------------
	setupPlayerListeners();
	
	// Private
	//----------------------------------------------
	function setupPlayerListeners () {

		player.addListener('ready', setupControls);
		
		player.addListener('playing', function () {
			$btTogglePlay.addClass('pause');
		});

		player.addListener('paused', function () {
			$btTogglePlay.removeClass('pause');
		});
	};

	function setupControls () {

		$btTogglePlay.click(function (event) {
			$btTogglePlay.hasClass('pause') ? pauseVideo() : playVideo();
		});
		
		$btToggleMute.click(function (event) {
			$btToggleMute.hasClass('mute') ? muteOff() : muteOn();
		});
		
		$btToggleMute[player.isMuted() ? 'addClass' : 'removeClass']('mute');
	};
	
	function playVideo () {
		player.playVideo();
		$btTogglePlay.addClass('pause');
	};

	function pauseVideo () {
		player.pauseVideo();
		$btTogglePlay.removeClass('pause');
	};

	function muteOn () {
		player.mute();
		$btToggleMute.addClass('mute');
	};

	function muteOff () {
		player.unMute();
		$btToggleMute.removeClass('mute');
	}
};