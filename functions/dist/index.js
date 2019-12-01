'use strict';

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _apolloServerCloudFunctions = require('apollo-server-cloud-functions');

var _typeDefs = require('./typeDefs');

var _queries = require('./queries');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var resolvers = {
  Query: _queries.Query
};

var server = new _apolloServerCloudFunctions.ApolloServer({
  typeDefs: _typeDefs.typeDefs,
  resolvers: resolvers,
  cors: {
    origin: 'fm-j-league-pack.firebaseapp.com'
  }
});

exports.api = functions.https.onRequest(server.createHandler());