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

var _tools = require('./tools.js');

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

var latestDatabaseUpdate = function latestDatabaseUpdate(parent, args, context, info) {
  return db.collection('playerDb').orderBy('player.basicInfo.updateDate', 'desc').limit(15).get().then(function (snapshot) {
    var dbItems = [];
    snapshot.forEach(function (doc) {
      var dbItem = doc.data();
      dbItems.push({
        id: doc.id,
        name: dbItem.player.basicInfo.name,
        dob: dbItem.player.basicInfo.dob,
        updateDate: dbItem.player.basicInfo.updateDate,
        club: dbItem.player.clubInfo ? dbItem.player.clubInfo.id : null
      });
    });
    return dbItems;
  }).catch(function (err) {
    console.log('Error getting documents', err);
  });
};

var clientInfo = function clientInfo(parent, args, context, info) {
  return context.userIp;
};

var queryCa = function queryCa(parent, args, context, info) {
  var pos = args.pos;
  var clubPoints = args.clubPoints;
  var matches = args.matches;
  var leagueRep = args.leagueRep;
  var app = args.app;
  var gls = args.gls;

  console.log("queryCa");

  return (0, _tools.queryRegionalLeagueCA)(pos, clubPoints, matches, leagueRep, app, gls);
};

var Query = exports.Query = {
  playerUpdates: playerUpdates,
  playerUpdatesByDate: playerUpdatesByDate,
  latestDatabaseUpdate: latestDatabaseUpdate,
  clientInfo: clientInfo,
  queryCa: queryCa
};