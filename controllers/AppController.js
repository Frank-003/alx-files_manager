const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const getStatus = async (req, res) => {
  const redisAlive = redisClient.isAlive();
  const dbAlive = dbClient.isAlive();

  res.status(200).json({
    redis: redisAlive,
    db: dbAlive,
  });
};

const getStats = async (req, res) => {
  const nbUsers = await dbClient.nbUsers();
  const nbFiles = await dbClient.nbFiles();

  res.status(200).json({
    users: nbUsers,
    files: nbFiles,
  });
};

module.exports = {
  getStatus,
  getStats,
};
