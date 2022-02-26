const { initializeApp, restore } = require('firestore-export-import');
const serviceAccount = require('./credentials.json');

initializeApp(serviceAccount);

restore('./data/anime.json');
