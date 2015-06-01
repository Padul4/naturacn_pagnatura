/**
 Arquivo com os dados que serao aplicados no HTML pre-compilado.
 Caso seja necessario utilizar essas configuracoes no lado do browser, basta
 importar esse arquivo dentro do js da aplicacao. Ex.:
 
 import config from '../templates/pre-compile-info/default' 
*/
module.exports = {
	title: "Pagina default",
	description: "Descricao da pagina",
	baseUrl: 'http://192.168.1.168:3000',
	assetsUrl: '',
	extPage: ".html",
	extAssets: "",
	partials: true
}