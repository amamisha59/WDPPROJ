// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { onError } from '@apollo/client/link/error';

// // Error handling link
// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.error(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );
//   }
//   if (networkError) {
//     console.error(`[Network error]: ${networkError}`);
//   }
// });

// // HTTP link with credentials
// const httpLink = createHttpLink({
//   uri: 'http://localhost:4001/frontend',
//   credentials: 'include'
// });

// // Auth link
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('userToken');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : ''
//     }
//   };
// });

// // Create Apollo Client
// const client = new ApolloClient({
//   link: errorLink.concat(authLink.concat(httpLink)),
//   cache: new InMemoryCache(),
//   defaultOptions: {
//     watchQuery: {
//       fetchPolicy: 'network-only',
//       errorPolicy: 'all',
//     },
//     query: {
//       fetchPolicy: 'network-only',
//       errorPolicy: 'all',
//     },
//     mutate: {
//       errorPolicy: 'all',
//     },
//   },
// });

// export default client;
