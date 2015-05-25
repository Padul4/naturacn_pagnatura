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
  
  //Youtube.js
  var Pr=window.Pr||{};!function(){var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(),Pr.Youtube=function(){var e=[],t={width:!1,height:!1,pauseOthers:!0,playerVars:{rel:0,showinfo:0,wmode:"opaque"}},a={};return a.onReady=function(e){var t=setInterval(function(){"undefined"!=typeof YT&&"undefined"!=typeof YT.Player&&(clearInterval(t),e&&e())},200)},a.createPlayer=function(a,n){var r,s,o=$.extend(!0,{},t,n);if(o.width=o.width||a.width(),o.height=o.height||a.height(),"object"==typeof o.playerVars.controls){var u=o.playerVars.controls;o.playerVars.controls=0,r=Pr.YTPlayer(a,o),s=Pr.YTControls(u,r)}else r=Pr.YTPlayer(a,o);return o.pauseOthers&&r.addListener("playing",function(){Pr.Youtube.pauseAllVideos(r)}),e.push(r),r},a.pauseAllVideos=function(t){for(var a=function(){return t?function(e){e!=t&&e.pauseVideo()}:function(e){e.pauseVideo()}}(),n=0;n<e.length;n++)a(e[n])},a}(),Pr.YTPlayer=function(e,t){function a(t,a){"object"==typeof d[t]&&$.each(d[t],function(t,n){n(e,a)})}function n(){a("ready"),u.addEventListener("onStateChange",r)}function r(e){switch(e.data){case YT.PlayerState.ENDED:o(),a("ended");break;case YT.PlayerState.PLAYING:s(),a("playing");break;case YT.PlayerState.PAUSED:o(),a("paused");break;case YT.PlayerState.BUFFERING:a("buffering");break;case YT.PlayerState.CUED:a("cued")}}function s(){var e,t=d.hasOwnProperty("progressGA"),n=d.hasOwnProperty("progress"),r=u.getDuration();(t||n)&&(i=setInterval(function(){e=u.getCurrentTime()/r,t&&(!l&&e>.25?(l=!0,a("progressGA",25)):!f&&e>.5?(f=!0,a("progressGA",50)):!p&&e>.75&&(p=!0,a("progressGA",75))),n&&a("progress",e)},200))}function o(){i&&clearInterval(i)}var u,i,c,d={},l=!1,f=!1,p=!1;return t.events={onReady:n},u=new YT.Player(e[0],t),c=t.videoId,u.addListener=function(e,t){d.hasOwnProperty(e)||(d[e]=[]),d[e].push(t)},u.changeVideo=function(e){l=!1,f=!1,p=!1,u.loadVideoById(e)},u},Pr.YTControls=function(e,t){function a(){t.addListener("ready",n),t.addListener("playing",function(){i.addClass("pause")}),t.addListener("paused",function(){i.removeClass("pause")})}function n(){i.click(function(){i.hasClass("pause")?s():r()}),c.click(function(){c.hasClass("mute")?u():o()}),c[t.isMuted()?"addClass":"removeClass"]("mute")}function r(){t.playVideo(),i.addClass("pause")}function s(){t.pauseVideo(),i.removeClass("pause")}function o(){t.mute(),c.addClass("mute")}function u(){t.unMute(),c.removeClass("mute")}var i=e.find(".bt-play-pause-art"),c=e.find(".bt-mute-unmute-art");a()};
    
  // Youtube Setup

  (function () {
          
    var player;
    var playerFrasco;
    var videoHolderConfigurar = $('.card-item.como-configurar .media-holder-video');
    var videoHolderUtilizar = $('.card-item.como-utilizar .media-holder-video');

    Pr.Youtube.onReady(function () { 
      player = Pr.Youtube.createPlayer(videoHolderConfigurar, {
        videoId: 'CYE6sl7RFxI'
      });
      
      playerFrasco = Pr.Youtube.createPlayer(videoHolderUtilizar, {
        videoId: 'Vjp8WpkTcEI'
      });

      // listeners video
      player.addListener('playing', tagPlayVideo);
      player.addListener('progressGA', tagProgressVideo);
      player.addListener('ended', tagEndedVideo);

      // listeners
      playerFrasco.addListener('playing', tagPlayVideo);
      playerFrasco.addListener('progressGA', tagProgressVideo);
      playerFrasco.addListener('ended', tagEndedVideo);
    });

    // Listeners
    function tagPlayVideo ($p) {
      trackAnalytics('pagnatura', $p.data('name'), 'play');
    };

    function tagProgressVideo ($p, percent) {
      trackAnalytics('pagnatura', $p.data('name'), percent.toString());
    };

    function tagEndedVideo ($p) {
      trackAnalytics('pagnatura', $p.data('name'), '100');
    };

  }());

  // Simular valor button
  $('.btn-simular-option').click(function (){
    event.preventDefault();
    $('.btn-simular-option').removeClass('selected');
    $(this).addClass('selected');
  });
  
});