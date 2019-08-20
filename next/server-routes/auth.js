const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const PgClient = require('pg').Client;
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const client = new PgClient({
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  ssl: process.env.PGSSL === 'yes'
});

client.connect();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, cb) => {
      const { id } = profile;
      const email = profile.emails[0].value;
      const text =
        'SELECT email ' +
        'FROM mythgard.find_account_or_create_by_google($1, $2)';
      const values = [id, email];
      client.query(text, values, (err, res) => {
        if (err) return cb(err);
        cb(null, { email: res.rows[0].email });
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

router.get(
  '/google',
  passport.authenticate('google', {
    scope: process.env.GOOGLE_AUTH_SCOPE,
    session: false
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  /**
   * If the callback below is called then authentication was successful and
   * req.user should be populated. We can tuck our user info in a JWT.
   */
  (req, res) => {
    const { user } = req;
    const token = jwt.sign(
      {
        // Aging these out after 1 day for now
        exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60),
        data: user
      },
      process.env.JWT_SECRET
    );
    res.cookie(process.env.JWT_COOKIE_NAME, token);
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie(process.env.JWT_COOKIE_NAME);
  res.redirect('/');
});

router.get('/user', (req, res) => {
  const signedToken = req.cookies[process.env.JWT_COOKIE_NAME];
  let user;
  try {
    const token = jwt.verify(signedToken, process.env.JWT_SECRET);
    user = token.data;
  } catch (err) {
    res.json(null);
  }
  res.json(user);
});

router.get('/user/:token', (req, res) => {
  const signedToken = req.params.token;
  let user;
  try {
    const token = jwt.verify(signedToken, process.env.JWT_SECRET);
    user = token.data;
  } catch (err) {
    res.json(null);
  }
  res.json(user);
});

module.exports = router;
