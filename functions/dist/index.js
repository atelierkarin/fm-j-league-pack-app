'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
  context: function context(_context) {
    return _extends({}, _context, {
      userIp: userIpAddress(_context.req)
    });
  }
});

var userIpAddress = function userIpAddress(request) {
  var headers = request.headers;
  if (!headers) return null;
  var ipAddress = headers['x-forwarded-for'];
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