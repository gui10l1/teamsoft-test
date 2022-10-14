# Clientes e Endereços API v1

Esse projeto foi destinado a um teste para uma empresa chamada TeamSoft. A
principal razão para este projeto nascer foi com o objetivo de testar meus
conhecimentos aplicados a uma vaga de emprego.

A seguir segue uma breve documentação dos módulos feitos, e sobre como levar o
projeto em ambiente de desenvolvimento, falando sobre suas variáveis de ambiente,
testes, e pacotes.

# Começando

Este projeto foi feito usando NodeJS em conjunto com Typescript, gerenciando
pacotes com Yarn.

Para iniciar, primeiro é preciso abrir o terminal na raiz do projeto e digitar
por `yarn` ou `yarn update`. Ambos os comandos irão instalar todos os pacotes
necessários para o funcionamento do projeto.

# Variáveis de ambiente

Após a instalação dos pacotes, é preciso configurar as variáveis de ambiente
necessárias para o funcionamento do projeto. Algumas são requeridas, outras não.

Existe um arquivo, na raíz do projeto chamado `.env.example`. Neste arquivo
contém um exemplo de todas as variáveis ambiente do projeto, que serão
explicadas a seguir.

## APP_PORT

Primeiro, temos a variável que define em qual porta da sua máquina o projeto
deve ser executado. Esta variável é **necessária** para que o projeto seja
**executado**.

## MONGODB_CONNECTION_URI

Este projeto utilizou o banco de dados não relacional *MongoDB*. Sendo assim,
para que seja estabilizado uma conexão para a manipulação dos dados, uma URI de
conexão é necessária para que seja possível fazer tal ação.

Na URI é necessário informar *host*, *porta*, e *banco de dados* que
serão utilizados pelo projeto. Existe um exemplo no arquivo `.env.example` na
raíz do projeto.

## LOCATION_PROVIDER

Para que possa ser feita a busca de informações como latitude e longitude de um
endereço (uma das entidades do banco de dados) é preciso que essa variável seja
informada.

Existem dois valores possíveis para esta chave, que são: `sandbox` e `google`.

Se o valor `sandbox` for informado, as informações para latitude e longitude da entidade de
endereço serão aleatórias, sendo assim impossível de buscar por informações
verdadeiras uma vez que o provedor está em *sandbox*, sendo assim, não preciso
informar valor à última variável de ambiente, chamada de: `GOOGLE_MAPS_API_KEY`.

Caso contrário, se a variável for populada com o valor `google`, a API utilizará
dos serviços de mapa da Google para a busca de tais informações. Para que seja
possível tal serviço, é preciso que seja informado um valor para a próxima
variável de ambiente.

## GOOGLE_MAPS_API_KEY

Como dito anteriormente, esta variável não é necessária, com base no que for
informado em `LOCATION_PROVIDER`.

