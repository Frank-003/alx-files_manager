// server.js

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const redisClient = require('./utils/redis');
const dbClient = require('./utils/db');

// Load routes
app.use('/', require('./routes/index'));

// App status endpoint
app.get('/status', async (req, res) => {
  const redisAlive = redisClient.isAlive();
  const dbAlive = dbClient.isAlive();

  res.status(200).json({
    redis: redisAlive,
    db: dbAlive,
  });
});

// App stats endpoint
app.get('/stats', async (req, res) => {
  const nbUsers = await dbClient.nbUsers();
  const nbFiles = await dbClient.nbFiles();

  res.status(200).json({
    users: nbUsers,
    files: nbFiles,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
