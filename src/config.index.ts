import { writeFile } from 'fs';

import { name, version } from '../package.json';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
    production: true,
    firebase: {},
    analytics: {
        id: '${process.env.GOOGLE_ANAYLTICS_ID}'
    }
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
    if (err) {
        return console.log(err);
    }
});