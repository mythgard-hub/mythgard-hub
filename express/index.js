const express = require('express');
const { postgraphile } = require('postgraphile');
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector');
const ConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const compression = require('compression');

const app = express();

app.use(compression());

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
      appendPlugins: [PgSimplifyInflectorPlugin, ConnectionFilterPlugin],
      graphileBuildOptions: {
        connectionFilterAllowNullInput: true,
        connectionFilterRelations: true
      },
      jwtSecret: process.env.JWT_SECRET,
      jwtVerifyOptions: {
        audience: [process.env.JWT_AUDIENCE]
      },
      pgDefaultRole: process.env.PG_ANON_USER_ROLE,
      ignoreRBAC: false
    }
  )
);

app.listen(process.env.PORT || 3000);
