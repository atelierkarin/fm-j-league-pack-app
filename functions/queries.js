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

export const Query = {
  playerUpdates,
  playerUpdatesByDate
}