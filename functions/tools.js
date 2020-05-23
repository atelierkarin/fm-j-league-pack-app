import { google } from 'googleapis';

import key from './fm-j-league-pack-5c2a2566b71b.json';

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/cloud-platform'],
  null
);

export const queryRegionalLeagueCA = (pos, clubPoints, matches, leagueRep, app, gls) => {
  let instance = [];

  instance.push(pos === "GK" ? 1 : 0);
  instance.push(pos === "DF" ? 1 : 0);
  instance.push(pos === "MF" ? 1 : 0);
  instance.push(pos === "FW" ? 1 : 0);
  instance.push(clubPoints / matches);
  instance.push(leagueRep);
  instance.push(app / matches);
  instance.push(gls / matches);

  console.log("queryRegionalLeagueCA instance")
  console.log(instance)

  return new Promise((res, rej) => {
    jwtClient.authorize((err, tokens) => {
      if (err) {
        console.log('Authentication failed because of ', err);
        return rej({ca: -1});
      }
    
      let ml = google.ml({
        version: 'v1',
        auth: jwtClient
      });
  
      console.log("Auth success");
    
      return ml.projects.predict({
        name: 'projects/fm-j-league-pack/models/regional_league_model',
        resource: {
          instances: [instance]
        }
      }, (err, result) => {
        if (err) {
          console.log(err);
          return rej({ca: -1});
        } else {
          console.log(result.data);
          if (result.data && result.data.predictions) {
            return res({ca: parseInt(result.data.predictions[0])});
          } else {
            return rej({ca: -1});
          }
        }
      })
    });
  })
}