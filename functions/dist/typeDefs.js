'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  type PlayerUpdateClub {\n    name: String!\n    nationality: String!\n  }\n\n  type FutureTransferClub {\n    club: PlayerUpdateClub\n    transferDate: String!\n  }\n\n  type PlayerUpdatePlayer {\n    fmID: ID\n    name: String!\n    nameEng: String!\n    playerType: [Int]\n    nationality: String!\n  }\n\n  type PlayerUpdate {\n    id: String\n    fmVersion: String!\n    player: PlayerUpdatePlayer!\n    updateType: Int!\n    activeDate: String!\n    updateDate: String!\n    club: PlayerUpdateClub!\n    previousClub: PlayerUpdateClub\n    filetype: Int!\n    previousFiletype: Int\n    futureTransfer: FutureTransferClub\n    remarks: String\n  }\n\n  type Query {\n    playerUpdates: [PlayerUpdate]\n    playerUpdatesByDate(fmVersion: String!, startDate: String!, endDate: String!): [PlayerUpdate]\n  }\n'], ['\n  type PlayerUpdateClub {\n    name: String!\n    nationality: String!\n  }\n\n  type FutureTransferClub {\n    club: PlayerUpdateClub\n    transferDate: String!\n  }\n\n  type PlayerUpdatePlayer {\n    fmID: ID\n    name: String!\n    nameEng: String!\n    playerType: [Int]\n    nationality: String!\n  }\n\n  type PlayerUpdate {\n    id: String\n    fmVersion: String!\n    player: PlayerUpdatePlayer!\n    updateType: Int!\n    activeDate: String!\n    updateDate: String!\n    club: PlayerUpdateClub!\n    previousClub: PlayerUpdateClub\n    filetype: Int!\n    previousFiletype: Int\n    futureTransfer: FutureTransferClub\n    remarks: String\n  }\n\n  type Query {\n    playerUpdates: [PlayerUpdate]\n    playerUpdatesByDate(fmVersion: String!, startDate: String!, endDate: String!): [PlayerUpdate]\n  }\n']);

var _apolloServerCloudFunctions = require('apollo-server-cloud-functions');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = exports.typeDefs = (0, _apolloServerCloudFunctions.gql)(_templateObject);