const express = require('express');
const { postgraphile } = require('postgraphile');

const app = express();

app.use(
  postgraphile(
    {
      user: 'postgres',
      database: 'postgres',
      password: 'example',
      host: 'db'
    },
    'mythgard',
    {
      graphiql: true
    }
  )
);

app.listen(process.env.PORT || 3000);

// http
//   .createServer(
//     postgraphile(
//       {
//         user: 'postgres',
//         database: 'postgres',
//         password: 'example',
//         host: 'db'
//       },
//       'mythgard',
//       {
//         graphiql: true
//       }
//     )
//   )
//   .listen(process.env.PORT || 3000);
