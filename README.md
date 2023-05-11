# Task Management

Gerenciador de Tarefas para Usuários em Times

## Descrição

Este projeto é uma aplicação desenvolvida em Node.js com as tecnologias pg, express e jwt, que tem como objetivo auxiliar times na gestão de suas tarefas. A aplicação possui rotas para cadastro e autenticação de usuários, listagem de tarefas e times, criação de tarefas e times e atribuição de tarefas a times específicos. 

## Rotas

- POST `/signup`: cria um novo usuário.
- POST `/signin`: autentica o usuário e retorna um token JWT.
- POST `/me/tasks`: cria uma nova tarefa associada ao usuário autenticado.
- GET `/me/tasks`: retorna todas as tarefas associadas ao usuário autenticado.
- PATCH `/me/tasks`: atualiza uma tarefa existente associada ao usuário autenticado.
- DELETE `/me/tasks`: exclui uma tarefa existente associada ao usuário autenticado.
- POST `/me/teams`: cria uma nova equipe associada ao usuário autenticado.
- GET `/me/teams`: retorna todas as equipes associadas ao usuário autenticado.
- PATCH `/me/teams`: atualiza uma equipe existente associada ao usuário autenticado.
- DELETE `/me/teams`: exclui uma equipe existente associada ao usuário autenticado.
- POST `/me/teams/:teamId/tasks`: cria uma nova tarefa associada a uma equipe, e o usuário autenticado deve ser um membro dessa equipe.

## Tecnologias

- Node.js
- pg
- express
- jwt

## Instalação
1. Clone o repositório.
2. Rode o comando npm install na pasta raiz do projeto.
3. Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente necessárias:
```
PORT=4000

DB_HOST='localhost'
DB_PORT=5432
DB_PASS='your_db_pass'
DB_NAME='taskmanagement'

JWT_SECRET='your_jwt_secret'
```
4. Rode o comando npm start para iniciar o servidor.
5. Rode o comando npm t para executar os testes unitários.

## Contribuição

Se você quiser contribuir com este projeto, por favor siga as orientações abaixo:

Faça um fork do repositório.
Crie uma nova branch (git checkout -b feature/nome-da-sua-feature).
Faça as suas modificações e faça commit (git commit -m "Adicionando uma nova funcionalidade").
Faça push na sua branch (git push origin feature/nome-da-sua-feature).
Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE.md](LICENSE.md) para obter mais detalhes.

## Autor

Alyxson Marques
