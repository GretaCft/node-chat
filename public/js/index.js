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

socket.on('newLocationMessage', function(message){
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">Mi ubicación actual</a>');

    li.text(`${message.from}:`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});
let locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocalización no soportada por el navegador');
    }
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    }, function(){
        alert('Imposible localizar');
    });
});