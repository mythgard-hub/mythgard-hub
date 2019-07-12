# Mythgard

This card database + fansite is built on Postgres, Postgraphile, Next.js, and Express.js. Postgres is the sql database. Postgraphile is a GraphQL server that provides api access to Postgres. Express.js proxies requests from the front-end and Next.js, and is the only node that communicates with Postgraphile. Nest.js handles the front-end javascript and server-side rendering.

The stack is Next.js (Node - front-end and SSR) on top of Node with Postgraphile middleware on top of Postgres.

# Quickstart

1. Install docker
1. docker-compose up
1. navigate to localhost:3001

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

## Next

The next service is a simple next.js app. The source files are bound using docker to the /next folder, so you should be able to just edit them with your editor of choice without restarting anything and next will recompile and refresh the page automatically. If you need to add a new npm package, you will either need to kill the remove the next container and then prune the volume, or more easily, docker exec <container-id> /bin.sh and run npm i from inside the container.

## Server

Just a simple node app. The postgraphile-middleware does most of the work. See instructions for Next on how to update add new node modules.

## Testing

End-to-end tests are written using cypress. Ignore example tests except for reference. They will be removed at some point.

1. cd e2e
1. npx cypress open

## Development Environment

Please use prettier and eslint. Configs are located in next, express, and e2e, but you will need to `npm install` the necessary eslint plugins.
