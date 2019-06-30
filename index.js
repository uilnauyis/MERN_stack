require('dotenv').config();
const express = require('express');
const dbConnect = require('./dbConnect');
const app = express();

app.get('/', (req, res) => res.send('API testing'));
dbConnect.connect();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Start server'));
