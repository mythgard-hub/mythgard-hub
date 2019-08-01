const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const PgClient = require('pg').Client;

const client = new PgClient();
client.connect();

/**
 * Regieter Auth Providers
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
      const { id } = profile;
      const email = profile.emails[0].value;
      const text =
        'SELECT email ' +
        'FROM mythgard.find_account_or_create_by_google($1, $2)';
      const values = [id, email];
      client.query(text, values, (err, res) => {
        if (err) return cb(err);
        cb(null, {
          email: res.rows[0].email
        });
      });
    }
  )
);

/**
 * In order to maintain a user in the session we must tell Passport how to
 * serialize and deserialize a user object.
 */
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = server => {
  server.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: process.env.GOOGLE_AUTH_SCOPE
    })
  );

  server.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );

  server.get('/login', (req, res) => {
    res.send('Login');
  });

  server.get('/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
