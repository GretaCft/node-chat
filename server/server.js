const path = require('path');
const http = require('http');
const express = require('express');
const socketIO =require('socket.io');
const {generateMessage} = require('./utils/message'); 

const publicPath = path.join(__dirname, '../public');
//heroku run printenv //Para saber  el puerto de heroku 42068
const port = process.env.PORT || 3000; 

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Nuevo user conectado');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (newMess) => {
        console.log('createMessage', newMess);
        io.emit('newMessage', generateMessage(newMess.from, newMess.text));
    });

    socket.on('disconnect', () => {
        console.log('User desconectado');
    });

});

server.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});

