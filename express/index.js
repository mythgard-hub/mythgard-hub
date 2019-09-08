const express = require('express');
const { postgraphile } = require('postgraphile');
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector');
const ConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const compression = require('compression');
const helmet = require('helmet');
const { hashQuery, allowedQueryHashes } = require('./query-checker.js');

const app = express();

app.use(compression());
app.use(helmet());

app.use(express.json());
app.use('/graphql', async (req, res, next) => {
  const queries = req.body.map(b => b.query);
  const allQueriesOk = queries.reduce((acc, query) => {
    const hash = hashQuery(query);
    return acc && allowedQueryHashes.includes(hash);
  }, true);
  if (!allQueriesOk) {
    res.json({ error: `query not on whitelist` });
  }
  next();
});

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
      ignoreRBAC: false,
      pgSettings: {
        statement_timeout: '3000'
      }
    }
  )
);

app.listen(process.env.PORT || 3000);
