require('dotenv').config();

const express = require('express');
const dbConnect = require('./dbConnect');
const process = require('process');
const app = express();

module.exports = main = () => {
  dbConnect.connect();

  app.use(express.json({ extended: false }));

  app.get('/', (req, res) => {
    res.send(`API testing ${process.pid}`);
  });
  app.use('/api/users', require('./routes/api/users'));
  app.use('/api/profile', require('./routes/api/profile'));
  app.use('/api/posts', require('./routes/api/posts'));
  app.use('/api/auth', require('./routes/api/auth'));

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => console.log('Start server'));
};

if (process.env.NODE_ENV !== 'development') {
  main();
}
