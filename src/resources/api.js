import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  //uri: 'https://apistock-production.up.railway.app/graphql',
  cache: new InMemoryCache(),
})
