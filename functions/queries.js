import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { queryRegionalLeagueCA } from './tools.js'

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const playerUpdates = (parent, args, context, info) => {
  return db.collection('playerUpdates').get()
    .then((snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return result;
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    })
}

const playerUpdatesByDate = (parent, args, context, info) => {
  const fmVersion = args.fmVersion;
  const startDate = args.startDate;
  const endDate = args.endDate;
  return db.collection('playerUpdates')
    .where('fmVersion', '==', fmVersion)
    .where('activeDate', '>=', startDate)
    .where('activeDate', '<=', endDate)
    .get()
    .then((snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return result;
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    })
}

const latestDatabaseUpdate = (parent, args, context, info) => {
  return db.collection('playerDb')
      .orderBy('player.basicInfo.updateDate', 'desc')
      .limit(15)
      .get()
      .then((snapshot) => {
        let dbItems = [];
        snapshot.forEach((doc) => {
          const dbItem = doc.data();
          dbItems.push({
            id: doc.id,
            name: dbItem.player.basicInfo.name,
            dob: dbItem.player.basicInfo.dob,
            updateDate: dbItem.player.basicInfo.updateDate,
            club: dbItem.player.clubInfo ? dbItem.player.clubInfo.id : null
          });
        });
        return dbItems;
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      })
}

const clientInfo = (parent, args, context, info) => {
  return context.userIp;
}

const queryCa = (parent, args, context, info) => {
  const pos = args.pos;
  const clubPoints = args.clubPoints;
  const matches = args.matches;
  const leagueRep = args.leagueRep;
  const app = args.app;
  const gls = args.gls;

  console.log("queryCa")

  return queryRegionalLeagueCA(pos, clubPoints, matches, leagueRep, app, gls);
}

export const Query = {
  playerUpdates,
  playerUpdatesByDate,
  latestDatabaseUpdate,
  clientInfo,
  queryCa
}