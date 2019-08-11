const express = require('express');
const { postgraphile } = require('postgraphile');
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector');

const app = express();

/**
 * Graph QL Goodness
 */
app.use(
  postgraphile(
    {
      user: process.env.PGUSER,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      ssl: process.env.PGSSL === 'yes'
    },
    'mythgard',
    {
      graphiql: true,
      enableQueryBatching: true,
      appendPlugins: [PgSimplifyInflectorPlugin],
      // Optional customisation
      graphileBuildOptions: {
        /*
         * Uncomment if you want simple collections to lose the 'List' suffix
         * (and connections to gain a 'Connection' suffix).
         */
        //pgOmitListSuffix: true,
        /*
         * Uncomment if you want 'userPatch' instead of 'patch' in update
         * mutations.
         */
        //pgSimplifyPatch: false,
        /*
         * Uncomment if you want 'allUsers' instead of 'users' at root level.
         */
        //pgSimplifyAllRows: false,
        /*
         * Uncomment if you want primary key queries and mutations to have
         * `ById` (or similar) suffix; and the `nodeId` queries/mutations
         * to lose their `ByNodeId` suffix.
         */
        // pgShortPk: true,
      }
    }
  )
);

app.listen(process.env.PORT || 3000);
