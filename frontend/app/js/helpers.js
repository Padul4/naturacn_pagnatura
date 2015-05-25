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