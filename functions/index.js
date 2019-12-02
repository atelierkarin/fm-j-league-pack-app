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
  context: context => ({
    ...context,
    userIp: userIpAddress(context.req),
  })
});

const userIpAddress = (request) => {
  const headers = request.headers;
  if (!headers) return null;
  const ipAddress = headers['x-forwarded-for'];
  if (!ipAddress) return null;
  return ipAddress;
};

exports.api = functions.https.onRequest(server.createHandler({
  cors: {
    //origin: ['https://fm-j-league-pack.firebaseapp.com', 'http://localhost:4200'],
    origin: ['https://fm-j-league-pack.firebaseapp.com'],
    credentials: true
  }
}));