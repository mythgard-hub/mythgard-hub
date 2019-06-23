# Mythgard

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

## Postgraphile

Connect to localhost:5000/graphiql to query the db with graphql.

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
