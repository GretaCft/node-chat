let socket = io();
socket.on('connect', function() {
    console.log('Conectado al server');
});
socket.on('disconnect', function() {
    console.log('Desconectado del server');
});
socket.on('newMessage', function(mess) {
    console.log('Nuevo mensaje', mess);
})