/**
 Arquivo com os dados que serao aplicados no HTML pre-compilado.
 Caso seja necessario utilizar essas configuracoes no lado do browser, basta
 importar esse arquivo dentro do js da aplicacao. Ex.:
 
 import config from '../templates/pre-compile-info/default' 
*/
module.exports = {
	title: "Pagina Salve QA",
	description: "Natura Reconhecimento Salve QA",
	baseUrl: 'http://www.salveinterativa.com.br/natura_voce-conecta',
	assetsUrl: '',
	extPage: ".html",
	extAssets: ".min",
	partials: true
}