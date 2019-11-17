const express = require('express');
const next = require('next');
const proxy = require('express-http-proxy');

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());
    server.use(passport.initialize());
    server.use(
      session({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: true,
        saveUninitialized: true
      })
    );

    const auth = require('./server-routes/auth.js');
    server.use('/auth', auth);

    server.get('/card/:id', (req, res) => {
      const actualPage = '/card';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/deck/:id', (req, res) => {
      const actualPage = '/deck';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/event/:id', (req, res) => {
      const actualPage = '/event';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.use(
      '/graphql',
      proxy(process.env.API_HOST, {
        proxyReqPathResolver: () => {
          return `/graphql`;
        }
      })
    );

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3001, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3001');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
