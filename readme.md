# Protejo Módulo 1 - Viagem365
## Realizado utilizando Node - Express - Sequelize - Yup - Swagger - Seeders


# Projeto Viagem 365
1. Projeto criado para adicionar usuários e catalogar destinos do Brasil em um banco de dados.

## Rodar o repositório

### Na primeira vez é necessário instalar as dependências:
1. Git Clone no repositório do projeto
2. npm install

### Se for em ambiente local:
2. npm install --dev

### Configure o .env:
1. Crie um arquivo .env na pasta raiz do projeto.
2.  Utilize o arquivo .env_example como exemplo para inserir os dados corretos.


### Criamos uma nova Branch
1. Main - Produção
2. Develop - Desenvolvimento
3. Feature/* - Devenvolvimento de nova feature

### Migrations Utilizadas:
1. Criar_tabela_usuario
2. Criar_tabela_destino

### Rodar uma migration:
1. Opção nº 1: sequelize db:migrate
2. Opção nº 2: npx sequelize db:migrate

### Para rodar o seeders  em ambiente local:
1. Sequelize db:seed:all

### Para rodar o swagger em ambiente local:
1. npm run swagger

### Para rodar o repositório em ambiente local:
1. npm run start:dev

### Para acessar o swagger em ambiente local:
1. http://localhost:3000/docs

### Sistema de login/autenticação JWT:
1. O sistema possui um sistema de login inteligente. Quando você cadastra um novo usuário com seu login e senha e realiza o login com autenticação JWT, o sistema consegue identificar seu ID e, assim, adicionar os destinos apenas para seu usuário.
2.  Você precisa estar autenticado com o TOKEN do JWT tanto para adicionar um novo destino, quanto para listar seus destinos.

# Melhorias para futuras atualizações:
1. Adicionar rota de atualizar usuário.
2. Adicionar rota para deletar usuário.
3. Adicionar um mapa mostrando a localização apartir da coodernadas.
4. Pegar endereço do usuário pelo CEP. 
5. Podemos adicionar os controllers.