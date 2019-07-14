const express = require('express');
const next = require('next');
const proxy = require('express-http-proxy');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/card/:id', (req, res) => {
      const actualPage = '/card';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.use(
      '/graphql',
      proxy('http://express:3000', {
        proxyReqPathResolver: () => {
          return `/graphql`;
        }
      })
    );

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
