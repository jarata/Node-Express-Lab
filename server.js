const express = require('express');
const postsRouter = require('./router');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', async (req, res) => {
    res.send(`<h2>Posts is online!</h2>`)
});

module.exports = server;