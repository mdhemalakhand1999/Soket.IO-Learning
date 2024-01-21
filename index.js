const express = require('express');
const app = express();
const server = require("http").createServer(app);
const socketID = require("socket.io");
const io = socketID(server);
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html');
})

server.listen(3000, function() {
    console.log('server listening on: 3000');
})