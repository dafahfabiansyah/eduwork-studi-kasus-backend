const mongoose = require('mongoose');
const { dbHost, dbName, dbPort } = require('../app/config');

// mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`);
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
const db = mongoose.connection;
db.on('open', () => {
  //   server.listen(port);
  //   server.on('error', onError);
  //   server.on('listening', onListening);
  console.log('Connected to MongoDB');
});

module.exports = db;