Esta variável precisa ser populada com uma chave da API **Geocoding API** da
Google. [Segue a documentação com as instruções de como receber uma.](https://developers.google.com/maps/documentation/geocoding/overview#before-you-begin)

Com esta chave populada, em conjunto com a variável `LOCATION_PROVIDER` populada
com `google`, as informações de latitude e longitude serão informadas de maneira correta e
real.

# Inicializando o projeto

Para a inicialização do projeto, existe um comando a ser utilizado, que já está
brevemente preparado para que execute uma instância do projeto.

Esse comando é: `yarn dev` para inicar o projeto em ambiente de desenvolvimento
sendo possível assim, testar as funcionalidades que nele existem.

# Rotas e Recursos

Nessa seção será explicado um pouco das rotas da aplicação e dos recursos que
são manipuladas por ela.

## Clientes

Começando pela parte de clientes, este projeto faz possível de se serem
executadas todas as operações básicas de um banco de dados, sendo elas:
*create*, *read*, *update*, *delete*.

Para iniciar, vamos falar sobre a primeira rota: **listagem de clientes**

### [GET] Listagem de clientes (/clients)

**Endpoint**: `${baseUrl}/clients`.

Este endpoint irá retornar um *array* com os clientes cadastrados na base de dados.

### [GET] Busca de clientes (/clients/{clientId})

**Endpoint**: `${baseUrl}/clients/{clientId}`.

Este endpoint carrega um parâmetro de rota, que deve ser populado com o id do
cliente que se deseja buscar, caso não tenha o id, pode ser informado o CNPJ do
cliente, a API irá se assegurar que faça uma busca com alguma dessas informações.

Se o campo for popuolado com o CNPJ, é importante que seja colocado da **mesma forma**
que foi inserido no banco de dados, para evitar maiores **conflitos**.

Parâmetro | Descrição | Obrigatório
---------------- | ----------- | --------
Id ou CNPJ do cliente | Parâmetro utilizado na filtragem do banco de dados em busca de um resultado | :heavy_check_mark:

### [POST] Gerar/criar clientes (/clients)

**Endpoint**: `${baseUrl}/clients`.

Este endpoint leva a funcionalidade de se criar, e inserir no banco de dados um
novo cliente, conforme os dados enviados. Os dados devem ser enviados dentro
do corpo da requisição, no formato `json`.

Parâmetro | Descrição | Obrigatório
---------------- | ----------- | --------
document | CNPJ do cliente | :heavy_check_mark:
socialReason | Razão social do cliente | :heavy_check_mark:
contactName | Nome do contato do cliente | :heavy_check_mark:
phone | Telefone do cliente | :heavy_check_mark:

### [PUT] Atualizar clientes (/clients/{clientId})

**Endpoint**: `${baseUrl}/clients/{clientId}`.

Este endpoint faz possível a atualização dos dados dos clientes no banco de
dados. Este, em particular, possui um parâmetro de rota, identificando o cliente
a ser atualizado. Apenas este parâmetro é requerido, os outros podem ser
omitidos, sendo assim possível de fazer a atualização de 1 informação, ou
múltiplas. As informações não obrigatórias **devem** ser informadas no corpo da
requisição, em formato `json`.

Parâmetro | Descrição | Obrigatório
---------------- | ----------- | --------
clientId | Este deve ser informado na rota, precisa necessariamente ser o id do cliente alvo | :heavy_check_mark:
document | CNPJ do cliente para atualização | :x:
socialReason | Razão social do cliente para atualização | :x:
contactName | Nome do contato do cliente para atualização | :x:
phone | Telefone do cliente para atualização | :x:

### [DELETE] Remoção de clientes (/clients/{clientId})

**Endpoint**: `${baseUrl}/clients/{clientId}`.

Este endpoint carrega um parâmetro de rota, que deve ser populado com o id do
cliente que se deseja deletar.

Parâmetro | Descrição | Obrigatório
---------------- | ----------- | --------
Id do cliente | Parâmetro utilizado para a remoção do cliente | :heavy_check_mark:

## Endereços

Chegamos na parte de endereços. Aqui são disponibilizados os mesmos recursos que
na parte de clientes, ou seja, também é possível a *criação*, *leitura*,
*atualização*, e *remoção* de conteúdo.

### [GET] Listagem de endereços (/addresses)

**Endpoint**: `${baseUrl}/addresses`.

Este endpoint irá retornar um *array* com os endereços cadastrados na base de
dados.

### [GET] Busca de endereços (/addresses/{addressId})

**Endpoint**: `${baseUrl}/addresses/{addressId}`.

Este endpoint carrega um parâmetro de rota, que deve ser populado com o id do
endereço que se deseja buscar.

Parâmetro | Descrição | Obrigatório
---------------- | ----------- | --------
Id do endereço | Parâmetro utilizado na filtragem do banco de dados em busca de um resultado | :heavy_check_mark:

### [POST] Gerar/criar endereços (/addresses)

**Endpoint**: `${baseUrl}/addresses`.

Este endpoint leva a funcionalidade de se criar, e inserir no banco de dados um
novo endereço, conforme os dados inseridos. Os dados devem ser enviados dentro
do corpo da requisição, no formato `json`.

Parâmetro | Descrição | Obrigatório
---------------- | ----------- | --------
address | Logradouro do endereço, este será o parâmetro utilizado para a busca de latitude e longitude | :heavy_check_mark:
number | Número do endereço | :heavy_check_mark:
neighborhood | Bairro | :heavy_check_mark:
city | Cidade | :heavy_check_mark:
state | Estado | :heavy_check_mark:
postalCode | CEP | :heavy_check_mark:
complement | Complemento do endereço | :x:
clientId | Cliente na qual possui o endereço que está sendo cadastrado | :heavy_check_mark:

Note que há um campo chamado `clientId` e este controla o relacionamento
dentro do banco de dados, e aponta a qual cliente este endereço pertence.

### [PUT] Atualizar endereços (/addresses/{addressId})

**Endpoint**: `${baseUrl}/addresses/{addressId}`.

Este endpoint faz possível a atualização dos dados dos endereços cadastrados
no banco de dados. Este, em particular, possui um parâmetro de rota, identificando
o endereço a ser atualizado. Apenas este parâmetro é requerido, os outros podem ser
omitidos, sendo assim possível de fazer a atualização de 1 informação, ou
múltiplas. As informações não obrigatórias **devem** ser informadas no corpo da
requisição, em formato `json`.

Parâmetro | Descrição | Obrigatório
---------------- | ----------- | --------
addressId | Este deve ser informado na rota, precisa necessariamente ser o id do endereço alvo | :heavy_check_mark:
address | Logradouro do endereço, este será o parâmetro utilizado para a busca de latitude e longitude | :x:
number | Número do endereço | :x:
neighborhood | Bairro | :x:
city | Cidade | :x:
state | Estado | :x:
postalCode | CEP | :x:
complement | Complemento do endereço | :x:
clientId | Cliente na qual possui o endereço que está sendo cadastrado | :x:

Note que há um campo chamado `clientId` e este controla o relacionamento
dentro do banco de dados, e aponta a qual cliente este endereço pertence.

### [DELETE] Remoção de endereços (/addresses/{addressId})

**Endpoint**: `${baseUrl}/addresses/{addressId}`.

Este endpoint carrega um parâmetro de rota, que deve ser populado com o id do
endereço que se deseja deletar.

Parâmetro | Descrição | Obrigatório
---------------- | ----------- | --------
Id do endereço | Parâmetro utilizado para a remoção do cliente | :heavy_check_mark:

# Testes

Este projeto cobriu apenas testes unitários, com a biblioteca `Jest`, na parte
de serviços, que é aonde estão inseridos toda a regra de negócio e tratamento
de erros.

Para que sejam executados os testes para a verificação da cobertura das
funcionalidades, é preciso apenas executar o seguinte comando no terminal, na
raiz do projeto: `yarn test`.

Após isso serão executados os testes, gerado um sumário no terminal, e alguns
arquivos na pasta `coverage` na raíz do projeto, contendo todo o relatório de
cobertura em cima de **declarações**, **ramificações**, **funções**, e **linhas**
de cada serviço utilizado na API.

# Conclusão e agradecimentos

Este projeto se mostra bem no gerenciamento de clientes e endereços, propostos
pelo desafio da empresa.

Aqui deixo meus agradecimentos aos responsáveis pelo desafio e espero que gostem
do que foi feito por aqui.

Espero nos vermos em uma próxima etapa!
