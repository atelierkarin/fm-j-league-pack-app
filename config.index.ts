import { writeFile } from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
    production: true,
    firebase: {
        apiKey: "${process.env.FIREBASE_API_KEY}",
        authDomain: "fm-j-league-pack.firebaseapp.com",
        databaseURL: "https://fm-j-league-pack.firebaseio.com",
        projectId: "fm-j-league-pack",
        storageBucket: "fm-j-league-pack.appspot.com",
        messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
        appId: "${process.env.FIREBASE_APP_ID}",
        measurementId: "${process.env.FIREBASE_MEASUREMENT_ID}"
    },
    analytics: {
        id: "${process.env.GOOGLE_ANAYLTICS_ID}"
    }
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
    if (err) {
        return console.log(err);
    }
});