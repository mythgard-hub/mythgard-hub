const allowedQueries = require('./whitelisted-queries.js');

//prettier-ignore
// eslint-disable-next-line
const jhashcode=s=>{for(var i=0,h;i<s.length;i++)h=Math.imul(31,h)+s.charCodeAt(i)|0;return h};

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
