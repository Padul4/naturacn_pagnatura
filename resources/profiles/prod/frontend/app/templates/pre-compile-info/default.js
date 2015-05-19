/**
 Arquivo com os dados que serao aplicados no HTML pre-compilado.
 Caso seja necessario utilizar essas configuracoes no lado do browser, basta
 importar esse arquivo dentro do js da aplicacao. Ex.:
 
 import config from '../templates/pre-compile-info/default' 
*/
module.exports = {
	title: "Pagina Salve QA",
	description: "Natura Reconhecimento Prod",
	baseUrl: 'http://www.natura.com.br/www',
	assetsUrl: '',
	extPage: "",
	extAssets: ".min"
}