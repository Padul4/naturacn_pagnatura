/**
 Arquivo com as funcoes globais
*/

function loadjs(filename){
  var Pr = window.Pr || {};

	var fileref=document.createElement('script');
	fileref.setAttribute("type","text/javascript");
	fileref.setAttribute("src", filename);

    document.getElementsByTagName("head")[0].appendChild(fileref);
};

window.trackAnalytics = function(cat, action, label) {
  if (typeof (_gaq) !== 'undefined') {
    _gaq.push(['_trackEvent', cat, action, label]);
  } else {
    if (typeof (ga) !== 'undefined') {
      ga('send', 'event', cat, action, label);
    }
  }
  console.log(cat, action, label);
};

$('[data-ga]').click(function(event) {
  var data = $(this).data('ga').split('|');
  if (data[3] && data[3] === "waitredirect") {
    event.preventDefault();
    trackGARedirect($(this), data[0], data[1], data[2]);
  } else {
    trackAnalytics(data[0], data[1], data[2]);
  }
});

var pagesViews = [];

window.trackPageviewGA = function (page, title) {
      var pageTitle = page + title;
      
      if($.inArray(pageTitle, pagesViews) == '-1'){
          if(typeof(ga) !== 'undefined') {
              ga('send', 'pageview', {
                  'page': page,
                  'title': title
              });
          }
          pagesViews.push(pageTitle);
      }
     console.log(page, title);
  }
  
window.trackGARedirect = function(button, event, action, label) {

  // track
  trackAnalytics(event, action, label);

  // redirect
  if (button.attr('target') !== '_blank') {
    setTimeout(function() {
      window.self.location = button.attr('href');
    }, 500);
  }
  // console.log(button, event, action, label);
};