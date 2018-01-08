let socket = io();
socket.on('connect', function() {
    console.log('Conectado al server');
});
socket.on('disconnect', function() {
    console.log('Desconectado del server');
});
socket.on('newMessage', function(mess) {
    console.log('Nuevo mensaje', mess);
    let li = jQuery('<li></li>');
    li.text(`${mess.from}: ${mess.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
      
    });
});