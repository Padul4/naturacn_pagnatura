# README #

A base de desenvolvimento foi criada para padronizar o desenvolvimento front-end.
Nela você pode desenvolver todas as etapas do projeto de forma modular.

Siga as orientações abaixo para conseguir utilizar o projeto corretamente.

### Node ###

O projeto roda em cima do [nodejs](https://nodejs.org/), então é necessário instalar a última versão do node.

Após baixar o node, é necessário rodar o *npm* para instalar as dependencias do projeto.


### Bower  ###

Após a instalação do node é necessário instalar o [bower](http://bower.io/), que 
é responsável pelas bibliotecas utilizadas no projeto. Acesse o diretório no mesmo nível do arquivo 
*bower.json* e execute o comando abaixo:


```
#!$ npm install -g bower
```

A instalação do bower utilizando o comando acima irá se tornar global, ou seja, não será necessário 
rodar esse comando novamente em outros projetos que utilizam essa tecnologia.

Com o bower instalado é necessário instalar as dependências. Execute o comando abaixo:


```
$ bower install
```

Esse comando irá procurar um arquivo chamado **bower.json** e baixará todas as dependências que estiverem setadas nele. 
Um diretório chamado *bower_components* será criado na raiz da aplicação. Quando estivermos utilizando o projeto, existe uma tarefa que busca esses arquivos, junta todos os scripts em um único arquivo e minifica (explicação completa abaixo).


### Gulp ###

Também será necessário instalar o [Gulp](http://gulpjs.com/). Ele é um automatizador de tarefas como compilação de arquivos de estilo (less, sass, etc), compressão de imagens, templates, javascript, etc. Execute o comando abaixo para instalar o gulp globalmente.

```
$ npm install -g gulp
```

### Tarefas ###

O projeto utiliza algumas tarefas para compilar os arquivos. Segue a lista das tarefas importantes para o desenvolvimento:

#### gulp
```
$ gulp
```

Roda todos os scripts, vendor, css e sobre um servidor local para desenvolvimento


#### css
```
$ gulp less
```
Compila o CSS do projeto e joga o arquivo compilado na pasta `public/css`.


#### javascript
```
$ gulp scripts
```
Compila o javascript do projeto e joga o arquivo compilado na pasta `public/js`.

#### htmls
```
$ gulp templates
```
Compila o html do projeto para desenvolvimento local e joga o arquivo compilado na pasta `public/js`.


```
$ gulp templates:salveqa
```
Compila o html do projeto o ambiente salveqa. Ele busca o arquivo de configuração na pasta `resources/profiles/salveqa/frontend/app/templates/pre-compile-info/default.js`, altera os caminhos das requsições dos arquivos o HTML e joga o arquivo compilado na pasta `resources/profiles/salveqa/frontend/public/`.


```
$ gulp templates:stage
```
Compila o html do projeto o ambiente stage. Ele busca o arquivo de configuração na pasta `resources/profiles/stage/frontend/app/templates/pre-compile-info/default.js`, altera os caminhos das requsições dos arquivos o HTML e joga o arquivo compilado na pasta `resources/profiles/stage/frontend/public/`.


```
$ gulp templates:prod
```
Compila o html do projeto o ambiente prod. Ele busca o arquivo de configuração na pasta `resources/profiles/prod/frontend/app/templates/pre-compile-info/default.js`, altera os caminhos das requsições dos arquivos o HTML e joga o arquivo compilado na pasta `resources/profiles/prod/frontend/public/`.

