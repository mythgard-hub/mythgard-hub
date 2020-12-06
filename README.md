# Mythgard [![Build Status](https://travis-ci.com/mythgard-hub/mythgard-hub.svg?branch=master)](https://travis-ci.com/mythgard-hub/mythgard-hub)

This card database + fansite is built on Postgres, Postgraphile, Next.js, and Express.js. Postgres is the sql database. Postgraphile is a GraphQL server that provides api access to Postgres. Express.js proxies requests from the front-end and Next.js, and is the only node that communicates with Postgraphile. Next.js handles the front-end javascript and server-side rendering.

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

## Next

The next service is a simple next.js app. The source files are bound using docker to the /next folder, so you should be able to just edit them with your editor of choice without restarting anything and next will recompile and refresh the page automatically. If you need to add a new npm package, you will either need to kill the remove the next container and then prune the volume, or more easily, docker exec <container-id> /bin.sh and run npm i from inside the container.

## Server

Just a simple node app. The postgraphile-middleware does most of the work. See instructions for Next on how to update add new node modules.

## Authentication

Authentication is handled by [Passport](http://www.passportjs.org/), we currently support a [Google OAuth 2.0](http://www.passportjs.org/docs/google/) strategy. Your logged in status is maintained via cookie based [JSON Web Tokens](https://github.com/auth0/node-jsonwebtoken).

## Testing

### End-to-end Tests

End-to-end tests are written using cypress. Ignore example tests except for reference. They will be removed at some point.

1. cd e2e
1. npx cypress open

### Unit Tests

Unit tests are written using jest and enzyme.

To test `example.js`, create a file called `example.test.js`. The contents of the file would be

```
import { functionToTest } from './example';

describe('Test example.js', () => {
  describe('Test functionToTest', () => {
    it('should return the correct thing', function() {
      expect(functionToTest(true)).toBe(true);
      expect(functionToTest('hi')).toBe('hi');
    });
  });
});

```

To run all tests:

1. Open terminal in the `next` folder
2. Run `npm run test`

## Development Environment

Please use prettier and eslint. Configs are located in next, express, and e2e, but you will need to `npm install` the necessary eslint plugins.

## Graphql and graphiql

To protect our infrastructure from malicious graphql queries, we have implemented a whitelist. This creates a small inconvenience when updating or creating new graphql queries - one must remember to update the whitelist file. We have hopes to eliminate this step with an isomorphic node module in the future. `/express/whitelisted-queries.js`

To play around with graphql or experiment, graphiql is a nice tool that is built into postgraphile. To use it,connect to localhost:3000/graphiql to query the db with graphiql. However, you will first want to comment out the whitelist middleware in `/express/index.js` and then `docker compose restart exporess`. Otherwise, the whitelister will prevent you from doing anything.

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

## Deploying

Ensure that the `docker` and `kubectl` commands are installed and in you path. Docker will need to be configured to push to the `gsdf` organization in the public registry and `kubectl` must be pointed at your target cluster.

First, create a release. E.g.:

```
scripts/create-release.sh v1.2.3
```

This will build images for the next and express services, tagged with the appropriate versions, and push them to the docker registry.

To deploy, run:

```
scripts/deploy.sh v1.2.3
```

The deploy script instructs the cluster to use images tagged with the given version.

Note that in order to run this script you will have to create the file `kube-config/secrets.sh` that creates/updates a k8s secrets object for use in our deployed containers. This file will not be tracked by version control.

## Importing Data

See comments for import-\* scripts in /scripts
