import { ApolloClient, InMemoryCache } from '@apollo/client';
import config from 'config/index';

const GraphQLClient = new ApolloClient({
  uri: config.services.pokeApi.baseURL,
  cache: new InMemoryCache(),
});

export default GraphQLClient;
