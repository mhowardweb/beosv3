import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

// Create the apollo client
export const apolloClient = new ApolloClient({
  // uri: 'http://localhost:4000/graphql',
  uri: 'https://beos-api.herokuapp.com/graphql',
  request: (operation) => {
    // if no token with key of 'token' in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem('token', '');
    }

    // operation adds the token to an authorization header, which is sent to backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
  },
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  errorHandler({ graphQLErrors, networkError }) {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  },
});

export default ({ app, Vue }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
};
