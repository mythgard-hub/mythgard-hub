import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

// To work around CORS issues, next/server.js
// currently proxies requests for the graphql server.
// This will need to be removed in production.
// TODO https://trello.com/c/EwDfaRIo/28
const serverUri = 'express:3000/graphql'; // docker-compose url
const browserUri = 'localhost:3001/graphql'; // proxied through next
const uri = `http://${process.browser ? browserUri : serverUri}`;

const makeCache = initialState =>
  new InMemoryCache({
    dataIdFromObject: object => object.nodeId || null
  }).restore(initialState || {});

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri,
      // credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
      // Use fetch() polyfill on the server
      fetch: !process.browser && fetch
    }),
    cache: makeCache(initialState)
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
