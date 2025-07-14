<h1>Api - Farmácias Digitais Sociais</h1>
O trabalho da API de farmácias digitais sociais consiste em um sistemas para facilitar o acesso gratuito a medicamentos, conectando pacientes a programas públicos e instituições parceiras. Essa solução automatiza e agiliza a distribuição de remédios essenciais a quem mais precisa.

<h3>Descrição do Desenvolvimento</h3>

RECURSOS UTILIZADOS:
Sequelize, Nest, Swagger, Fetch e PostgreSQL

+ Nesse repositório, fizemos o front da API de Farmácias Digitais Sociais.
+ O nosso backend roda na porta 3001 e o front na porta 3005.
+ Não conseguimos testar as ações pois o servidor do banco de dados da API de controle users, a qual usamos para autenticação, caiu impossibilitando o uso dos endpoints.

<h3>Temos 2 áreas principais no nosso site:</h3>

  + a área de funcionários, que pode ser acessada através de http://localhost:3005/funcionario, abrindo a área de gerencia.
  + a área de cliente, que mostra apenas funções básicas, como listar medicamentos disponíveis e criar solicitação.
