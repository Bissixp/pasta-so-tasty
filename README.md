## :spaghetti: Pasta so Tasty
Pasta so Tasty é um site de receitas com uma API RESTful que permite aos usuários criar uma conta, criar suas próprias receitas, favoritar, editar e excluir suas próprias receitas. Todas as receitas que são criadas precisam da autorização do administrador para serem aprovadas e postadas no site.

## Menu
- [Visão Geral](#visão-geral)
- [Recursos](#recursos)
- [Instalação](#instalação)
- [Instruções](#instruções)
- [Tecnologias utilizadas](#tecnologias-utilizadas)

## Visão Geral
Pasta so Tasty é uma aplicação web que permite aos usuários:

- Criar uma conta.
- Adicionar receitas com informações detalhadas.
- Editar receitas existentes.
- Excluir suas receitas.


O projeto foi desenvolvido para simplificar o processo de gerenciamento de receitas e torná-lo acessível a todos.

## Recursos
- Criação de conta de usuário.
- Adição de receitas personalizadas.
- Favoritamento de receitas.
- Edição e exclusão de receitas pessoais.
- Segurança aprimorada com HttpOnly.
- Desenvolvido com TypeScript, React e Node.js.

## Instalação
<details>
  <summary><strong>:whale: Com Docker </strong></summary><br />
  

### 1 - Clone o repositório
```bash
git clone git@github.com:Bissixp/pasta-so-tasty.git
```
### 2 - Mude para pasta do repositório
```bash
cd pasta-so-tasty
```
### 3 - Rode o container na pasta raiz da aplicação
```bash
docker-compose up -d
```
  ### 4 - Instale as dependências do back-end e as popule
```bash
cd app/back-end && npm install && npm run build
```
 ### 5 - Instale as dependências do front-end
```bash
cd ../front-end && npm install
```
 ### 6 - Rode o servidor dentro da pasta do front-end
```bash
npm start
```
# Acesse o site em http://localhost:3000 no seu navegador.

 </details>
 <details>
 <summary><strong>:computer: Sem Docker </strong></summary><br />


  ### 1 - Clone o repositório
```bash
git clone git@github.com:Bissixp/pasta-so-tasty.git
```
  ### 2 - Mude para pasta do repositório
```bash
cd pasta-so-tasty
```
  ### 3 - Instale as dependências do back-end e as popule
```bash
cd app/back-end && npm install && npm run build
```
 ### 4 - Instale as dependências do front-end
```bash
cd ../front-end && npm install
```
 ### 5 - Rode o servidor dentro da pasta do front-end
```bash
npm start
```
# Acesse o site em http://localhost:3000 no seu navegador.
</details>

  ### :warning: Caso tenha algum problema com o Banco de dados :warning:
Rode o comando dentro da pasta do back-end para resetar o Banco de dados:
```bash
npm run restart
```
E para popular novamente:
```bash
npm run build
```
---

## Instruções

<details>
  <summary><strong>:heavy_check_mark: Rota Registro </strong></summary><br />
  Responsável para fazer o cadastro do usuário.
  
### localhost:3001/registration

Responsável por cadastrar usuários no banco de dados e criar um token com o prazo de 24 horas que é salvo nos cookies. - (POST)

Para cadastrar um usuário:
 ```json
  {
    "firstName": "Fulano",
    "lastName": "Silva",
    "password": "12345@Oi",
    "email": "fulano@hotmail.com"
  }
```
  
  </details>
<details>
  <summary><strong>:heavy_check_mark: Rota Login </strong></summary><br />
  
### localhost:3001/login
Responsável para fazer o login do usuário.

Responsável por gerar um token de usuário já cadastrado no banco de dados, o token tem o prazo de 24 horas que é salvo nos cookies. - (POST)

Entrada:
 ```json
  {
    "email":"pastasotasty@gmail.com",
    "password":"Pasta@23"
  }
```

  </details>
  <details>
  <summary><strong>:heavy_check_mark: Rota Receitas </strong></summary><br />


  ### localhost:3001/recipe/getAll
  
 - Está rota é responsável por localizar todas as receitas aprovadas no site. - (GET)
 
  ### localhost:3001/recipe/create-recipe/2
  
- Esta rota é responsável por criar uma receita. O segundo parâmetro na URL é o ID do usuário, que é passado por uma verificação no back-end para garantir que a receita seja criada pelo mesmo usuário. - (POST)

  Entrada:
 ```json
{
  "authorId": 2,
  "authorName": "Fulano Silva",
  "cookName": "Pão com ovo",
  "cookPhoto": "https://anamariabraga.globo.com/wp-content/uploads/2020/07/sanduiche-de-ovo-com-pao-de-forma.jpg",
  "cookInfo": "Abra o Pão, passe maionese, frite o ovo, após frito, coloque o ovo frito no pão e está pronto",
  "cookTime": 5,
  "ingredientsRecipe": [
    "2 Ovos",
    "2 fatias de Pão de Forma",
    "1 Colher de Maionese",
    "1 colher de chá de sal "
  ],
  "cookType": "Pão",
  "status": "pending"
}
```

### localhost:3001/recipe/edit-recipe/16/2

- Esta rota é responsável por editar uma receita. O primeiro parâmetro na URL é o ID da receita para realizar a edição, e o segundo parâmetro é o ID do usuário, que é passado por uma verificação no back-end para garantir que a receita seja editada pelo mesmo usuário que criou a receita. - (PUT)

  Entrada:
 ```json
{
  "authorId": 2,
  "authorName": "Fulano Silva",
  "cookName": "Pão com ovo 2.0",
  "cookPhoto": "https://anamariabraga.globo.com/wp-content/uploads/2020/07/sanduiche-de-ovo-com-pao-de-forma.jpg",
  "cookInfo": "Abra o Pão, passe maionese, frite o ovo, após frito, coloque o ovo frito no pão e está pronto",
  "cookTime": 5,
  "ingredientsRecipe": [
    "2 Ovos",
    "2 fatias de Pão de Forma",
    "1 Colher de Maionese",
    "1 colher de chá de sal "
  ],
  "cookType": "Pão",
  "status": "pending"
}
```
## localhost:3001/recipe/deleteRecipePosted/16/2

Esta rota é responsável por excluir uma receita. O primeiro parâmetro na URL é o ID do usuário, e o segundo parâmetro é o ID da receita para exclusão, que é passado por uma verificação no back-end para garantir que a receita seja excluída pelo mesmo usuário que a criou. - (DELETE)

  </details>

## Tecnologias utilizadas
#### :computer: **Front-end**
- TypeScript
- React
- Axios

#### :computer: **Back-end**
- JavaScript
- Node.js
- Express
- Sequelize
- MySQL
- Bcrypt
- Cookie-parser
- Joi
- Jsonwebtoken
- Multer
