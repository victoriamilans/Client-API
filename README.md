# Client-API

### ClientAPI é uma api que tem como objetivo gerenciar clientes e seus contatos através de CRUD.
[API Doc](https://live-living-api-doc.vercel.app/)

---

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
    - [Scripts](#34-scripts)
- [Endpoints](#4-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://www.npmjs.com/package/zod)
- [Bcryptjs](https://www.npmjs.com/package/bcrypt)
- [Pg](https://www.npmjs.com/package/pg)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [Pg](https://www.npmjs.com/package/pg)
- [Dotenv](https://www.npmjs.com/package/dotenv)

A URL base da aplicação (deploy) : https://livelivingapi.onrender.com

---

## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo as relações entre as tabelas do banco de dados.

<p align="center">
   <img src="https://user-images.githubusercontent.com/106447484/227379224-77c01a76-7bbc-4a6b-88fc-b6dbf4986824.png"  width="900" height="500"/>
</p>

---

## 3. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

### 3.4. Scripts

Executar aplicação em ambiente de desenvolvimento:

```
yarn dev
```
---

## 4. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Clients](#1-Clients)
- [Login](#2-Login)
- [Contacts](#3-Contacts)

---

## 1. **Clients**
[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /client     | Criação de um cliente.                  |
| GET      | /client     | Lista todos os clientes                 |
| GET      | /client/:client_id | Lista um cliente usando seu ID como parâmetro |
| PATCH    | /client/:client_id | Editar as informações do cliente usando seu ID como parâmetro |
| DELETE   | /client/:client_id | Deletar cliente usando seu ID como parâmetro |

---

## 2. **Login**
[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /login     | Autentica o cliente para ter acesso ao sistema.|

---

## 3. **Contacts**
[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /contact     | Criação de contato.                  |
| GET      | /contact     | Lista todos os contatos do cliente logado.                 |
| PATCH    | /contact/:contact_id | Editar as informações do contato usando seu ID como parâmetro |
| DELETE   | /contact/:contact_id | Deletar contato usando seu ID como parâmetro |

---
