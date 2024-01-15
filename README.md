# Match API

This api uses NestJS, GraphQL with GraphQL Relay, TypeORM.

## Running app

To run the app you simply need to run

```sh
docker compose up
```

For compose you need to add .env file

```env
DB_HOST=match-db
DB_PORT=3306
DB_PASSWORD=match
DB_USERNAME=match
DB_NAME=match

SEED_DATABASE=1
```

`SEED_DATABASE` will add data to your database

There is prepared sql which contains structure and data [sql](match.sql) but it does not contain trigger from [Migration1705242881623](./src/database/migrations/Migration1705242881623.ts).

First run could fail on migrations. There is a need to set global in MySQL as root:

```sql
SET GLOBAL log_bin_trust_function_creators = 1;
```

## Architecture description

There is only one module, because there are simple GraphQL operations on 3 database models.

Project structure from `src` directory

    .
    ├── modules # contains core module and can contain for example adapter modules
    │   ├── core
    │   │   ├── model # database models
    │   │   ├── repository # repositories with queries to database
    │   │   ├── service # business logic
    │   │   ├── transport # contains GraphQL layer and can contain other transport for instance http ot websocket
    ├── database # contains migrations and database connection
    ├── shared # contains code shared across the application

I made repositories with interfaces and providers, because I want to make separation between ORM and my application. For example if I want to change TypeORM to Sequalize or MikroORM I need to change only implementation of repositories and database folder.

GraphQL is in transport directory, because logic does not need to couple with GraphQL. For instance I want to use REST API, so I can use services which are used by GraphQL transport and I only need to create controllers.
