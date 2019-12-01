import * as functions from 'firebase-functions';
import { ApolloServer } from 'apollo-server-cloud-functions';

import { typeDefs } from './typeDefs';

import { Query } from './queries';

const resolvers = {
  Query
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: 'fm-j-league-pack.firebaseapp.com'
  }
});

exports.api = functions.https.onRequest(server.createHandler());