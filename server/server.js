const path = require('path');
const http = require('http');
const express = require('express');
const socketIO =require('socket.io'); 

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 42068; 

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Nuevo user conectado');

    socket.on('createMessage', (newMess) => {
        console.log('createMessage', newMess);
        io.emit('newMessage', {
            from:newMess.from,
            text:newMess.text,
            createAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User desconectado');
    });

});

server.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});

