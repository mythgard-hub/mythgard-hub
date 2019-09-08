const express = require('express');
const { postgraphile } = require('postgraphile');
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector');
const ConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

app.use(compression());
app.use(helmet());

// prettier-ignore
// eslint-disable-next-line
const jhashcode=s=>{for(var i=0,h;i<s.length;i++)h=Math.imul(31,h)+s.charCodeAt(i)|0;return h};

const allowedQueryHashes = [
  -1521083219,
  -1223515326,
  1435166661,
  23960061,
  539470254,
  -1987618902,
  436396872,
  987565251,
  610459161,
  1379591156,
  569291494,
  -2034784358,
  594499639,
  -1278945283,
  -1204701883,
  1952576784
];

app.use(express.json());
app.use('/graphql', async (req, res, next) => {
  const queries = req.body.map(b => b.query);
  const allQueriesOk = queries.reduce((acc, query) => {
    query = query.trim();
    const hash = jhashcode(query);
    console.log('query: ', `***${query}***`);
    console.log('hash: ', hash);
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
