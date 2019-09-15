const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const PgClient = require('pg').Client;
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const client = new PgClient({
  user: process.env.EXPRESS_PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.EXPRESS_PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  ssl: process.env.PGSSL === 'yes'
});

/**
 * Fetches an account (user) record by email.
 */
const getUserByEmail = async email => {
  const query = `SELECT id, email, username FROM mythgard.account WHERE email = $1`;
  try {
    const res = await client.query(query, [email]);
    return res.rows[0];
  } catch (err) {
    return null;
  }
};

/**
 * Stay logged in for one hour of non-activity
 */
const sessionTimeoutInSecs = 60 * 60;
const getJwtExp = () => Math.floor(Date.now() / 1000 + sessionTimeoutInSecs);

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
        'SELECT id, email ' +
        'FROM mythgard.find_account_or_create_by_google($1, $2)';
      const values = [id, email];
      client.query(text, values, (err, res) => {
        if (err) return cb(err);
        cb(null, {
          userId: res.rows[0].id,
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
    const exp = getJwtExp();
    const token = jwt.sign(
      {
        // Aging these out after 1 day for now
        role: process.env.PG_AUTHD_USER_ROLE,
        exp,
        ...user
      },
      process.env.JWT_SECRET,
      {
        audience: process.env.JWT_AUDIENCE
      }
    );
    res.cookie(process.env.JWT_COOKIE_NAME, token, {
      secured: process.env.NODE_ENV === 'production',
      maxAge: sessionTimeoutInSecs * 1000
    });
    res.redirect('/');
  }
);

// If already logged in, update the JWT expiration and keep the party going
router.use((req, res, next) => {
  if (res.headersSent) return next();
  if (!req.cookies || !req.cookies[process.env.JWT_COOKIE_NAME]) return next();
  try {
    const signedToken = req.cookies[process.env.JWT_COOKIE_NAME];
    const token = jwt.sign(
      {
        ...jwt.verify(signedToken, process.env.JWT_SECRET),
        exp: getJwtExp()
      },
      process.env.JWT_SECRET
      // Audience will be forwarded from the previous token and attempting to
      // set it again would throw
    );
    res.cookie(process.env.JWT_COOKIE_NAME, token, {
      secured: process.env.NODE_ENV === 'production',
      maxAge: sessionTimeoutInSecs * 1000
    });
  } catch (err) {
    console.error(err);
    req.logout();
    res.clearCookie(process.env.JWT_COOKIE_NAME);
  }
  next();
});

router.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie(process.env.JWT_COOKIE_NAME);
  res.redirect('/');
});

router.get('/user', async (req, res) => {
  const signedToken = req.cookies[process.env.JWT_COOKIE_NAME];
  let user;
  try {
    const token = jwt.verify(signedToken, process.env.JWT_SECRET);
    user = await getUserByEmail(token.email);
  } catch (err) {
    res.json(null);
  }
  res.json(user);
});

router.get('/user/:token', async (req, res) => {
  const signedToken = req.params.token;
  let user;
  try {
    const token = jwt.verify(signedToken, process.env.JWT_SECRET);
    user = await getUserByEmail(token.email);
  } catch (err) {
    res.json(null);
  }
  res.json(user);
});

module.exports = router;
