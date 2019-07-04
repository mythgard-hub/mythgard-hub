# Mythgard

This card database + fansite is built on Postgres, Postgraphile, Next.js, and Express.js. Postgres is the sql database. Postgraphile is a GraphQL server that provides api access to Postgres. Express.js proxies requests from the front-end and Next.js, and is the only node that communicates with Postgraphile. Nest.js handles the front-end javascript and server-side rendering.

Next.js (Node - front-end and SSR)
^
Express (Node - back-end)
^
Postgraphile (GraphQL)
^
Postgres (data in SQL)

# Quickstart

1 Install docker
2 docker swarm init
3 docker stack deploy -c compose.yml <somename>

## Usage: Adminer

Connect to localhost:8080 to view the database via adminer

System: postgres
server: db
username: postgres
password: example
database: postgres

The schema is mythgard

## Postgraphile Graphiql

Connect to localhost:3000/graphiql to query the db with graphiql.

Example query:

```
{
  allCards {
    nodes {
      id,
      atk,
      def
    }
  }
}
```
