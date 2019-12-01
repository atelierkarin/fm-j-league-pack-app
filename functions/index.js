import * as functions from 'firebase-functions';
import { ApolloServer } from 'apollo-server-cloud-functions';

import { typeDefs } from './typeDefs';

import { Query } from './queries';

const resolvers = {
  Query
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.api = functions.https.onRequest(server.createHandler({
  cors: {
    origin: ['https://fm-j-league-pack.firebaseapp.com/', 'http://localhost:4200'],
    credentials: true
  }
}));