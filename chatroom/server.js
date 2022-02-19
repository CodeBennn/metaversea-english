const express = require('express');
const http = require('http');
const app = express();
const server = createServer(app);
const socketIO = require('socket.io')

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

server.listen(3000, () => {
    console.log('3000 listening')
})
