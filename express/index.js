const http = require('http');
const { postgraphile } = require('postgraphile');

http
  .createServer(
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
  )
  .listen(process.env.PORT || 3000);
