const allowedQueries = require('./whitelisted-queries.js');
const crypto = require('crypto');

const jhashcode = s =>
  crypto
    .createHash('sha1')
    .update(s)
    .digest('base64');

// graphql or apollo tend to add stuff to queries that
// can change the string, thus changing the hash.
// remove commas, whitespace, and __typename.
const normalizeString = s => s.replace(/[,\s]/g, '').replace(/__typename/g, '');

const hashQuery = q => jhashcode(normalizeString(q));

const allowedQueryHashes = allowedQueries.map(hashQuery);

module.exports = {
  hashQuery,
  normalizeString,
  allowedQueryHashes
};
