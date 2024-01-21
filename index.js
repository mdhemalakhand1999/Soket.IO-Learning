const express = require('express');
const app = express();
const server = require("http").createServer(app);
const socketID = require("socket.io");
const io = socketID(server);


app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html');
})
io.on('connection', (socket) => {
    console.log('A user connected');
    /**
     * After server connect configuration
     * @return null
     * @request
     */
    function getCurrentTimeString() {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0');
      
        return `${hours}:${minutes}:${seconds}`;
    }
  
      setInterval(() => {
        socket.emit("time", getCurrentTimeString());
      }, 1)

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
});
server.listen(3000, function() {
    console.log('server listening on: 3000');
})