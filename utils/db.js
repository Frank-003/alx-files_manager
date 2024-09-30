const mongoose = require('mongoose');

class DBClient {
  constructor() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';

    this.url = `mongodb://${dbHost}:${dbPort}/${dbName}`;

    mongoose.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  isAlive() {
    return mongoose.connection.readyState === 1;
  }

  async nbUsers() {
    const usersCollection = mongoose.connection.db.collection('users');
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    const filesCollection = mongoose.connection.db.collection('files');
    const count = await filesCollection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
