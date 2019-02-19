const express = require('express');
const database = require('./data/db');

const server = express();

server.use(express.json());


server.listen(5000, () => console.log('Server running at http://localhost:5000'));
