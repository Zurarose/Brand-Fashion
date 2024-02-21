import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getToken } from './store/user';

const authLink = setContext(async (_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      ...(token ? { 'X-Parse-Session-Token': token } : {}),
    },
  };
});

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APP_SERVER_GRAPHQL_URL,
  headers: {
    'X-Parse-Application-Id': import.meta.env.VITE_APP_APPLICATION_ID,
    'X-Parse-REST-API-Key': import.meta.env.VITE_APP_API_KEY,
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const ApolloConnect: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloConnect;
