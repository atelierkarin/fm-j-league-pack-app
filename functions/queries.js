import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

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
  // return db.collection('playerDbChangelog')
  //   .orderBy('updateDate', 'desc')
  //   .limit(10)
  //   .get()
  //   .then((snapshot) => {
  //     let latestDatabaseUpdateId = [];
  //     snapshot.forEach((doc) => {
  //       const updateRecords = doc.data();
  //       latestDatabaseUpdateId.push(updateRecords.id);
  //     });
  //     return db.collection('playerDb')
  //       .where('id', 'in', latestDatabaseUpdateId)
  //       .get();
  //   })
  //   .then((snapshot) => {
  //     let dbItems = [];
  //     snapshot.forEach((doc) => {
  //       const dbItem = doc.data();
  //       dbItems.push({
  //         id: doc.id,
  //         name: dbItem.player.basicInfo.name,
  //         dob: dbItem.player.basicInfo.dob
  //       });
  //     });
  //     return dbItems;
  //   })
  //   .catch((err) => {
  //     console.log('Error getting documents', err);
  //   })
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

export const Query = {
  playerUpdates,
  playerUpdatesByDate,
  latestDatabaseUpdate,
  clientInfo
}