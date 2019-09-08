const allowedQueries = require('./whitelisted-queries.js');

//prettier-ignore
// eslint-disable-next-line
const jhashcode=s=>{for(var i=0,h;i<s.length;i++)h=Math.imul(31,h)+s.charCodeAt(i)|0;return h};

const hashQuery = q =>
  jhashcode(q.replace(/\s/g, '').replace(/__typename/g, ''));

const allowedQueryHashes = allowedQueries.map(hashQuery);

module.exports = {
  hashQuery,
  allowedQueryHashes
};
