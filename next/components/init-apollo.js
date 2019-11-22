import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { setContext } from 'apollo-link-context';
import Cookies from 'js-cookie';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

// To work around CORS issues, next/server.js
// currently proxies requests for the graphql server.
// This will need to be removed in production.
// TODO https://trello.com/c/EwDfaRIo/28
const serverUri = `${process.env.API_HOST}/graphql`; // docker-compose url
const browserUri = '/graphql'; // proxied through next
const uri = process.browser ? browserUri : serverUri;

const makeCache = initialState =>
  new InMemoryCache({
    dataIdFromObject: object => object.nodeId || null
  }).restore(initialState || {});

// Tries to read the JWT cookie and adds an authorization
// header to the GraphQL request if it exists
const authLink = setContext((_, { headers }) => {
  const token = Cookies.get(process.env.JWT_COOKIE_NAME);
  const newHeaders = { ...headers };
  if (token) {
    newHeaders.Authorization = `Bearer ${token}`;
  }
  return {
    headers: newHeaders
  };
});

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(
      new BatchHttpLink({
        batchMax: 200,
        uri,
        // credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
        // Use fetch() polyfill on the server
        fetch: !process.browser && fetch
      })
    ),
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
