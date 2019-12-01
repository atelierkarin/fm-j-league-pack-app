'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

var playerUpdates = function playerUpdates(parent, args, context, info) {
  return db.collection('playerUpdates').get().then(function (snapshot) {
    var result = [];
    snapshot.forEach(function (doc) {
      result.push(_extends({
        id: doc.id
      }, doc.data()));
    });
    return result;
  }).catch(function (err) {
    console.log('Error getting documents', err);
  });
};

var playerUpdatesByDate = function playerUpdatesByDate(parent, args, context, info) {
  var fmVersion = args.fmVersion;
  var startDate = args.startDate;
  var endDate = args.endDate;
  return db.collection('playerUpdates').where('fmVersion', '==', fmVersion).where('activeDate', '>=', startDate).where('activeDate', '<=', endDate).get().then(function (snapshot) {
    var result = [];
    snapshot.forEach(function (doc) {
      result.push(_extends({
        id: doc.id
      }, doc.data()));
    });
    return result;
  }).catch(function (err) {
    console.log('Error getting documents', err);
  });
};

var Query = exports.Query = {
  playerUpdates: playerUpdates,
  playerUpdatesByDate: playerUpdatesByDate
};