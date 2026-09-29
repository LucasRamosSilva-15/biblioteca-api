Integrante 1: Lucas Ramos Silva
Integrante 2: Não existente

Esse é um projeto de uma API REST usando o sequelize e sqlite3 que demonstra um sistema de gerenciamento de uma biblioteca com autores, livros e categorias (Demonstrando conceitos de CRUD, relacionamentos e testes unitários)

## Como Instalar

1. Clone o repositorio: git clone https://github.com/LucasRamosSilva-15/biblioteca-api.git

2. Entre na pasta do projeto: cd biblioteca-api

3. Instale as dependencias: npm install

4. Instale o jest: npm install jest --save-dev

5. Rode os testes: npm test

6. Rode o projeto: node src/app.js

7. acesse: http://localhost:3000

## Estrutura de Rotas

| Método | Rota | Descrição |
| --- | --- | --- |
| **POST** | `/api/autores` | Criar um novo autor |
| **GET** | `/api/autores` | Listar todos os autores (Suporta filtros `?page` e `?limit`) |
| **GET** | `/api/autores/:id` | Buscar um autor pelo ID |
| **PUT** | `/api/autores/:id` | Atualizar dados de um autor |
| **DELETE** | `/api/autores/:id` | Excluir um autor |
| **POST** | `/api/livros` | Criar um novo livro |
| **GET** | `/api/livros` | Listar livros (Suporta filtros `?page`, `?limit` e `?titulo`) |
| **GET** | `/api/livros/:id` | Buscar um livro pelo ID |
| **PUT** | `/api/livros/:id` | Atualizar dados de um livro |
| **DELETE** | `/api/livros/:id` | Excluir um livro |
| **POST** | `/api/categorias` | Criar uma nova categoria |
| **GET** | `/api/categorias` | Listar todas as categorias |
| **GET** | `/api/categorias/:id` | Buscar uma categoria pelo ID |
| **PUT** | `/api/categorias/:id` | Atualizar dados de uma categoria |
| **DELETE** | `/api/categorias/:id` | Excluir uma categoria |
| **POST** | `/api/livros/:id/categorias/:categoriaId` | Associar um Livro a uma Categoria (Relacionamento N:N) |
