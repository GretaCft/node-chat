const path = require('path');
const http = require('http');
const express = require('express');
const socketIO =require('socket.io'); 

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; 

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Nuevo user conectado');

    socket.emit('newMessage', {
     from : 'user',
     text: 'Hola cliente',
     createAt:123   
    });

    socket.on('createMessage', (newMess) => {
        console.log('createMessage', newMess);
    });

    socket.on('disconnect', () => {
        console.log('User desconectado');
    });

});

server.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});

