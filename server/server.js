const path = require('path');
const http = require('http');
const express = require('express');
const socketIO =require('socket.io'); 

const publicPath = path.join(__dirname, '../public');
//heroku run printenv //Para saber  el puerto de heroku 42068
const port = process.env.PORT || 42068; 

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Nuevo user conectado');

    socket.emit('newMessage', {
        from:'Admin',
        text:"Welcome to the chat",
        createAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
            from:'Admin',
            text:'new user joined',
            createAt: new Date().getTime()
        });

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

