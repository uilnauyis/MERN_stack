const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('API testing'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Start server'));
